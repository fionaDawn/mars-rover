const { NORTH, EAST, SOUTH, WEST } = require("../constants");

const Rover = class {
  constructor(name, data, maxCoordinates) {
    this.data = {
      coordinates: {
        x: data.x,
        y: data.y,
      },
      orientation: data.orientation,
      name: name,
      error: "",
      maxCoordinates: maxCoordinates,
    };
  }

  isInvalidCoordinates = (x, y) =>
    x < 0 ||
    x > this.data.maxCoordinates.x ||
    y < 0 ||
    y > this.data.maxCoordinates.y;

  update = (newData) => {
    this.data = {
      ...this.data,
      ...newData,
    };
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
    const res = this.isInvalidCoordinates(x, y);
    const newData = res
      ? { error: `${this.data.name}:Out of Plateau's range` }
      : {
          coordinates: { x: x, y: y },
        };
    this.update(newData);
  };
};

module.exports = Rover;
