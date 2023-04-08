const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const participantSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Nama depan harus di isi!"],
      minlength: 3,
      maxlength: 50,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email harus diisi!"],
    },
    password: {
      type: String,
      required: [true, "Password harus diisi!"],
      minlength: 6,
    },
    role: {
      type: String,
      default: "-",
    },
    status: {
      type: String,
      enum: ["aktif", "tidak aktif"],
      default: "tidak aktif",
    },
    otp: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Kode di bawah adalah hook atau middleware Mongoose, yang akan dijalankan sebelum dokumen User disimpan ke database. Kode tersebut melakukan pengecekan apakah password pada dokumen User telah diubah atau dimodifikasi sebelum disimpan ke database. Jika password telah dimodifikasi, maka password tersebut akan di-hash menggunakan bcrypt dengan 12 putaran salt.
participantSchema.pre("save", async function (next) {
  const User = this;
  if (User.isModified("password")) {
    User.password = await bcrypt.hash(User.password, 12);
  }
  next();
});

// Kode di bawah adalah method yang ditambahkan pada skema (Schema) Mongoose yang disebut comparePassword(). Method ini berfungsi untuk membandingkan antara password yang dimasukkan oleh user (yang disebut candidatePassword) dengan password yang tersimpan dalam dokumen (this.password).
participantSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Participant", participantSchema);
