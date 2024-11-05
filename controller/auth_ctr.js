const { read_file, write_file } = require("../Api/api");
const { v4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res, next) => {
  try {
    const { username, email, password, name, role } = req.body;
    const users = read_file("auth.json");
    const foundedUser = users.find((item) => item.email === email);

    if (foundedUser) {
      return res.send({
        message: "User already exists",
      });
    }

    const hash = await bcrypt.hash(password, 12);
    users.push({
      id: v4(),
      username,
      email,
      role,
      name,
      password: hash,
    });

    write_file("auth.json", users);
    res.send({
      message: "Registered",
    });
  } catch (err) {
    throw next(err.message);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const users = read_file("auth.json");
    const foundedUser = users.find((item) => item.email === email);

    if (!foundedUser) {
      return res.send({
        message: "User not found",
      });
    }

    const checkPassword = await bcrypt.compare(password, foundedUser.password);

    if (!checkPassword) {
      return res.send({
        message: "Wrong password",
      });
    }
    if (checkPassword) {
      const token = jwt.sign(
        {
          id: foundedUser.id,
          password: foundedUser.password,
          role: foundedUser.role,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      return res.send({
        message: "Success",
        token,
      });
    }
  } catch (err) {
    throw next(err.message);
  }
};

module.exports = {
  register,
  login,
};