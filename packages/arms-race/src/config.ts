const weaponToInventory = (
  weapon: mod.Weapons
): Map<mod.InventorySlots, mod.Weapons> =>
  new Map([[mod.InventorySlots.PrimaryWeapon, weapon]]);

export const Config = {
  killsPerLevel: 2,

  levelInventories: [
    ...[
      // Snipers
      mod.Weapons.Sniper_PSR,
      mod.Weapons.Sniper_M2010_ESR,

      // DMRs
      mod.Weapons.DMR_SVK_86,
      mod.Weapons.DMR_M39_EMR,

      // LMGs
      mod.Weapons.LMG_M240L,
      mod.Weapons.LMG_M250,

      // Assault Rifles
      mod.Weapons.AssaultRifle_M433,
      mod.Weapons.AssaultRifle_NVO_228E,

      // Carbines
      mod.Weapons.Carbine_M4A1,
      mod.Weapons.Carbine_SG_553R,

      // SMGs
      mod.Weapons.SMG_SGX,
      mod.Weapons.SMG_KV9,

      // Shotguns
      mod.Weapons.Shotgun_M87A1,
      mod.Weapons.Shotgun_M1014,

      // Sidearms
      mod.Weapons.Sidearm_P18,
      mod.Weapons.Sidearm_M45A1,
    ].map(weaponToInventory),

    // Knife
    new Map(),
  ] as Map<mod.InventorySlots, mod.Weapons | mod.Gadgets>[],

  get maxLevel(): number {
    return Config.levelInventories.length;
  },

  defaultWeapon: mod.Weapons.AssaultRifle_M433,
};
