const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let talentSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Nama talents harus diisi"],
      minlength: [3, "Panjang nama kategori minimal 3 karakter"],
      maxLength: [20, "Panjang nama kategori maksimal 20 karakter"],
    },
    role: {
      type: String,
      default: "-",
    },
    // untuk membuat relasi pada mongodb kita perlu membuat types ObjectId
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Talent", talentSchema);
