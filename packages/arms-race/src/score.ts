import type { Player } from "@bf6-portal-contrib/gate";

import { Config } from "./config.ts";
import type { ArmsRacePlayerCustom } from "./types.ts";

export class Score {
  static update(
    player: Player<ArmsRacePlayerCustom>,
    otherPlayer: Player<ArmsRacePlayerCustom>,
    eventDeathType: mod.DeathType
  ): boolean {
    const isKnifeKill = mod.EventDeathTypeCompare(
      eventDeathType,
      mod.PlayerDeathTypes.Melee
    );

    if (isKnifeKill) {
      const level = Math.max(0, otherPlayer.custom.level - 1);
      otherPlayer.update({ level });
    }

    const incoming = isKnifeKill ? Config.killsPerLevel : 1;
    const candidate = player.custom.kills + incoming;

    const kills = candidate % Config.killsPerLevel;
    const levelIncrease = Math.floor(candidate / Config.killsPerLevel);
    const level = player.custom.level + levelIncrease;

    player.update({ kills, level });

    return levelIncrease > 0;
  }
}
