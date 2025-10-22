// Utilities

export interface Layout {
  position: mod.Vector;
  size: mod.Vector;
  anchor: mod.UIAnchor;
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

export type Container = BaseNode<"container">;

export type Text = BaseNode<"text"> & {
  message: mod.Message;
  textSize?: number;
  textColor?: mod.Vector;
  textAlpha?: number;
  textAnchor?: mod.UIAnchor;
};

// Union of all node types

export type Node = Container | Text;
