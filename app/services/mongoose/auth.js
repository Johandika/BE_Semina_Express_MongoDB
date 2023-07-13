const Users = require("../../api/v1/users/model");
const { BadRequestError, UnauthorizedError } = require("../../errors");
const { createTokenUser, createJWT, createRefreshJWT } = require("../../utils");
const { createUserRefreshToken } = require("./refreshToken");

const signin = async (req) => {
  const { email, password } = req.body;

  // email dan password harus di isi
  if (!email || !password) {
    throw new BadRequestError("Please Provide Email and Password");
  }

  // cari di dalam collection users kita ada gk email yg sama
  const result = await Users.findOne({ email: email });

  // kalau gk ada maka akan invalid
  if (!result) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  // mendaftarkann token
  const token = createJWT({ payload: createTokenUser(result) });

  const refreshToken = createRefreshJWT({ payload: createTokenUser(result) });
  await createUserRefreshToken({
    refreshToken,
    user: result._id,
  });

  return { token, refreshToken, role: result.role, email: result.email };
};

module.exports = { signin };
