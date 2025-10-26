import { Log } from "@bf6-portal-contrib/gate";

export class VehicleSpawnerPool<Key extends string | number> {
  private free: mod.VehicleSpawner[];
  private used: Partial<Record<Key, mod.VehicleSpawner>>;

  constructor(spawnerIds: number[]) {
    this.free = spawnerIds
      .map((id) => {
        const spawner = mod.GetVehicleSpawner(id);

        if (!spawner) {
          Log.error(
            "VehicleSpawnerPool",
            `Vehicle spawner with  ${id} does not exist`
          );
          return;
        }

        return spawner;
      })
      .filter(Boolean) as mod.VehicleSpawner[];

    this.used = {};

    Log.info(
      "VehicleSpawnerPool",
      `Initialized with ${this.free.length} spawners`
    );
  }

  public acquire(key: Key): mod.VehicleSpawner | undefined {
    if (this.free.length === 0) {
      Log.info(
        "VehicleSpawnerPool",
        `No free vehicle spawners available for ${key}`
      );
      return;
    }

    const spawner = this.free.shift()!;
    this.used[key] = spawner;

    return spawner;
  }

  public release(key: Key): void {
    const value = this.used[key];

    if (!value) {
      Log.warn(
        "VehicleSpawnerPool",
        `Trying to release vehicle spawner for ${key} but not currently acquired`
      );
      return;
    }

    delete this.used[key];

    this.free.push(value);
  }
}
