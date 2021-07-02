const { COMPASS_POINTS } = require("../constants");

const getNextCompassOrientation = (currentDirection, isLeft = false) => {
  let res = "";
  let currDirection = COMPASS_POINTS.indexOf(currentDirection);

  if (currDirection >= 0) {
    // if going to the right and current index is the last index,
    // get index 0 to change orientation
    let endIdx = COMPASS_POINTS.length - 1,
      startIdx = 0;
    // meanwhile, if going to the left and current index is at 0,
    // get the last index to change orientation
    if (isLeft) {
      endIdx = startIdx;
      startIdx = COMPASS_POINTS.length - 1;
    }
    const newIdx =
      currDirection === endIdx
        ? startIdx
        : isLeft
        ? --currDirection
        : ++currDirection;
    res = COMPASS_POINTS.charAt(newIdx);
  }
  return res;
};

module.exports = {
  getNextCompassOrientation,
};

0;
3;
