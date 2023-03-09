const mongoose = require("mongoose");
const { model, Schema } = mongoose;

// Membuat schema untuk collection 'category'
let organizerSchema = Schema(
  {
    organizer: {
      type: String,
      required: [true, "Penyelenggara kategori harus diisi"],
    },
  },
  { timestamps: true }
);

// Membuat model 'Category' berdasarkan schema 'organizerSchema'
module.exports = model("Organizer", organizerSchema);
