const fileError = () => console.log("Error in reading file");
const invalidInputError = (err) => console.log(err);
module.exports = {
  fileError,
  invalidInputError,
};
