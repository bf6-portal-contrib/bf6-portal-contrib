// TODO IMPROVE nominal brand
export type PlayerId = number;

export class Player<Custom> {
  id: PlayerId;
  // native: mod.Player;
  custom: Custom;

  constructor(native: mod.Player, custom: Custom) {
    this.id = mod.GetObjId(native);
    // this.native = native;
    this.custom = custom;
  }

  update(custom: Partial<Custom>) {
    this.custom = { ...this.custom, ...custom };
  }
}