const nodemailer = require("nodemailer");
const { gmail, password } = require("../../config");
const Mustache = require("mustache");
const fs = require("fs");

//Kode dibawah  merupakan bagian dari implementasi Node.js menggunakan package/library Nodemailer yang digunakan untuk mengirim email melalui SMTP (Simple Mail Transfer Protocol) menggunakan Gmail.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //Alamat server SMTP yang digunakan untuk mengirim email. Dalam hal ini, menggunakan server SMTP dari Gmail.
  port: 587, //Nomor port yang digunakan oleh server SMTP. Angka 587 adalah port yang umum digunakan untuk SMTP submission (pengiriman email oleh klien email melalui server SMTP).
  secure: false, // true for 465, false for other ports, Sebuah boolean yang menentukan apakah koneksi ke server SMTP dilakukan dengan menggunakan SSL/TLS. Dalam hal ini, diset sebagai false karena koneksi akan dilakukan pada port 587 yang tidak menggunakan SSL/TLS.
  auth: {
    user: gmail,
    pass: password,
  }, //Sebuah objek yang digunakan untuk melakukan autentikasi ke server SMTP. Atribut user dan pass adalah username dan password akun Gmail yang digunakan untuk mengirim email.
});

//Kode dibawah adalah implementasi dari sebuah fungsi yang berfungsi untuk mengirimkan email yang berisi One-Time Password (OTP) ke alamat email yang diberikan.
const otpMail = async (email, data) => {
  try {
    let template = fs.readFileSync("app/views/email/otp.html", "utf8");

    let message = {
      from: gmail,
      to: email,
      subject: "Otp for registration is: ",
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = { otpMail };
