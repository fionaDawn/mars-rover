const { landRovers } = require("../../src/controller/NasaController");
var helper = require("../../src/lib/helper");
const {
  SAMPLE_INPUT,
  SAMPLE_INPUT_WITH_INVALID_COORDINATES,
  SAMPLE_INPUT_NO_PLATEAU,
} = require("../__mocks__/constant");

describe("landRovers", function () {
  var fs = require("fs");
  it("should return the correct plateau coordinates for file input", function () {
    fs.readFile = jest.fn((_path, _format, callback) =>
      callback(null, SAMPLE_INPUT)
    );
    console.log = jest.fn();
    landRovers("input.txt");
    expect(console.log).toHaveBeenCalledWith("Rover1:1 3 N");
    expect(console.log).toHaveBeenCalledWith("Rover2:5 1 E");
  });

  it("should return the correct plateau coordinates for cmd input", function () {
    console.log = jest.fn();
    landRovers(SAMPLE_INPUT);
    expect(console.log).toHaveBeenCalledWith("Rover1:1 3 N");
    expect(console.log).toHaveBeenCalledWith("Rover2:5 1 E");
  });

  it("should return with error for cmd input", function () {
    console.log = jest.fn();
    landRovers(SAMPLE_INPUT_WITH_INVALID_COORDINATES);
    expect(console.log).not.toHaveBeenCalledWith("Rover2:5 1 E");
  });

  it("should return with error for file input", function () {
    fs.readFile = jest.fn((_path, _format, callback) =>
      callback(null, SAMPLE_INPUT_NO_PLATEAU)
    );
    console.log = jest.fn();
    landRovers(SAMPLE_INPUT_NO_PLATEAU);
    expect(console.log).toHaveBeenCalledWith(
      "Error: Missing Plateau configuration"
    );
  });
});
