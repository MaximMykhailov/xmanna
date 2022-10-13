import { Mongoose } from "mongoose";

const mongoose: Mongoose = require("mongoose");

const tournamentPlayerSchema = new mongoose.Schema({
  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Tournament",
  },

  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Player",
  },

  score: {
    type: Number,
    required: true,
    default: 0,
  },
});

const TournamentPlayer = mongoose.model(
  "TournamentPlayer",
  tournamentPlayerSchema
);

module.exports = TournamentPlayer;
