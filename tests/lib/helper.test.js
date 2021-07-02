const {
  getInputValues,
  getRoverName,
  getFileInput,
} = require("../../src/lib/helper");
const { SAMPLE_INPUT } = require("../__mocks__/constant");

describe("getRoverName", function () {
  it("should return name when line format is correct", function () {
    expect(getRoverName("Rover1 Landing:1 2 N")).toBe("Rover1");
    expect(getRoverName("Rover2 Instructions:MMRMMRMRRMM")).toBe("Rover2");
    expect(getRoverName("Rover 2 Instructions:MMRMMRMRRMM")).toBe("Rover");
  });
});

describe("getInputValues", function () {
  it("should return name when line format is correct", function () {
    expect(getInputValues("Rover1 Landing:1 2 N")).toStrictEqual([
      "1",
      "2",
      "N",
    ]);
    expect(getInputValues("Rover2 Instructions:MMRMMRMRRMM")).toStrictEqual([
      "MMRMMRMRRMM",
    ]);
    expect(getInputValues("Rover 2 Instructions:MMRMMRMRRMM")).toStrictEqual([
      "MMRMMRMRRMM",
    ]);
    expect(getInputValues("")).toStrictEqual("");
  });
});

describe("getFileInput", function () {
  var fs = require("fs");

  const cb = (data) => data;
  it("should return name when line format is correct", function () {
    fs.readFile = jest.fn((_path, _format, callback) =>
      callback(null, SAMPLE_INPUT)
    );
    getFileInput("input.txt", cb);
    expect(fs.readFile.mock.calls).toHaveLength(1);
  });
  it("should error when path not found", function () {
    fs.readFile = jest.fn((_path, _format, callback) =>
      callback("Invalid path", null)
    );
    console.log = jest.fn();
    getFileInput("input.txt", cb);
    expect(fs.readFile.mock.calls).toHaveLength(1);
    expect(console.log).toHaveBeenCalledWith("Error in reading file");
  });
});
