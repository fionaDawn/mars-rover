const SAMPLE_INPUT =
  "Plateau:5 5\nRover1 Landing:1 2 N\nRover1 Instructions:LMLMLMLMM\nRover2 Landing:3 3 E\nRover2 Instructions:MMRMMRMRRM";
const SAMPLE_INPUT_WITH_INVALID_COORDINATES =
  "Plateau:5 5\nRover1 Landing:1 2 N\nRover1 Instructions:LMLMLMLMMA\nRover2 Landing:3 3 E\nRover2 Instructions:MMRMMRMRRMM\n";
const SAMPLE_INPUT_NO_PLATEAU =
  "Rover2 Landing:3 3 E\nRover2 Instructions:MMRMMRMRRMs";
module.exports = {
  SAMPLE_INPUT,
  SAMPLE_INPUT_WITH_INVALID_COORDINATES,
  SAMPLE_INPUT_NO_PLATEAU,
};
