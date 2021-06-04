require("dotenv").config();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { VolenUser, ClientUser } = require("../../models/User");

const createUserVolenteer = async (req, res) => {
  const { first_name, last_name, email, password, phone } = req.body;

  if (!last_name || !first_name || !email || !password || !phone) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    let user = await VolenUser.findOne({ email: req.body.email });

    if (user) {
      throw Error("User already registed");
    }

    user = new VolenUser(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const savedUserVolen = await user.save();

    if (!savedUserVolen) throw Error("Something went wrong saving the user");
    res.status(201).json({
      status: 201,
      data: _.pick(savedUserVolen, [
        "first_name",
        "last_name",
        "isAdmin",
        "email",
      ]),
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};

const createUserClient = async (req, res) => {
  const { first_name, last_name, email, phone } = req.body;

  if (!last_name || !first_name || !email || !phone) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    let user = await ClientUser.findOne({ email: req.body.email });

    if (user) {
      throw Error("User already registed");
    }

    user = new ClientUser(req.body);

    const savedUserClient = await user.save();

    if (!savedUserClient) throw Error("Something went wrong saving the user");
    res.status(201).json({
      status: 201,
      data: _.pick(savedUserClient, ["first_name", "last_name", "email"]),
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};

module.exports = {
  createUserVolenteer,
  createUserClient,
};
