export class SoldierUtils {
  static getClass(player: mod.Player): mod.SoldierClass {
    return [
        mod.SoldierClass.Assault,
        mod.SoldierClass.Engineer,
        mod.SoldierClass.Support,
        mod.SoldierClass.Recon,
    ].find((sClass) => mod.IsSoldierClass(player, sClass))!;
  }

  static getTeamFaction(team: mod.Team): mod.Factions {
    return [
      mod.Factions.NATO,
      mod.Factions.PaxArmata,
    ].find((faction) => mod.IsFaction(team, faction))!;
  }

}