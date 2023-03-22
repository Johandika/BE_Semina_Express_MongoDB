const mongoose = require("mmongoose");

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
        required: [true, "Please provide first name!"],
        minlength: 3,
        maxlength: 50,
      },
      lastName: {
        type: String,
        required: [true, "Please provide first name!"],
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);