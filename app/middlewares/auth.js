const { UnauthenticatedError, UnauthorizedError } = require("../errors");
const { isTokenValid } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  try {
    let token;
    // check header
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new UnauthenticatedError("Authentication invalid");
    }

    const payload = isTokenValid({ token });

    //Attach the user and his permisson to the req object, penggunaan user bebas, boleh di ganti asalkan pemanggilannya juga di sesuaikan nantinya
    req.user = {
      email: payload.email,
      role: payload.role,
      name: payload.name,
      organizer: payload.organizer,
      id: payload.userId,
    };

    next();
  } catch (error) {
    next(error);
  }
};

// rolesnya bakal jajdi array
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    //include adalah method bawaan JS untuk filter, pada fungsi ini akan mengecek ada gk rolenya
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
