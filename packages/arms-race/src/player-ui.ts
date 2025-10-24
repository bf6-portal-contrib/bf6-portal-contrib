import * as ui from "@bf6-portal-contrib/gate/ui";

const textColor = mod.CreateVector(0.72, 0.78, 0.81);

export class PlayerUI {
  static build(
    kills: number,
    level: number,
    receiver: mod.Player
  ): mod.UIWidget {
    return ui.build.node({
      receiver,
      type: "container",

      anchor: mod.UIAnchor.BottomRight,
      position: mod.CreateVector(288, 68, 0),
      size: mod.CreateVector(144, 64, 0),

      bgFill: mod.UIBgFill.None,

      children: [
        // Kills Container
        {
          type: "container",

          anchor: mod.UIAnchor.CenterLeft,
          size: mod.CreateVector(64, 64, 0),

          bgFill: mod.UIBgFill.Blur,

          children: [
            {
              type: "text",

              anchor: mod.UIAnchor.TopCenter,
              size: mod.CreateVector(64, 64, 0),

              bgFill: mod.UIBgFill.None,

              message: mod.Message(mod.stringkeys.kills),
              textSize: 16,
              textColor,
              textAnchor: mod.UIAnchor.TopCenter,
            },
            {
              type: "text",
              name: "kills",

              anchor: mod.UIAnchor.BottomCenter,
              size: mod.CreateVector(64, 64, 0),

              bgFill: mod.UIBgFill.None,

              message: mod.Message(mod.stringkeys.numeric, kills),
              textSize: 36,
              textColor,
              textAnchor: mod.UIAnchor.BottomCenter,
            },
          ],
        },

        // Level Container
        {
          type: "container",

          anchor: mod.UIAnchor.CenterRight,
          size: mod.CreateVector(64, 64, 0),

          bgFill: mod.UIBgFill.Blur,

          children: [
            {
              type: "text",

              anchor: mod.UIAnchor.TopCenter,
              size: mod.CreateVector(64, 64, 0),

              bgFill: mod.UIBgFill.None,

              message: mod.Message(mod.stringkeys.level),
              textSize: 16,
              textColor,
              textAnchor: mod.UIAnchor.TopCenter,
            },
            {
              type: "text",
              name: "level",

              anchor: mod.UIAnchor.BottomCenter,
              size: mod.CreateVector(64, 64, 0),

              bgFill: mod.UIBgFill.None,

              message: mod.Message(mod.stringkeys.numeric, level),
              textSize: 36,
              textColor,
              textAnchor: mod.UIAnchor.BottomCenter,
            },
          ],
        },
      ],
    });
  }

  static update(kills: number, level: number, root: mod.UIWidget) {
    mod.SetUITextLabel(
      mod.FindUIWidgetWithName("kills", root),
      mod.Message(mod.stringkeys.numeric, kills)
    );

    mod.SetUITextLabel(
      mod.FindUIWidgetWithName("level", root),
      mod.Message(mod.stringkeys.numeric, level)
    );
  }
}
