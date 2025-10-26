// TODO IMPROVE nominal brand
export type PlayerId = number;

export type CustomFn<Custom> = (player: Player<Custom>) => Custom;

export class Player<Custom> {
  id: PlayerId;
  native: mod.Player;
  custom: Custom;

  constructor(native: mod.Player, custom: Custom | CustomFn<Custom>) {
    this.id = mod.GetObjId(native);
    this.native = native;
    this.custom =
      typeof custom === "function"
        ? (custom as CustomFn<Custom>)(this)
        : custom;
  }

  update(custom: Partial<Custom>) {
    this.custom = { ...this.custom, ...custom };
  }
}
