const mongoose = require("mongoose");
mongoose.set("strictQuery", true)
async function connectionDB(url) {
  return mongoose.connect(url); // returns a promise
}

module.exports = { connectionDB };
