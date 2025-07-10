const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  originalUrl: { type: String },
  shortCode: { type: String },
});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
