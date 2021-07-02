const { invalidInputError } = require("./Error");

const printPlateauCoordinates = (plateau) => {
  plateau.forEach((element) => {
    element.error
      ? invalidInputError(element.error)
      : console.log(
          `${element.name}:${element.coordinates.x} ${element.coordinates.y} ${element.orientation}`
        );
  });
};

module.exports = {
  printPlateauCoordinates,
};
