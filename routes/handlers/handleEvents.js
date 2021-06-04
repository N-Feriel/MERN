const _ = require("lodash");
const Joi = require("joi");

const { Event } = require("../../models/Event");
const { ClientUser } = require("../../models/User");

const getEvents = async (req, res) => {
  try {
    const eventsList = await Event.find();
    if (!eventsList) {
      throw Error("Can't find events in database");
    }
    res.status(200).json({
      status: 200,
      data: eventsList,
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

const getEvent = async (req, res) => {
  const _id = req.params.eventId;

  try {
    const eventData = await Event.findById(_id);
    if (!eventData) {
      throw Error("The event with given Id is not found");
    }
    res.status(200).json({
      status: 200,
      data: eventData,
    });
  } catch (e) {
    res.status(404).json({
      status: 404,
      message: e.message,
    });
  }
};

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  type: Joi.string().min(3).required(),
  participants: Joi.object({
    numberOfParticipants: Joi.number().required(),
    participantsName: Joi.array(),
  }),
  eventDate: Joi.date(),
  typeOneToOne: Joi.string(),
  time: Joi.number().required(),
});

const createEvent = async (req, res) => {
  const { error } = schema.validate(req.body);

  if (error)
    return res
      .status(400)
      .json({ status: 400, message: error.details[0].message });

  let eventData = await Event.findOne({ _id: req.body._id });
  if (eventData)
    return res.status(400).json({
      status: 400,
      message: "Event already in dataBase try to updated",
    });

  eventData = new Event(req.body);

  await eventData.save();

  return res.status(201).json({ status: 201, data: eventData });
};

const updateEvent = async (req, res) => {
  const _id = req.params.eventId;
  const update = { ...req.body };

  const opts = { new: true, timestamps: { createdAt: false, updatedAt: true } };

  try {
    let eventUpdate = await Event.findByIdAndUpdate(_id, update, opts);

    if (!eventUpdate) {
      throw Error("The event with the given Id is not found!");
    }
    res.status(201).json({
      status: 201,
      data: eventUpdate,
    });
  } catch (e) {
    res.json({
      status: 400,
      message: e.message,
    });
  }
};
const deleteEvent = async (req, res) => {
  const _id = req.params.eventId;

  try {
    let eventToRemove = await Event.findByIdAndRemove(_id);

    if (!eventToRemove) {
      throw Error("The event with the given Id is not found!");
    }
    res.status(200).json({
      status: 201,
      data: eventToRemove,
    });
  } catch (e) {
    res.json({
      status: 400,
      message: e.message,
    });
  }
};

const getTotalEventUser = async (req, res) => {
  const _id = req.params.userId;

  try {
    let totalEvent = await Event.aggregate([
      { $match: { "participants.participantsName": { $all: [_id] } } },
      {
        $group: {
          _id: "$type",
          events: {
            $push: {
              name: "$name",
              eventDate: "$eventDate",
              time: "$time",
              typeOneToOne: "$typeOneToOne",
            },
          },
          total: { $sum: "$time" },
        },
      },
    ]);
    if (!totalEvent) {
      throw Error("Can't find events in dataBase!");
    }
    res.status(200).json({
      status: 200,
      data: totalEvent,
    });
  } catch (e) {
    res.json({
      status: 400,
      message: e.message,
    });
  }
};

const getTotalEventTypePerUser = async (req, res) => {
  const { type, userId } = req.params;

  try {
    let totalEvent = await Event.aggregate([
      {
        $match: {
          $and: [
            { "participants.participantsName": { $all: [userId] } },
            { type: { $all: [type] } },
          ],
        },
      },
      {
        $group: {
          _id: null,
          events: {
            $push: {
              name: "$name",
              eventDate: "$eventDate",
              time: "$time",
              typeOneToOne: "$typeOneToOne",
            },
          },
          total: {
            $sum: {
              $multiply: ["$time", "$participants.numberOfParticipants"],
            },
          },
        },
      },
    ]);

    if (!totalEvent) {
      throw Error("can't not find events in data base");
    }

    res.status(200).json({
      status: 200,
      data: totalEvent,
    });
  } catch (e) {
    res.json({
      status: 400,
      message: e.message,
    });
  }
};

const getTotalEventType = async (req, res) => {
  const type = req.params.type;

  try {
    let totalEvent = await Event.aggregate([
      {
        $match: { type: { $all: [type] } },
      },
      {
        $group: {
          _id: null,
          events: {
            $push: {
              name: "$name",
              eventDate: "$eventDate",
              time: "$time",
              _id: "$_id",
              typeOneToOne: "$typeOneToOne",
            },
          },
          total: {
            $sum: {
              $multiply: ["$time", "$participants.numberOfParticipants"],
            },
          },
        },
      },
    ]);

    if (!totalEvent) {
      throw Error("can't not find events in dataBase");
    }

    res.status(200).json({
      status: 200,
      data: eventData,
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

const getTotalTimeOneToOne = async (req, res) => {
  const { clientId } = req.params;

  try {
    const clientData = await ClientUser.findById(clientId);
    const volenteerId = clientData.assignTo.assignGM;

    const totalTime = await Event.aggregate([
      {
        $match: {
          "participants.participantsName": { $all: [clientId, volenteerId] },
        },
      },
      { $group: { _id: null, total: { $sum: "$time" } } },
    ]);

    if (!totalTime) {
      throw Error("can not calculate the total time");
    }
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

const getTotalOneToOne = async (req, res) => {
  try {
    let totalTime = await Event.aggregate([
      { $match: { type: { $all: ["OneToOne"] } } },
      {
        $group: {
          _id: "$typeOneToOne",
          total: { $sum: "$time" },
        },
      },
    ]);

    if (!totalTime) {
      throw Error("can not calculate the total time");
    }
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

const getTotalTime = async (req, res) => {
  try {
    let totalEvent = await Event.aggregate([
      {
        $group: {
          _id: "$type",
          total: {
            $sum: {
              $multiply: ["$time", "$participants.numberOfParticipants"],
            },
          },
        },
      },
    ]);

    if (!totalEvent) {
      throw Error("can't find events in dataBase");
    }
    res.status(200).json({
      status: 200,
      data: totalEvent,
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getTotalEventUser,
  getTotalEventTypePerUser,
  getTotalEventType,
  getTotalTimeOneToOne,
  getTotalOneToOne,
  getTotalTime,
};
