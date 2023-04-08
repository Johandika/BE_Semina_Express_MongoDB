const mongoose = require("mongoose");

const orderDetailSchema = new mongoose.Schema({
  ticketCategories: {
    type: {
      type: String,
      required: [true, "Tipe tiket harus di isi!"],
    },
    price: {
      type: Number,
      default: 0,
    },
    sumTicket: {
      type: Number,
      required: true,
    },
  },
});

const orderSchema = new mongoose.Schema(
  {
    // date = tanggal pembelian
    date: {
      type: Date,
      required: true,
    },
    personalDetail: {
      firsName: {
        type: String,
        required: [true, "Nama depan harus diisi!"],
        minlength: 3,
        maxlength: 50,
      },
      lastName: {
        type: String,
        required: [true, "Nama belakang harus diisi!"],
        minlength: 3,
        maxlength: 50,
      },
    },
    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    totalPay: {
      type: Number,
      required: true,
    },
    totalOrderTicket: {
      type: Number,
      required: true,
    },
    orderItems: [orderDetailSchema],
    participant: {
      type: mongoose.Types.ObjectId,
      ref: "Participant",
      required: true,
    },
    payment: {
      type: mongoose.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    event: {
      type: mongoose.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    // history event di buat untuk mengantisipasi jika terjadi penghapusan event, sehingga kita masih bisa mendapatkan data transaksi di history
    historyEvent: {
      // title: {
      //   type: String,
      //   required: [true, "Judul harus diisi"],
      //   minlength: 3,
      //   maxlength: 50,
      // },
      // date: {
      //   type: Date,
      //   required: [true, "Tanggal dan waktu harus diisi"],
      // },
      // about: {
      //   type: String,
      // },
      // tagline: {
      //   type: String,
      //   required: [true, "Tagline harus diisi"],
      // },
      // keyPoint: {
      //   type: [String],
      // },
      // venueName: {
      //   type: String,
      //   required: [true, "Tempat acara harus diisi"],
      // },
      // statusEvent: {
      //   type: String,
      //   enum: ["Draft", "Published"],
      //   default: "Draft",
      // },
      // tickets: {
      //   type: [ticketCategoriesSchema],
      //   required: true,
      // },
      // image: {
      //   type: mongoose.Types.ObjectId,
      //   ref: "Image",
      //   required: true,
      // },
      // category: {
      //   type: mongoose.Types.ObjectId,
      //   ref: "Category",
      //   required: true,
      // },
      // talent: {
      //   type: mongoose.Types.ObjectId,
      //   ref: "Talent",
      //   required: true,
      // },
      organizer: {
        type: mongoose.Types.ObjectId,
        ref: "Organizer",
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
