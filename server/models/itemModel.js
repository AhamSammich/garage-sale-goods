const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
    modelNo: {
      type: String,
      required: true,
    },
    yearManufactured: {
      type: String,
    },
    condition: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
