const { fileError } = require("../view/Error");

const getRoverName = (line) => line.substring(0, line.indexOf(" "));

const getInputValues = (line) =>
  line && line.substring(line.indexOf(":") + 1).split(" ");

const getFileInput = (filepath, cb) => {
  var fs = require("fs");
  fs.readFile(filepath, "utf8", function (err, data) {
    if (err) fileError();
    else cb(data);
  });
};

module.exports = {
  getRoverName,
  getInputValues,
  getFileInput,
};
