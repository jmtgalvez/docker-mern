const { Schema, model } = require("mongoose");
const itemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: String,
});

module.exports = model("Items", itemSchema);
