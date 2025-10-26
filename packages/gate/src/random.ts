export class Random {
  static numberRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static vectorRange(min: mod.Vector, max: mod.Vector): mod.Vector {
    return mod.CreateVector(
      Random.numberRange(mod.XComponentOf(min), mod.XComponentOf(max)),
      Random.numberRange(mod.YComponentOf(min), mod.YComponentOf(max)),
      Random.numberRange(mod.ZComponentOf(min), mod.ZComponentOf(max))
    );
  }
}
