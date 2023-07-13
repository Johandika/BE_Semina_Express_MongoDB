const Images = require("../../api/v1/images/model");
const { NotFoundError } = require("../../errors");

const createImages = async (req) => {
  const result = await Images.create({
    name: req.file ? `uploads/${req.file.filename}` : `uploads/avatar/default.jpeg`,
  });

  return result;
};

// tambahkan function checking Image, checking images ini berfungsi untuk mengecek apakah gambar di database sama dengan gambar dari req, ini karena pada aplikasi, gambar di simpan ketika di upload baru ketika submit akan terjadi pengecekan sehingga ketika belum ada gambar di upload tetapi di submit akan ada text "no item found with id" dari handle error
const checkingImage = async (id) => {
  if (!id) {
    throw new NotFoundError(`Gambar harus di upload`);
  }

  const result = await Images.findOne({ _id: id });

  // if (!result) {
  //   throw new NotFoundError(`Tidak ada Gambar dengan id :  ${id}`);
  // }

  return result;
};

// jangan lupa export checkingImage
module.exports = { createImages, checkingImage };
