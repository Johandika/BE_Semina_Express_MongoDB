const Categories = require("../../api/v1/categories/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllCategories = async (req) => {
  // req.user diapat dari generate token jwt
  // console.log("req.user");
  // console.log(req.user);

  const result = await Categories.find({ organizer: req.user.organizer });

  return result;
};

const getOneCategories = async (req) => {
  const { id } = req.params;
  const result = await Categories.findOne({ _id: id, organizer: req.user.organizer }); // filter berdasarkan id dan req organizer

  if (!result) throw new NotFoundError(`tidak ada kategori dengan id : ${id}`);
  return result;
};

const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  // cari categories dengan field name dan id selain dari yang dikirim dari params
  // $ne adalah salah satu operator MongoDB yang digunakan dalam kueri pencarian untuk memilih dokumen yang memiliki nilai field yang tidak sama dengan nilai yang diberikan.
  const check = await Categories.findOne({
    name,
    _id: { $ne: id },
    organizer: req.user.organizer,
  });

  // apabila check true / data categories sudah ada maka kita tampilkan error bad request dengan message kategori nama duplikat
  if (check) throw new BadRequestError("kategori nama duplikat");

  // waktu update kita ga perlu masukin organizer lagi , karena organizernya ga bakal berubah, jadi cuma butuh ngecek aja
  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  // jika id result false / null maka akan menampilkan error `Tidak ada Kategori dengan id` yang dikirim client
  if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

  return result;
};

const createCategories = async (req) => {
  const { name } = req.body;
  // cari categories dengan field name
  const check = await Categories.findOne({ name, organizer: req.user.organizer });

  // apa bila check true / data categories sudah ada maka kita tampilkan error bad request dengan message kategori nama duplikat
  if (check) throw new BadRequestError("kategori nama sudah ada");

  // organizer di bawah adalah organizer dari jwt yang telah kita gunakan di model category untuk dipanggil. Tetapi untuk itu perlu di create dahulu
  const result = await Categories.create({ name, organizer: req.user.organizer });
  return result;
};

const deleteCategories = async (req) => {
  const { id } = req.params;

  // kita juga ngedelete berdasarkan organizernya juga
  const result = await Categories.findOne({ _id: id, organizer: req.user.organizer });

  if (!result) throw new NotFoundError(`Tidak ada kategori dengan id : ${id}`);
  await result.deleteOne();

  return result;
};

const checkingCategories = async (id) => {
  const result = await Categories.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

  return result;
};

module.exports = {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
  checkingCategories,
};
