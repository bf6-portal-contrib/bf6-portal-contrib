import * as ui from "@bf6-portal-contrib/gate/ui";

import { Inventory } from "./inventory.ts";
import { Config } from "./config.ts";

export class PlayerUI {
  static build(level: number, receiver: mod.Player): mod.UIWidget {
    return ui.build.node({
      receiver,
      type: "container",
      name: "container",

      anchor: mod.UIAnchor.TopRight,
      position: mod.CreateVector(200, 200, 0),
      size: mod.CreateVector(64 + 128 + 128, 64, 0),

      children: [
        {
          type: "weaponImage",
          name: "weaponIcon",
          weapon: Inventory.getPrimaryWeapon(level),

          anchor: mod.UIAnchor.CenterLeft,
          position: mod.CreateVector(0, 0, 0),
          size: mod.CreateVector(64, 64, 0),
        },
        {
          type: "text",
          name: "level",

          anchor: mod.UIAnchor.CenterLeft,
          position: mod.CreateVector(64, 0, 0),
          size: mod.CreateVector(128, 64, 0),

          // bgAlpha: 0,

          message: mod.Message(
            mod.stringkeys.currentLevel,
            level,
            Config.maxLevel
          ),
          textSize: 24,
        },
        {
          type: "text",
          name: "you",

          anchor: mod.UIAnchor.CenterLeft,
          position: mod.CreateVector(64 + 128, 0, 0),
          size: mod.CreateVector(128, 64, 0),

          // bgAlpha: 0,

          message: mod.Message(mod.stringkeys.you),
          textSize: 24,
        },
      ],
    });
  }

  static update(level: number, root: mod.UIWidget) {
    // TODO UPDATE WEAPON ICON
    // const weaponIconWidget = mod.FindUIWidgetWithName('weaponIcon', root);

    const levelWidget = mod.FindUIWidgetWithName("level", root);
    mod.SetUITextLabel(levelWidget, mod.Message(mod.stringkeys.currentLevel, level, Config.maxLevel));
  }
}

