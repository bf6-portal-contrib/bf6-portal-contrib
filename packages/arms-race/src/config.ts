export const Config = {
  killsPerLevel: 2,

  levelInventories: [
    // new Map([
    //   [mod.InventorySlots.PrimaryWeapon, mod.Weapons.Sniper_M2010_ESR]
    // ]),
    new Map([[mod.InventorySlots.PrimaryWeapon, mod.Weapons.DMR_SVDM]]),
    new Map([[mod.InventorySlots.PrimaryWeapon, mod.Weapons.DMR_M39_EMR]]),
    new Map([[mod.InventorySlots.PrimaryWeapon, mod.Weapons.DMR_M39_EMR]]),
    new Map([[mod.InventorySlots.PrimaryWeapon, mod.Weapons.LMG_M_60]]),
    new Map([
      [mod.InventorySlots.PrimaryWeapon, mod.Weapons.AssaultRifle_M433],
    ]),
    new Map([[mod.InventorySlots.PrimaryWeapon, mod.Weapons.Carbine_M4A1]]),
    new Map([[mod.InventorySlots.PrimaryWeapon, mod.Weapons.SMG_SGX]]),
    new Map([[mod.InventorySlots.PrimaryWeapon, mod.Weapons.SMG_PW5A3]]),
    new Map([[mod.InventorySlots.PrimaryWeapon, mod.Weapons.Shotgun_M87A1]]),
    new Map([[mod.InventorySlots.PrimaryWeapon, mod.Weapons.Shotgun_M1014]]),
    new Map([[mod.InventorySlots.PrimaryWeapon, mod.Weapons.Sidearm_P18]]),
    new Map([[mod.InventorySlots.PrimaryWeapon, mod.Weapons.Sidearm_M45A1]]),
    new Map(),
  ] as Map<mod.InventorySlots, mod.Weapons | mod.Gadgets>[],

  get maxLevel(): number {
    return Config.levelInventories.length;
  },

  defaultWeapon: mod.Weapons.AssaultRifle_M433,
};