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

  public static getPrimaryWeapon(level: number): mod.Weapons {
    const inventory = Config.levelInventories[level];

    const weapon = inventory?.get(mod.InventorySlots.PrimaryWeapon) as
      | mod.Weapons
      | undefined;

    return weapon ?? Config.defaultWeapon;
  }
}
