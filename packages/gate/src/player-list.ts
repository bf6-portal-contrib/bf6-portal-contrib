import { Gate } from "./gate.ts";
import { Log } from "./log.ts";
import { Player, type PlayerId } from "./player.ts";

export class PlayerList<Custom> {
  private players: Record<PlayerId, Player<Custom>> = {};

  findById(id: PlayerId): Player<Custom> | undefined {
    if (id < 0) return undefined;

    const player = this.players[id];
    if (!player)
      Log.warn("PlayersList.findById", `Player by id ${id} not found`);

    return player;
  }

  findByNative(native: mod.Player): Player<Custom> | undefined {
    const id = mod.GetObjId(native);
    return this.findById(id);
  }

  findByCustom(fn: (custom: Custom) => boolean): Player<Custom> | undefined {
    return Object.values(this.players).find((player) => fn(player.custom));
  }

  add(player: Player<Custom>): void {
    this.players[player.id] = player;
  }

  removeById(id: PlayerId): void {
    delete this.players[id];
  }

  subscribe(
    init: (player: mod.Player) => Player<Custom>,
    cleanup?: (player: Player<Custom>) => void
  ) {
    Gate.subscribe("OnPlayerJoinGame", (native) => {
      this.add(init(native));
    });

    Gate.subscribe("OnPlayerLeaveGame", (playerId) => {
      const player = this.findById(playerId);

      if (cleanup && player) {
        cleanup(player);
      }

      this.removeById(playerId);
    });
  }
}
