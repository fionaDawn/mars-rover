const Plateau = require("../models/plateau");
const Rover = require("../models/rover");
const { getInputValues, getRoverName } = require("./helper");
const { getNextCompassOrientation } = require("../lib/compass");

// const isInvalidCoordinates = (maxCoordinates, y) =>
//   x < 0 || x > maxCoordinates.x || y < 0 || y > maxCoordinates.y;

// const move = (maxCoordinates) => {
//   let { x, y } = this.data.coordinates;
//   switch (this.data.orientation) {
//     case NORTH:
//       ++y;
//       break;
//     case EAST:
//       ++x;
//       break;
//     case SOUTH:
//       --y;
//       break;
//     case WEST:
//       --x;
//       break;
//   }
//   const invalid = isInvalidCoordinates(maxCoordinates, x, y);
//   if (!invalid)
//     this.update({
//       coordinates: { x: x, y: y },
//     });
//   // const newData = invalid
//   //   ? { error: `${this.data.name}:Out of Plateau's range` }
//   //   : {
//   //       coordinates: { x: x, y: y },
//   //     };
//   // this.update(newData);
// };

const processInstructions = (plateau, instructions, rover) => {
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
        rover.move(plateau.data.maxCoordinates);
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
  let skip = false;
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
          if (!skip) {
            processInstructions(plateau, inputVals[0], rover);
            plateau.addRover(rover);
          }
        } else {
          // Landing
          const inputX = inputVals[0];
          const inputY = inputVals[1];
          const coordinatesResultTaken = plateau.isCoordinatesTaken(
            inputX,
            inputY
          );
          if (coordinatesResultTaken) {
            skip = true;
          } else {
            rover = new Rover(
              name,
              {
                x: inputX,
                y: inputY,
                orientation: inputVals[2],
              },
              plateau
            );
            skip = false;
          }
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
