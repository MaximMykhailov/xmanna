import { Mongoose } from "mongoose";

const mongoose: Mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
