const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkUser = async (req, res, next) => {  
  const { token } = req.headers;
  if (!token) {
    return res.send({
      message: "Invalid token",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.email = decoded;
  } catch (err) {
    throw new Error(err.message);
  }
  return next();
};

const checkAdmin = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.send({
      status: 403,
      message: "Invalid token",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.email = decoded;

    if (req.email.role !== "admin") {
      return res.send({
        status: 403,
        message: "You are not admin",
      });
    }
  } catch (err) {
    throw new Error(err.message);
  }
  return next();
};

module.exports = {checkAdmin, checkUser};