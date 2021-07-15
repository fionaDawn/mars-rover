const Plateau = class {
  constructor() {
    this.data = {
      configuration: { x: 0, y: 0 },
      rovers: [],
      error: "",
    };
  }

  create = (data) => {
    this.data = {
      ...this.data,
      configuration: { x: data.x, y: data.y },
    };
  };

  addRover = (rover) => this.data.rovers.push(rover.data);

  isCoordinatesTaken = (x, y) => {
    const result = this.data.rovers.some((r) => {
      const currentCoordinates = r.coordinates;
      return (
        currentCoordinates.x === parseInt(x) &&
        currentCoordinates.y === parseInt(y)
      );
    });
    return result;
  };
};

module.exports = Plateau;
