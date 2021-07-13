const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const admin = require("../../middleware/admin");

const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getTotalEventUser,
  getTotalEventTypePerUser,
  getTotalEventType,
  getTotalOneToOne,
  getTotalTimeOneToOne,
  getTotalTime,
} = require("../handlers/handleEvents");

//@route GET api/events/
//@desc Get All events
//@access Private
router.get("/", auth, getEvents);

//@route GET api/events/:eventId
//@desc Get event with given ID
//@access Private
router.get("/:eventId", getEvent);

//@route POST api/events/
//@desc Create Event
//@access Private
router.post("/", auth, createEvent);

//@route Update api/events/:eventId
//@desc update Event
//@access Private
router.patch("/:eventId", auth, updateEvent);

//@route delete api/events/
//@desc Create Event
//@access Private
router.delete("/:eventId", auth, deleteEvent);

//@route totalTime api/events/
//@desc get total time oneToOne event per Volenteer
//@access Private
router.get("/totalTime/:userId", auth, getTotalEventUser);

//@route totalTime api/events/
//@desc get total time per EventType per Volenteer
//@access Private
router.get("/events/:type", auth, getTotalEventType);

//@route totalTime api/events/:typeId/:userId
//@desc get total time per EventType per Volenteer
//@access Private
router.get("/totalTime/:type/:userId", auth, getTotalEventTypePerUser);

//@route totalTime  api/events/onetoOne/totalTime/:clientId
//@desc get total time oneToOne per client
//@access Private
router.get("/oneToOne/totalTime/:clientId", auth, getTotalTimeOneToOne);

//@route totalTime  api/events/onetoOne/totalTime
//@desc get total time oneToOne
//@access Private
router.get("/oneToOne/totalTime", auth, getTotalOneToOne);

//@route totalTime  api/events/onetoOne/totalTime
//@desc get total time oneToOne
//@access Private
router.get("/stat/totalTime", auth, getTotalTime);

module.exports = router;
