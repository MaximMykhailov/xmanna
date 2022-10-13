import { Application } from "express";

require("./db/mongoose");
const express = require("express");
const TournamentRouter = require("./routers/tournament.router");

const app: Application = express();

app.use(express.json());

app.use(TournamentRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
