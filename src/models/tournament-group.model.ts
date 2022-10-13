import { Mongoose } from "mongoose";

const mongoose: Mongoose = require("mongoose");

const tournamentGroupSchema = new mongoose.Schema({
  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Tournament",
  },

  playerA: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "TournamentPlayer",
  },

  playerB: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TournamentPlayer",
  },

  stage: {
    type: Number,
    required: true,
  },

  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TournamentPlayer",
  },
});

const TournamentGroup = mongoose.model(
  "TournamentGroup",
  tournamentGroupSchema
);

module.exports = TournamentGroup;
