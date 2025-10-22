import { InventoryUtils } from "@bf6-portal-contrib/gate";

import { Config } from "./config.ts";

export class Inventory {
  public static set(player: mod.Player, level: number) {
    const inventory = Config.levelInventories[level];

    if (!inventory) return;

    InventoryUtils.clear(player);
    InventoryUtils.set(
      player,
      new Map([
        [mod.InventorySlots.MeleeWeapon, mod.Gadgets.Melee_Hunting_Knife],
      ])
    );
    InventoryUtils.set(player, inventory);
  }
}