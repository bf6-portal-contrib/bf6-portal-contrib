import { Gate, InventoryUtils, Player, PlayerList } from "@bf6-portal-contrib/gate";

import { Config } from "./config.ts";

interface ArmsRacePlayerCustom {
  level: number;
  kills: number;
}

export class ArmsRace {
  private players = new PlayerList<ArmsRacePlayerCustom>();

  public subscribe() {
    this.players.subscribe(
      (native) => new Player(native, { level: 0, kills: 0 })
    );

    Gate.subscribe("OnPlayerDeployed", this.onDeploy.bind(this));
    Gate.subscribe("OnPlayerEarnedKill", this.onKill.bind(this));
  }

  private onDeploy(native: mod.Player) {
    const player = this.players.findByNative(native);

    if (!player) {
      // TODO LOG ERROR
      return;
    }

    this.setInventory(native, player.custom.level);
  }

  private onKill(native: mod.Player) {
    const player = this.players.findByNative(native);

    if (!player) {
      // TODO LOG ERROR
      return;
    }

    // Current debug: confirm player is found
    mod.DisplayHighlightedWorldLogMessage(
      mod.Message(mod.stringkeys.title),
      native
    );

    const kills = (player.custom.kills + 1) % Config.killsPerLevel;
    const level = kills === 0 ? player.custom.level + 1 : player.custom.level;

    player.update({ kills, level });

    // TODO REMOVE
    mod.DisplayHighlightedWorldLogMessage(
      mod.Message(mod.stringkeys.killsLevel, kills, level),
      native
    );

    if (level >= Config.levelInventories.length) {
      this.endGame(native);
      return;
    }

    if (kills === 0) {
      this.setInventory(native, level);
    }
  }

  private setInventory(player: mod.Player, level: number) {
    const inventory = Config.levelInventories[level];

    InventoryUtils.clear(player);
    InventoryUtils.set(
      player,
      new Map([
        [mod.InventorySlots.MeleeWeapon, mod.Gadgets.Melee_Sledgehammer],
      ])
    );
    InventoryUtils.set(player, inventory);
  }

  private endGame(winner: mod.Player) {
    // TODO IMPROVE WINNER HANDLING
    mod.EndGameMode(winner);
  }
}
