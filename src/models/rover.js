const { NORTH, EAST, SOUTH, WEST } = require("../constants");

const Rover = class {
  constructor(name, data, plateau) {
    this.data = {
      coordinates: {
        x: data.x,
        y: data.y,
      },
      orientation: data.orientation,
      name: name,
      error: "",
      plateau: plateau,
    };
  }

  update = (newData) => {
    this.data = {
      ...this.data,
      ...newData,
    };
  };

  isInvalidCoordinates = (x, y) => {
    return (
      x < 0 ||
      x > this.data.plateau.data.configuration.x ||
      y < 0 ||
      y > this.data.plateau.data.configuration.y
    );
  };

  move = () => {
    let { x, y } = this.data.coordinates;
    switch (this.data.orientation) {
      case NORTH:
        ++y;
        break;
      case EAST:
        ++x;
        break;
      case SOUTH:
        --y;
        break;
      case WEST:
        --x;
        break;
    }
    const invalid =
      this.data.plateau.isCoordinatesTaken(x, y) ||
      this.isInvalidCoordinates(x, y);
    if (!invalid)
      this.update({
        coordinates: { x: parseInt(x), y: parseInt(y) },
      });
    // const newData = invalid
    //   ? { error: `${this.data.name}:Out of Plateau's range` }
    //   : {
    //       coordinates: { x: x, y: y },
    //     };
    // this.update(newData);
  };
};

module.exports = Rover;
