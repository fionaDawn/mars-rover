const { getPlateauCoordinates } = require("../../src/lib/worker");
const {
  SAMPLE_INPUT,
  SAMPLE_INPUT_WITH_INVALID_COORDINATES,
  SAMPLE_INPUT_NO_PLATEAU,
  SAMPLE_INPUT_WITH_CLASHING_COORDINATES,
} = require("../__mocks__/constant");

describe("getPlateauCoordinates", function () {
  it("correct plateau coordinates with valid input", function () {
    const rovers = getPlateauCoordinates(SAMPLE_INPUT.split("\n")).rovers;
    expect(rovers).toHaveLength(2);
    const rover1 = rovers[0];
    expect(rover1.coordinates).toStrictEqual({ x: 1, y: 3 });
    expect(rover1.orientation).toBe("N");
    // expect(rover1.maxCoordinates).toStrictEqual({ x: "5", y: "5" });
    expect(rover1.error).toBe("");
  });

  it("only 1 rover should land", function () {
    const rovers = getPlateauCoordinates(
      SAMPLE_INPUT_WITH_INVALID_COORDINATES.split("\n")
    ).rovers;
    expect(rovers).toHaveLength(1);
    // const rover2 = rovers[1];
    // console.log(rover2);
    // expect(rover2.coordinates).toStrictEqual({ x: 5, y: 1 });
    // expect(rover2.orientation).toBe("E");
    // expect(rover2.error).toBe("");
  });

  it("correct plateau coordinates with valid invalid input", function () {
    const rovers = getPlateauCoordinates(
      SAMPLE_INPUT_WITH_CLASHING_COORDINATES.split("\n")
    ).rovers;
    expect(rovers).toHaveLength(2);
    const rover2 = rovers[1];
    console.log(rover2);
    expect(rover2.coordinates).toStrictEqual({ x: 2, y: 4 });
    expect(rover2.orientation).toBe("N");
    expect(rover2.error).toBe("");
  });

  it("should return error when Plateau configuration is missing", function () {
    const plateau = getPlateauCoordinates(SAMPLE_INPUT_NO_PLATEAU.split("\n"));
    expect(plateau.error).toBe("Error: Missing Plateau configuration");
  });
});
