const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiration } = require("../config");

// pembuatan token jwt
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, jwtSecret);

module.exports = {
  createJWT,
  isTokenValid,
};
