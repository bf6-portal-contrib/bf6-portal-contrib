export type Inventory = Map<mod.InventorySlots, mod.Weapons | mod.Gadgets>;

export class InventoryUtils {
  static clear(player: mod.Player): void {
    [
      mod.InventorySlots.PrimaryWeapon,
      mod.InventorySlots.SecondaryWeapon,
      mod.InventorySlots.MeleeWeapon,
      mod.InventorySlots.Throwable,

      mod.InventorySlots.GadgetOne,
      mod.InventorySlots.GadgetTwo,
      mod.InventorySlots.ClassGadget,
      mod.InventorySlots.MiscGadget,
    ].forEach((slot) => {
      mod.RemoveEquipment(player, slot);
    });
  }

  static set(player: mod.Player, inventory: Inventory) {
    for (const [slot, item] of inventory.entries()) {
      mod.AddEquipment(player, item as any, slot);
    }
  }
};