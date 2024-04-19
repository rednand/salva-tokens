const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokens = new Schema({
  token: String,
  celulares: [String],
});

const schemas = {
  tokens: mongoose.model("tokens", tokens),
};

module.exports = schemas;
