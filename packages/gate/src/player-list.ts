import { Gate } from './gate.ts';
import { Player, type PlayerId } from './player.ts';

export class PlayerList<Custom> {
  private players: Record<PlayerId, Player<Custom>> = {};

  findById(id: PlayerId): Player<Custom> | undefined {
    if (id < 0) return undefined;
    return this.players[id];
  }

  findByNative(native: mod.Player): Player<Custom> | undefined {
    const id = mod.GetObjId(native);
    return this.findById(id);
  }

  add(player: Player<Custom>): void {
    this.players[player.id] = player;
  }

  subscribe(init: (player: mod.Player) => Player<Custom>) {
    Gate.subscribe("OnPlayerJoinGame", (player) => {
      this.add(init(player));
    });

    // TODO COMPLETE LEAVE LOGIC
  }
}