const mongoose = require("mongoose");
const { model, Schema } = mongoose;

// Membuat schema untuk collection 'Image'
let imageSchema = Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

// Membuat model 'Category' berdasarkan schema 'categorySchema'
module.exports = model("Image", imageSchema);
