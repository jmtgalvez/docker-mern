const { Schema, model } = require("mongoose");
const itemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Items", itemSchema);
