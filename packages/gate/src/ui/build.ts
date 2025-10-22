import type { Container, Node, Text } from "./types.ts";

const DEFAULTS = {
  name: "",
  temporaryName: "__TEMPORARY_NAME__",
  parent: mod.GetUIRoot(),

  // Layout
  position: mod.CreateVector(0, 0, 0),
  size: mod.CreateVector(100, 100, 0),
  anchor: mod.UIAnchor.TopLeft,
  depth: mod.UIDepth.BelowGameUI,

  // Style
  visible: true,
  padding: {
    container: 0,
    rest: 8,
  },
  bgColor: mod.CreateVector(0.25, 0.25, 0.25),
  bgAlpha: 0.5,
  bgFill: mod.UIBgFill.Solid,

  // Text
  textSize: 24,
  textColor: mod.CreateVector(1, 1, 1),
  textAlpha: 1,
  textAnchor: mod.UIAnchor.CenterLeft,
};

export const build = {
  node: (node: Node): mod.UIWidget => {
    switch (node.type) {
      case "container":
        return build.container(node);
      case "text":
        return build.text(node);
      default:
        throw new Error(`Unknown node type: ${(node as any).type}`);
    }
  },
  container: (node: Container): mod.UIWidget => {
    const name = node.name ?? DEFAULTS.name;
    const args = [
      DEFAULTS.temporaryName,
      node.position ?? DEFAULTS.position,
      node.size ?? DEFAULTS.size,
      node.anchor ?? DEFAULTS.anchor,
      node.parent ?? DEFAULTS.parent,
      node.visible ?? DEFAULTS.visible,
      node.padding ?? DEFAULTS.padding.container,
      node.bgColor ?? DEFAULTS.bgColor,
      node.bgAlpha ?? DEFAULTS.bgAlpha,
      node.bgFill ?? DEFAULTS.bgFill,
      node.depth ?? DEFAULTS.depth,
      ...(node.receiver ? [node.receiver] : []),
    ] as Parameters<typeof mod.AddUIContainer>;

    mod.AddUIContainer(...args);

    return findAndNameWidget(name);
  },
  text: (node: Text): mod.UIWidget => {
    const name = node.name ?? DEFAULTS.name;
    const args = [
      DEFAULTS.temporaryName,
      node.position ?? DEFAULTS.position,
      node.size ?? DEFAULTS.size,
      node.anchor ?? DEFAULTS.anchor,
      node.parent ?? DEFAULTS.parent,
      node.visible ?? DEFAULTS.visible,
      node.padding ?? DEFAULTS.padding.rest,
      node.bgColor ?? DEFAULTS.bgColor,
      node.bgAlpha ?? DEFAULTS.bgAlpha,
      node.bgFill ?? DEFAULTS.bgFill,
      node.message,
      node.textSize ?? DEFAULTS.textSize,
      node.textColor ?? DEFAULTS.textColor,
      node.textAlpha ?? DEFAULTS.textAlpha,
      node.textAnchor ?? DEFAULTS.textAnchor,
      node.depth ?? DEFAULTS.depth,
      ...(node.receiver ? [node.receiver] : []),
    ] as Parameters<typeof mod.AddUIText>;

    mod.AddUIText(...args);

    return findAndNameWidget(name);
  },
};

const findAndNameWidget = (name: string): mod.UIWidget => {
  const widget = mod.FindUIWidgetWithName(DEFAULTS.temporaryName);

  mod.SetUIWidgetName(widget, name);

  return widget;
};
