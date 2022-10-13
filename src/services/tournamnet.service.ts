const PlayerGroup = require("../models/tournament-group.model");
const TournamentPlayer = require("../models/tournament-player.model");

interface IPlayerGroup {
  tournamentId: string;
  playerA: string;
  playerB?: string;
  stage?: number;
  winner?: string;
}

interface ITournamentPlayer {
  tournamentId: string;
  playerId: string;
  score: number;
}

export class TournamentService {
  private static instance: TournamentService;

  constructor() {}

  static getService(): TournamentService {
    if (!TournamentService.instance) {
      TournamentService.instance = new TournamentService();
    }

    return TournamentService.instance;
  }

  async createPlayerGroup({
    playerA,
    stage,
    tournamentId,
  }: IPlayerGroup): Promise<typeof PlayerGroup> {
    const group = new PlayerGroup({
      tournamentId,
      playerA,
      stage,
    });

    await group.save();

    return group;
  }

  async submitTournamentPlayerScore({
    tournamentId,
    playerId,
    score,
  }: ITournamentPlayer) {
    const player = await TournamentPlayer.findOne({
      playerId,
      tournamentId,
    });

    player.score = score;
    await player.save();

    return player;
  }
}
