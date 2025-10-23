// Utilities

export interface Layout {
  anchor: mod.UIAnchor;
  position: mod.Vector;
  size: mod.Vector;
  depth: mod.UIDepth;
}

export interface Style {
  visible: boolean;
  padding: number;
  bgColor: mod.Vector;
  bgAlpha: number;
  bgFill: mod.UIBgFill;
}

export interface Targeted {
  receiver: mod.Player | mod.Team;
}

export type BaseNode<T> = {
  type: T;
  name?: string;
  parent?: mod.UIWidget;
} & Partial<Layout> &
  Partial<Style> &
  Partial<Targeted>;

// Specific Nodes

export type Container = BaseNode<"container"> & {
  children?: Node[];
};

export type Text = BaseNode<"text"> & {
  message: mod.Message;
  textSize?: number;
  textColor?: mod.Vector;
  textAlpha?: number;
  textAnchor?: mod.UIAnchor;
};

export type WeaponImage = {
  type: "weaponImage";
  name?: string;
  parent?: mod.UIWidget;
  weapon: mod.Weapons;
} & Partial<Omit<Layout, "depth">>;

// Union of all node types

export type Node = Container | Text | WeaponImage;
