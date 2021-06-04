const express = require("express");

const router = express.Router();
const auth = require("../../middleware/auth");
const {
  createNotification,
  getNotifications,
  getNotification,
  updateNotification,
  deleteNotification,
  getNotificationsUser,
} = require("../handlers/handleNotification");

//@route GET api/notification/
//@desc Get all notification for with given volenteer ID
//@access Private
router.get("/", getNotifications);

//@route GET api/notification/notificationId
//@desc Get notification with notificationID for with given volenteer ID
//@access Private
router.get("/:notificationId", getNotification);

//@route PATCH api/notification/notificationId
//@desc update notification for with given ID
//@access Private
router.patch("/:notificationId", updateNotification);

//@route DELETE api/notification/notificationId
//@desc Delete notification for with given ID
//@access Private
router.delete("/:notificationId", deleteNotification);

//@route GET api/notification/totalNotificaion/user
//@desc get total number of notifications for with given user
//@access Privatex
router.get("/totalNotifications/user", auth, getNotificationsUser);

//@route POST api/notification
//@desc create notification
//@access Private
router.post("/", createNotification);

module.exports = router;
