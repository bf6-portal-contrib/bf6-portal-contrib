export class VehicleUtils {
  static isJet(vehicleType: mod.VehicleList): boolean {
    return [
      mod.VehicleList.F16,
      mod.VehicleList.F22,
      mod.VehicleList.SU57,
      mod.VehicleList.JAS39,
    ].includes(vehicleType)
  }
}