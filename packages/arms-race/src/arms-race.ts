import { Gate, Player, PlayerList } from "@bf6-portal-contrib/gate";

import { Config } from "./config.ts";
import { Inventory } from "./inventory.ts";
import type { ArmsRacePlayerCustom } from "./types.ts";
import { PlayerUI } from "./player-ui.ts";

export class ArmsRace {
  private players = new PlayerList<ArmsRacePlayerCustom>();

  public subscribe() {
    this.players.subscribe(
      (native) =>
        new Player(native, {
          level: 0,
          kills: 0,
          ui: PlayerUI.build(0, native),
        })
    );

    Gate.subscribe("OnPlayerDeployed", this.onDeploy.bind(this));
    Gate.subscribe("OnPlayerEarnedKill", this.onKill.bind(this));
  }

  private onDeploy(native: mod.Player) {
    const player = this.players.findByNative(native);
    if (!player) return;

    Inventory.set(native, player.custom.level);
  }

  private onKill(native: mod.Player) {
    const player = this.players.findByNative(native);
    if (!player) return;

    const kills = (player.custom.kills + 1) % Config.killsPerLevel;
    const level = kills === 0 ? player.custom.level + 1 : player.custom.level;

    player.update({ kills, level });
    PlayerUI.update(level, player.custom.ui);

    mod.SetUITextLabel(
      player.custom.ui,
      mod.Message(mod.stringkeys.killsLevel, kills, level)
    );

    if (level >= Config.levelInventories.length) {
      this.endGame(native);
      return;
    }

    if (kills === 0) {
      Inventory.set(native, level);
    }
  }

  private endGame(winner: mod.Player) {
    // TODO IMPROVE WINNER HANDLING
    mod.EndGameMode(winner);
  }
}
