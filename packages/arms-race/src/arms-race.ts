import { Gate, Player, PlayerList } from "@bf6-portal-contrib/gate";

import { Config } from "./config.ts";
import { Inventory } from "./inventory.ts";
import { PlayerUI } from "./player-ui.ts";
import { Score } from "./score.ts";
import type { ArmsRacePlayerCustom } from "./types.ts";

export class ArmsRace {
  private players = new PlayerList<ArmsRacePlayerCustom>();

  public subscribe() {
    this.players.subscribe(
      (native) =>
        new Player(native, {
          kills: 0,
          level: 0,
          ui: PlayerUI.build(0, 0, native),
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

  private onKill(
    native: mod.Player,
    otherNative: mod.Player,
    eventDeathType: mod.DeathType
  ) {
    const player = this.players.findByNative(native);
    const otherPlayer = this.players.findByNative(otherNative);
    if (!player || !otherPlayer) return;

    const levelIncreased = Score.update(player, otherPlayer, eventDeathType);

    PlayerUI.update(player.custom.kills, player.custom.level, player.custom.ui);
    PlayerUI.update(
      otherPlayer.custom.kills,
      otherPlayer.custom.level,
      otherPlayer.custom.ui
    );

    if (player.custom.level >= Config.maxLevel) {
      this.endGame(native);
      return;
    }

    if (levelIncreased) {
      Inventory.set(native, player.custom.level);
    }
  }

  private endGame(winner: mod.Player) {
    // TODO IMPROVE WINNER HANDLING
    mod.EndGameMode(winner);
  }
}
