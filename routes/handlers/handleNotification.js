require("dotenv").config();
const { Notification } = require("../../models/notification");

const { UserVolenteer } = require("../../models/User");

//Create a notification
const createNotification = async (req, res) => {
  const { name, userId, sendBy, isSeen } = req.body;

  if (!name || !userId) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const user = await UserVolenteer.findById(req.body.userId).select(
      "-password"
    );

    if (!user) {
      throw Error("User don't exist");
    }

    let notification = new Notification(req.body);

    const savedNotification = await notification.save();

    if (!savedNotification)
      throw Error("Something went wrong saving the notification");
    res.status(201).json({
      status: 201,
      data: savedNotification,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};

//get all notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();

    if (!notifications) throw Error("can't find Notifications in dataBase");
    res.status(200).json({ status: 200, data: notifications });
  } catch (e) {
    res.status(400).json({ status: 400, message: e.message });
  }
};

//get notification with the given Id
const getNotification = async (req, res) => {
  const _id = req.params.notificationId;
  try {
    const notification = await Notification.findById(_id);

    if (!notification)
      throw Error("can't find Notification with the given Id in dataBase");
    res.status(200).json({ status: 200, data: notification });
  } catch (e) {
    res.status(400).json({ status: 400, message: e.message });
  }
};

//update all notification with the given Id
const updateNotification = async (req, res) => {
  const filter = { _id: req.body._id };
  const update = { ...req.body };
  delete update._id;
  const opts = { new: true, timestamps: { createdAt: false, updatedAt: true } };

  try {
    let notificationUpdate = await Notification.findOneAndUpdate(
      filter,
      update,
      opts
    );

    if (!notificationUpdate)
      throw Error("can't find Notification with the given Id in dataBase");
    res.status(201).json({ status: 201, data: notificationUpdate });
  } catch (e) {
    res.status(400).json({ status: 400, message: e.message });
  }
};

//Delete notification with the given Id
const deleteNotification = async (req, res) => {
  const _id = req.params.notificationId;
  try {
    let notificationToRemove = await Notification.findByIdAndRemove(_id);

    if (!notificationToRemove)
      throw Error("can't find Notification with the given Id in dataBase");
    res.status(200).json({ status: 200, data: notificationToRemove });
  } catch (e) {
    res.status(400).json({ status: 400, message: e.message });
  }
};

//Get total notification for given Volenteer
const getNotificationsUser = async (req, res) => {
  const _idUser = req.user._id;

  try {
    const notificationsUser = await Notification.aggregate([
      { $match: { userId: { $all: [_idUser] } } },
      {
        $group: {
          _id: "$isSeen",
          notifications: {
            $push: {
              name: "$name",
              userId: "$userId",
              eventDate: "$eventDate",
              _id: "$_id",
              clientId: "$clientId",
              isSeen: "$isSeen",
            },
          },
        },
      },
    ]);

    if (!notificationsUser)
      throw Error("can't find Notifications for the given user in dataBase");

    res.status(200).json({ status: 200, data: notificationsUser });
  } catch (e) {
    res.status(400).json({ status: 400, message: e.message });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  getNotification,
  updateNotification,
  deleteNotification,
  getNotificationsUser,
};
