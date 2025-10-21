import { Gate } from '@bf6-portal-contrib/gate';

export class UIDebug {
  public subscribe() {
    Gate.subscribe("OnPlayerDeployed", this.onPlayerDeployed.bind(this));
  }

  public onPlayerDeployed(player: mod.Player) {
    const name = "debug_text";
    const position = mod.CreateVector(0, 100, 0);
    const size = mod.CreateVector(400, 200, 0);
    const anchor = mod.UIAnchor.TopCenter;
    const message = mod.Message(mod.stringkeys.title);
    const receiver = player;

    mod.AddUIText(name, position, size, anchor, message, receiver);
  }
}