const Plateau = require("../models/plateau");
const Rover = require("../models/rover");
const { getInputValues, getRoverName } = require("./helper");
const { getNextCompassOrientation } = require("../lib/compass");

const processInstructions = (instructions, rover) => {
  while (instructions) {
    switch (instructions.slice(0, 1)) {
      case "L":
        rover.update({
          orientation: getNextCompassOrientation(rover.data.orientation, true),
        });
        break;
      case "R":
        rover.update({
          orientation: getNextCompassOrientation(rover.data.orientation),
        });
        break;
      case "M":
        rover.move();
        break;
      default:
        //   don't do anything if char isn't supported, just skip it
        break;
    }
    instructions = instructions.slice(1, instructions.length + 1);
  }
};

const getPlateauCoordinates = (config) => {
  var plateau = new Plateau();
  let rover;
  config.every((line, idx) => {
    const name = getRoverName(line);
    const inputVals = getInputValues(line);
    let retValue = true;
    // idx 0 is plateau configuration
    if (inputVals) {
      if (idx === 0) {
        if (name.indexOf("Plateau") < 0) {
          plateau.data.error = "Error: Missing Plateau configuration";
          retValue = false;
        } else plateau.create({ x: inputVals[0], y: inputVals[1] });
      } else {
        if (idx % 2 === 0) {
          processInstructions(inputVals[0], rover);
          plateau.addRover(rover);
        } else {
          // Landing
          rover = new Rover(
            name,
            {
              x: inputVals[0],
              y: inputVals[1],
              orientation: inputVals[2],
            },
            plateau.data.configuration
          );
        }
      }
    }
    return retValue;
  });
  return plateau.data;
};

module.exports = {
  getInputValues,
  getPlateauCoordinates,
};
