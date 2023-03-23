const Orders = require("../../api/v1/orders/model");

const getAllOrders = async (req) => {
  // untuk membuat limit tampilan orders per page
  const { limit = 10, page = 1, startDate, endDate } = req.query;
  let condition = {};

  let match = {};

  if (req.user.role !== "owner") {
    match = { _id: req.user.organizer };
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    // Awal jam pada filter tanggal
    start.setHours(0, 0, 0);
    const end = new Date(endDate);
    // Akhir jam pada filter tanggal
    end.setHours(23, 59, 59);
    condition = {
      ...condition,
      date: {
        $gte: start,
        $lt: end,
      },
    };
  }

  // match gunanya untuk ngefilter data dari model lain
  const result = await Orders.find(condition)
    .populate({ path: "event", match })
    .limit(limit)
    .skip(limit * (page - 1));

  const count = await Orders.countDocuments(condition);

  return { data: result, pages: Math.ceil(count / limit), total: count };
};

module.exports = {
  getAllOrders,
};
