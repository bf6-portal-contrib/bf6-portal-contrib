import {
  Gate,
  InventoryUtils,
  Log,
  Player,
  PlayerList,
  Spawn,
} from "@bf6-portal-contrib/gate";

import type { Custom } from "./types.ts";

const context = 'AirSuperiority';

const TeamConfig: Record<number, { center: mod.Vector }> = {
  1: { center: mod.CreateVector(-500, 300, 0) },
  2: { center: mod.CreateVector(500, 300, 0) },
};

// Aircraft Select
// TODO IMPROVE faction-based
const AircraftSelect = new Map<mod.SoldierClass, mod.VehicleList>([
  // Attack Helicopter
  [mod.SoldierClass.Assault, mod.VehicleList.AH64],
  // PAX Eurocopter

  // Transport Helicopter
  [mod.SoldierClass.Engineer, mod.VehicleList.UH60],
  // PAX UH60

  // Fighter Jet
  [mod.SoldierClass.Support, mod.VehicleList.F16],
  // PAX SU57

  // Attack Jet
  [mod.SoldierClass.Recon, mod.VehicleList.F22],
  // PAX JAS39
]);

export class AirSuperiority {
  private players = new PlayerList<Custom>();

  constructor() {
    this.onPlayerDeployed = this.onPlayerDeployed.bind(this);
    this.onVehicleSpawned = this.onVehicleSpawned.bind(this);
  }

  public subscribe() {
    this.players.subscribe((native) => {
      return new Player<Custom>(native, { requesting: false });
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

    // TODO COMPLETE Positions must be randomized to avoid collisions
    // TODO CONFIRM this works
    const teamId = mod.GetObjId(mod.GetTeam(native));
    Log.debug(context, `Team ID: ${teamId}`);

    const position = TeamConfig[teamId ?? 1]!.center;
    // TODO IMPROVE rotation towards the map center (but vertically centered)
    const rotation = mod.CreateVector(0, 90, 0);
    const spawner = Spawn.vehicleSpawner(position, rotation);

    const pClass =
      InventoryUtils.inferClass(native) ?? mod.SoldierClass.Assault;
    const vehicle = AircraftSelect.get(pClass) ?? mod.VehicleList.AH64;

    mod.SetVehicleSpawnerVehicleType(spawner, vehicle);
    // TODO COMPLETE spawner config? Mostly for abandoned vehicles if players leave

    player.update({ requesting: true, spawner });
    mod.ForceVehicleSpawnerSpawn(spawner);
  }

  private onVehicleSpawned(vehicle: mod.Vehicle) {
    const requester = this.players.findByCustom((custom) => custom.requesting);
    if (!requester) return;

    requester.update({ requesting: false, vehicle });
    mod.ForcePlayerToSeat(requester.native, vehicle, 0);
  }
}
