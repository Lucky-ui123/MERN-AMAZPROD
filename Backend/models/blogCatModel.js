const mongoose = require("mongoose");

var blogcategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      uniquie: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogCategory", blogcategorySchema);
