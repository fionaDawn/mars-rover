#!/usr/bin/env node

const { landRovers } = require("../src/controller/NasaController");

const handler = (args) =>
  args.length !== 3 ? console.log("Invalid command") : landRovers(args[2]);
handler(process.argv);
