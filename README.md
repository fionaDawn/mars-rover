# Mars Rover

#### Pre-requisites:

- node

### How to run locally?

1. Clone this repo and run `npm install` in the root folder.
2. To run on command line, run `npm start "<sample configuration>"`, e.g.

```
npm start "Plateau:5 5
Rover1 Landing:1 2 N
Rover1 Instructions:LMLMLMLMM
Rover2 Landing:3 3 E
Rover2 Instructions:MMRMMRMRRM"

```

3. To feed a file input run `npm start <filepath>`, e.g.

```
npm start input.txt
```

### How to test?

Run `npm test` in the root folder

## The Problem

https://github.com/abdulg/Mars-Rover/blob/master/README.md

## The Solution

This project is written in Node. File structure is patterned to MVC style. Models are separate from the controller, and so on. Jest is used for testing.

### Possible Imporovements on next iteration:

1. More validation for invalid characters and input format
2. Support for single rover only on a single coordinate.
3. Throw exception when unsupported files are used as input

### Questions asked and own answers/assumptions:

1. What do we do with invalid characters (e.g. LRAMLR)?
   Skip the invalid characters
2. Should we consider negative coordinates for the plateau condiguration?
   No, let's use only the first quadrant which accept positive numbers only from 0 to N.
3. What happens if the rover's instructions go over the inputted max coordinates?
   Return rover is out of range error for that spefic rover, the rest should still be able to give the correct coordinates.
4. Can multiple rovers be in the same position?
   Yes.
5. What happens if the first line is not a plateau configuration?
   Return error. This program strictly follow the format and naming as stated in input.txt. so first line has to be Plateau's configuration in format `Plateau:x y`
6. What are the supported file inputs?
   .txt and .doc, but this program doesn't return error for unsupported file yet.

### Notes

I initially thought of using linked list for getting the next orientation when a rover is 'M'oved. That way we won't have to keep track on the indeces but rather just get the next if 'R'ight or get the previous node when 'L'eft.

Placing in logic coding here for reference

```
#!/usr/bin/env node

const NORTH = "N";
const EAST = "E";
const SOUTH = "S";
const WEST = "W";
const directions = "NESW";

const getNextDirection = (currentDirection, isLeft = false) => {
  // if going to the right and current index is the last index,
  // get index 0 to change orientation
  let endIdx = directions.length - 1,
    startIdx = 0;
  // meanwhile, if going to the left and current index is at 0,
  // get the last index to change orientation
  if (isLeft) {
    endIdx = startIdx;
    startIdx = directions.length - 1;
  }
  let currDirection = directions.indexOf(currentDirection);
  return directions.charAt(
    currDirection === endIdx
      ? startIdx
      : isLeft
      ? --currDirection
      : ++currDirection
  );
};

const isPositionNotInPlateau = (max, x, y) =>
  x < 0 || y < 0 || x > max.x || y > max.y;

const move = (direction, x, y) => {
  switch (direction) {
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
    default:
      break;
  }
  return {
    x: x,
    y: y,
  };
};

const getPosition = (config) =>
  config.reduce(
    (res, line, idx) => {
      const name = line.substring(0, line.indexOf(" "));
      const inputVals = line.substring(line.indexOf(":") + 1).split(" ");
      // idx 0 is plateau configuration
      if (idx === 0) {
        res = {
          ...res,
          max: {
            x: inputVals[0],
            y: inputVals[1],
          },
        };
      } else {
        if (idx % 2 === 0) {
          let instructions = inputVals[0];
          //   Instructions
          while (instructions) {
            switch (instructions.slice(0, 1)) {
              case "L":
                res.facing = getNextDirection(res.facing, true);
                break;
              case "R":
                res.facing = getNextDirection(res.facing);
                break;
              case "M":
                const newCoordinates = move(res.facing, res.x, res.y);
                res = { ...res, ...newCoordinates };
                if (isPositionNotInPlateau(res.max, res.x, res.y)) {
                  instructions = "";
                  res.error = "Rover is out of Plateau's range";
                }
                break;
              default:
                //   don't do anything if char isn't supported, just skip it
                break;
            }
            instructions = instructions.slice(1, instructions.length + 1);
          }
          res.coors.push(
            res.error
              ? `${name}:${res.error}`
              : `${name}:${res.x} ${res.y} ${res.facing}`
          );
        } else {
          //   Landing
          res = {
            ...res,
            x: inputVals[0],
            y: inputVals[1],
            facing: inputVals[2],
            error: "",
          };
        }
      }
      return res;
    },
    { coors: [] }
  );

let input = process.argv[2];
if (input.indexOf(".") < 0) {
  input = process.argv[2].split("\n");
  console.log(getPosition(input).coors.join("\n"));
} else {
  var fs = require("fs"),
    filename = process.argv[2];
  fs.readFile(filename, "utf8", function (err, data) {
    if (err) console.log("Error in file");
    else {
      input = data.split("\n");
      console.log(getPosition(input).coors.join("\n"));
    }
  });
}
```
