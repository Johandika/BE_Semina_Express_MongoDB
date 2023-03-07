const Images = require("../../api/v1/images/model");

const createImages = async (req) => {
  const result = await Images.create({
    name: req.file ? `uploads ${req.file.filename}` : `upload/avatar/default.jpeg`,
  });

  return result;
};
