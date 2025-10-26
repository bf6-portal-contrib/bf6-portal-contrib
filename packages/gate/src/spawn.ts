export class Spawn {
  static vehicleSpawner(
    position: mod.Vector,
    vector: mod.Vector
  ): mod.VehicleSpawner {
    return mod.SpawnObject(
      mod.RuntimeSpawn_Common.VehicleSpawner,
      position,
      vector
    ) as mod.VehicleSpawner;
  }
}
