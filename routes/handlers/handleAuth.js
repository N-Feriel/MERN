const bcrypt = require("bcrypt");
require("dotenv").config();
const _ = require("lodash");
const Joi = require("joi");
const { VolenUser } = require("../../models/User");

//handle Login
const authUser = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }
  try {
    let user = await VolenUser.findOne({
      email: req.body.email,
    });

    if (!user) {
      throw Error("Invalid email or password.");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      throw Error("Invalid email or password.");
    }

    const token = user.generateAuthToken();

    res
      .status(200)
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .json({
        status: 200,
        data: token,
      });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

//change User Password

const changeUserPassword = async (req, res) => {
  try {
    const email = req.user.email;
    console.log(req);

    let user = await VolenUser.findOne({ email: email });

    if (!user) {
      throw Error("Invalid email.");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      throw Error("Must enter old password");
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.newPassword, salt);

    const savedUser = await user.save();

    if (!savedUser) {
      throw Error("Something went wrong saving the user");
    }
    const token = user.generateAuthToken();

    res.status(201).json({
      status: 201,
      token: token,
      message: "Success, Next time login with your new password",
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

module.exports = { authUser, changeUserPassword };
