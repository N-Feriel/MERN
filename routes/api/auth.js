const express = require("express");
const router = express.Router();

const { authUser, changeUserPassword } = require("../handlers/handleAuth");
const auth = require("../../middleware/auth");

router.post("/login", authUser);
router.post("/login/changePassword", auth, changeUserPassword);

module.exports = router;
