const express = require("express");
const router = express.Router();

//User Model
const User = require("../../models/User");

//@route GET api/users
//@desc Get All users
//@access Private
router.get("/", (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then((users) =>
      res.status(200).json({
        status: 200,
        data: users,
      })
    );
});

//@route POST api/users
//@desc Create a user
//@access Private
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const newUser = new User({
    email: email,
    password: password,
  });
  await newUser.save();

  return res.json({
    status: 201,
    data: newUser,
  });
});

//@route DELETE api/users/:id
//@desc delete a user
//@access Private
router.delete("/:id", async (req, res) => {
  const _id = req.params.id;
  let userToRemove = await User.findByIdAndRemove(_id);

  if (!userToRemove) {
    return res.status(404).json({
      message: "User with given Id is not found",
    });
  }

  return res.status(200).json({
    status: 200,
    success: true,
  });
});

module.exports = router;
