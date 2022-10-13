import { Mongoose } from "mongoose";

const mongoose: Mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  type: {
    type: Number,
    required: true,
    enum: [8, 16],
  },

  status: {
    type: String,
    required: true,
    enum: ["open", "in_progress", "completed"],
  },

});

const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;
