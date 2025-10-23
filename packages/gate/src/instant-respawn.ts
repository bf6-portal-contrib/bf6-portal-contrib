import { Gate } from "./gate.ts";

export class InstantRespawn {
  subscribe() {
    Gate.subscribe("OnGameModeStarted", () => {
      mod.SetSpawnMode(mod.SpawnModes.AutoSpawn);
    });

    Gate.subscribe("OnPlayerJoinGame", (native) => {
      mod.SkipManDown(native, true);
      mod.SetRedeployTime(native, 3);
    });
  }
}
