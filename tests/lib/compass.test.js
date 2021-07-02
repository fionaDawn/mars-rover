const { getNextCompassOrientation } = require("../../src/lib/compass");

describe("getNextCompassOrientation", function () {
  it("should return the new orientation when facing left", function () {
    expect(getNextCompassOrientation("N", true)).toBe("W");
    expect(getNextCompassOrientation("E", true)).toBe("N");
    expect(getNextCompassOrientation("S", true)).toBe("E");
    expect(getNextCompassOrientation("W", true)).toBe("S");
  });

  it("should return the new orientation when facing right", function () {
    expect(getNextCompassOrientation("N")).toBe("E");
    expect(getNextCompassOrientation("E")).toBe("S");
    expect(getNextCompassOrientation("S", false)).toBe("W");
    expect(getNextCompassOrientation("W", false)).toBe("N");
  });

  it("should return blank for invalid direction", function () {
    expect(getNextCompassOrientation("A")).toBe("");
    expect(getNextCompassOrientation("B", true)).toBe("");
    expect(getNextCompassOrientation("C", false)).toBe("");
  });
});
