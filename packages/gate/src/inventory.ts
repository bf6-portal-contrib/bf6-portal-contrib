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

  static inferClass(player: mod.Player): mod.SoldierClass | undefined {
    const relations = [
      {
        class: mod.SoldierClass.Assault,
        gadget: mod.Gadgets.Class_Adrenaline_Injector,
      },
      {
        class: mod.SoldierClass.Engineer,
        gadget: mod.Gadgets.Class_Repair_Tool,
      },
      {
        class: mod.SoldierClass.Support,
        gadget: mod.Gadgets.Class_Supply_Bag,
      },
      {
        class: mod.SoldierClass.Recon,
        gadget: mod.Gadgets.Class_Motion_Sensor,
      },
    ];

    return relations.find((relation) =>
      mod.HasEquipment(player, relation.gadget)
    )?.class;
  }
}
