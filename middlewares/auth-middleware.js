const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateUser = (req, res, next) => {
  const publicRoutes = ["/users/login", "/users/register"];

  if (publicRoutes.includes(req.path)) {
    next();
  } else {
    const bearer = req.headers["authorization"];
    if (!bearer) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = bearer.split(" ")[1];
    try {
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        id: verify.id,
        name: verify.name,
        email: verify.email,
        roles: verify.roles,
      };
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          success: false,
          message: "Token has expired, please log in again",
        });
      }
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  }
};

module.exports = validateUser;
