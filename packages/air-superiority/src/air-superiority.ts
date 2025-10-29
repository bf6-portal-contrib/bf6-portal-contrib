import {
  Gate,
  Player,
  PlayerList,
  Random,
  Spawn,
  VehicleUtils,
  type PlayerId,
} from "@bf6-portal-contrib/gate";

import type { Custom } from "./types.ts";
import { SoldierUtils } from "../../gate/src/soldier.ts";

const TeamConfig: Record<number, { center: mod.Vector; rotation: mod.Vector }> =
  {
    // Team 1
    1: {
      center: mod.CreateVector(-500, 200, 0),
      rotation: mod.CreateVector(0, Math.PI / 2, 0),
    },
    // Team 2
    2: {
      center: mod.CreateVector(500, 200, 0),
      rotation: mod.CreateVector(0, -Math.PI / 2, 0),
    },
  };

const AircraftSelect = new Map<
  mod.SoldierClass,
  Map<mod.Factions, mod.VehicleList>
>([
  // Attack Helicopter
  [
    mod.SoldierClass.Assault,
    new Map([
      [mod.Factions.NATO, mod.VehicleList.AH64],
      [mod.Factions.PaxArmata, mod.VehicleList.Eurocopter],
    ]),
  ],

  // Transport Helicopter
  [
    mod.SoldierClass.Engineer,
    new Map([
      [mod.Factions.NATO, mod.VehicleList.UH60],
      [mod.Factions.PaxArmata, mod.VehicleList.UH60_Pax],
    ]),
  ],

  // Fighter Jet
  [
    mod.SoldierClass.Support,
    new Map([
      [mod.Factions.NATO, mod.VehicleList.F22],
      [mod.Factions.PaxArmata, mod.VehicleList.JAS39],
    ]),
  ],

  // Attack Jet
  [
    mod.SoldierClass.Recon,
    new Map([
      [mod.Factions.NATO, mod.VehicleList.F16],
      [mod.Factions.PaxArmata, mod.VehicleList.SU57],
    ]),
  ],
]);

export class AirSuperiority {
  private players = new PlayerList<Custom>();
  private seatQueue: PlayerId[] = [];

  constructor() {
    this.onPlayerDeployed = this.onPlayerDeployed.bind(this);
    this.onVehicleSpawned = this.onVehicleSpawned.bind(this);
  }

  public subscribe() {
    this.players.subscribe((native) => {
      return new Player<Custom>(native, {});
    });

    Gate.subscribe("OnPlayerDeployed", this.onPlayerDeployed);
    Gate.subscribe("OnVehicleSpawned", this.onVehicleSpawned);
  }

  private async onPlayerDeployed(native: mod.Player) {
    const id = mod.GetObjId(native);

    const player = this.players.findById(id);
    if (!player) return;

    // Cleanup
    if (player.custom.vehicle) mod.Kill(player.custom.vehicle);
    if (player.custom.spawner) mod.UnspawnObject(player.custom.spawner);

    const team = mod.GetTeam(native);
    const teamId = mod.GetObjId(team);
    const faction = SoldierUtils.getTeamFaction(team);
    const config = TeamConfig[teamId]!;

    const rawSClass = SoldierUtils.getClass(native);
    const isAI = mod.GetSoldierState(native, mod.SoldierStateBool.IsAISoldier);
    const isEngineer = rawSClass === mod.SoldierClass.Engineer;
    const sClass = isAI && isEngineer ? mod.SoldierClass.Assault : rawSClass;

    const vehicle = AircraftSelect.get(sClass)!.get(faction)!;
    const yOffset = VehicleUtils.isJet(vehicle) ? 400 : 0;

    const position = mod.Add(
      config.center,
      Random.vectorRange(
        mod.CreateVector(-50, yOffset - 20, -100),
        mod.CreateVector(50, yOffset + 20, 100)
      )
    );
    const rotation = config.rotation;

    const spawner = Spawn.vehicleSpawner(position, rotation);
    mod.SetVehicleSpawnerVehicleType(spawner, vehicle);

    player.update({ spawner });
    this.seatQueue.push(id);

    // Since spawn can fail (space occupied, etc.), repeat until a vehicle is attached
    while (true) {
      mod.ForceVehicleSpawnerSpawn(spawner);

      await mod.Wait(0.5);
      if (player.custom.vehicle) break;
    }
  }

  private onVehicleSpawned(vehicle: mod.Vehicle) {
    // TODO seat queue can be replaced by finding best player candidate
    // based on team, vehicle requested, and vehicle type
    const requesterId = this.seatQueue.shift();
    if (requesterId === undefined) return;

    const requester = this.players.findById(requesterId);
    if (!requester) return;

    requester.update({ vehicle });
    mod.ForcePlayerToSeat(requester.native, vehicle, 0);
  }
}
