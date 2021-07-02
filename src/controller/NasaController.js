const { getFileInput } = require("../lib/helper");
const { getPlateauCoordinates } = require("../lib/worker");
const { invalidInputError } = require("../view/Error");
const { printPlateauCoordinates } = require("../view/Plateau");

const processNasaInstructions = (data) => {
  const plateau = getPlateauCoordinates(data.split("\n"));
  if (plateau.error) invalidInputError(plateau.error);
  else printPlateauCoordinates(plateau.rovers);
};

const landRovers = (config) => {
  if (config.indexOf(".") < 0) {
    processNasaInstructions(config);
  } else {
    getFileInput(config, processNasaInstructions);
  }
};

module.exports = {
  landRovers,
};
