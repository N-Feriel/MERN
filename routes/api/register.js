const router = require("express").Router();

const {
  createUserVolenteer,
  createUserClient,
} = require("../handlers/handleRegisterUser");

// Create and update the Volenteer Info DataBase

//@route POST api/register/volenteer
//@desc Create a volenteerUser
//@access Private, admin allowed only
router.post("/volenteer", createUserVolenteer);

//@route POST api/register/client
//@desc Create a clientUser
//@access Private, admin allowed only
router.post("/client", createUserClient);

module.exports = router;
