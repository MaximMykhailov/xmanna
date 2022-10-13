import { Request, Response } from "express";
import { TournamentService } from "../services/tournamnet.service";

const express = require("express");
const router = new express.Router();
const Tournament = require("../models/tournament.model");
const TournamentGroup = require("../models/tournament-group.model");
const TournamentPlayer = require("../models/tournament-player.model");
const tournamentService = TournamentService.getService();

router.post(
  "/tournaments/join",
  async (
    request: Request<any, { playerId: string; tournamentType: number }>,
    response: Response
  ) => {
    const {
      body: { playerId, tournamentType },
    } = request;

    try {
      const { _id: tournamentId } = await Tournament.findOne({
        type: tournamentType,
        status: "open",
      });

      const playerGroup = await TournamentGroup.findOne({
        tournamentId,
        playerA: {
          $ne: playerId,
        },
        playerB: {
          $exists: false,
        },
        stage: 1,
      });

      const tournamentPlayer = new TournamentPlayer({
        tournamentId,
        playerId,
      });

      tournamentPlayer.save();

      if (!playerGroup) {
        const group = await tournamentService.createPlayerGroup({
          tournamentId,
          playerA: tournamentPlayer._id,
          stage: 1,
        });

        return response.send(group);
      } else {
        playerGroup.playerB = playerId;

        playerGroup.save();

        // FIXME: after group is saved check if there is still room for more players, if not change status to in_progress, so that the other players couldn't get to room;

        return response.send(playerGroup);
      }
    } catch (error) {
      console.log(error);
      response.sendStatus(400);
    }
  }
);

router.post(
  "/tournaments/:tournamentId/score/:playerId",
  async (
    request: Request<
      { tournamentId: string; playerId: string },
      { score: number }
    >,
    response: Response
  ) => {
    const { tournamentId, playerId } = request.params;
    const { score } = request.body;

    try {
      const tournamentPlayer =
        await tournamentService.submitTournamentPlayerScore({
          tournamentId,
          playerId,
          score,
        });

      response.send(tournamentPlayer);
    } catch (error) {
      console.error(error);
      response.sendStatus(400);
    }
  }
);

router.get(
  "/tournaments/:tournamentId/status",
  async (request: Request<{ tournamentId: string }>, response: Response) => {
    try {
      const tournament = await Tournament.findById(request.params.tournamentId);

      return response.send(tournament.status);
    } catch (error) {
      console.error(error);
      return response.sendStatus(400);
    }
  }
);

module.exports = router;
