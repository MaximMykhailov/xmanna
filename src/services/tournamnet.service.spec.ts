const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const PlayerGroup = require("../models/tournament-group.model");

import { TournamentService } from "./tournamnet.service";

describe("TournamentService", () => {
  let service: TournamentService;

  beforeEach(() => {
    service = new TournamentService();
  });

  it("should create player group", async () => {
    const mockPlayerGroup = {
      playerA: mongoose.Types.ObjectId(),
      stage: 1,
      tournamentId: mongoose.Types.ObjectId(),
    };

    mockingoose(PlayerGroup).toReturn(mockPlayerGroup, "save");

    const { playerA, stage, tournamentId } = await service.createPlayerGroup(
      mockPlayerGroup
    );

    expect(playerA).toBe(mockPlayerGroup.playerA);
    expect(stage).toBe(mockPlayerGroup.stage);
    expect(tournamentId).toBe(mockPlayerGroup.tournamentId);
  });
});
