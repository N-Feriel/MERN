require("dotenv").config();
const _ = require("lodash");
const { VolenUser, ClientUser } = require("../../models/User");

//function to get list of all volenteers
const getUsersVolenteer = async (req, res) => {
  try {
    const usersList = await VolenUser.find().select("-password");
    if (!usersList) {
      throw Error("Can't find users in database");
    }
    res.status(200).json({
      status: 200,
      data: usersList,
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

//function to get specific volenteer from dataBase

const getUserVolenteer = async (req, res) => {
  const _id = req.params.userId;

  try {
    const userData = await VolenUser.findById(_id).select("-password");
    if (!userData) {
      throw Error("The user with given Id is not found");
    }
    res.status(200).json({
      status: 200,
      data: userData,
    });
  } catch (e) {
    res.status(404).json({
      status: 404,
      message: e.message,
    });
  }
};

const updateUserVolenteer = async (req, res) => {
  const filter = { _id: req.body._id };
  const update = { ...req.body };
  delete update._id;

  try {
    const opts = {
      new: true,
      timestamps: { createdAt: false, updatedAt: true },
    };

    let userDataUpdate = await VolenUser.findOneAndUpdate(
      filter,
      update,
      opts
    ).select("-password");

    if (!userDataUpdate) {
      throw Error("The user with given Id is not found");
    }
    res.status(201).json({
      status: 201,
      data: userDataUpdate,
    });
  } catch (e) {
    res.status(400).json({ status: 400, message: e.message });
  }
};

const deleteUserVolenteer = async (req, res) => {
  const _id = req.params.userId;

  try {
    let userToRemove = await VolenUser.findByIdAndRemove(_id);

    if (!userToRemove) {
      throw Error("The user with given Id is not found");
    }
    res.status(200).json({
      status: 200,
      data: userToRemove,
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

//UserClient part

const getUsersClients = async (req, res) => {
  try {
    const usersList = await ClientUser.find().sort({ first_name: 1 });
    if (!usersList) {
      throw Error("Can't find users in database");
    }
    res.status(200).json({
      status: 200,
      data: usersList,
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

const getUserClient = async (req, res) => {
  const _id = req.params.userId;

  try {
    const userData = await ClientUser.findById(_id);
    if (!userData) {
      throw Error("The user with given Id is not found");
    }
    res.status(200).json({
      status: 200,
      data: userData,
    });
  } catch (e) {
    res.status(404).json({
      status: 404,
      message: e.message,
    });
  }
};

const updateUserClient = async (req, res) => {
  const { _id, email } = req.body;

  const filter = _id ? { _id: _id } : { email: email };
  const update = { ...req.body };
  delete update._id;

  try {
    const opts = {
      new: true,
      timestamps: { createdAt: false, updatedAt: true },
    };

    let userDataUpdate = await ClientUser.findOneAndUpdate(
      filter,
      update,
      opts
    ).select("-password");

    if (!userDataUpdate) {
      throw Error("The user with given Id is not found");
    }
    res.status(201).json({
      status: 201,
      data: userDataUpdate,
    });
  } catch (e) {
    res.status(400).json({ status: 400, message: e.message });
  }
};

const deleteUserClient = async (req, res) => {
  const _id = req.params.userId;

  try {
    let userToRemove = await ClientUser.findByIdAndRemove(_id);

    if (!userToRemove) {
      throw Error("The user with given Id is not found");
    }
    res.status(200).json({
      status: 200,
      data: userToRemove,
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

//Function to get list of clients to specific volenteer
const getUsersClientsAssignTo = async (req, res) => {
  const _idVolenteer = req.user._id;

  try {
    const clientsList = await ClientUser.find({
      "assignTo.assignGM": _idVolenteer,
    });

    if (!clientsList) {
      throw Error("The user with given Id dont't have clients");
    }
    res.status(200).json({
      status: 200,
      data: clientsList,
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

const getClientAssignTo = async (req, res) => {
  const _idClient = req.params.userId;
  try {
    const clientsData = await ClientUser.find({
      "assignTo.assignGM": _idClient,
    });
    if (!clientsData) {
      throw Error("Can't find users in dataBase");
    }
    const actifsClient = clientsData.filter((client) => client.isActif == true);
    const archivesClient = clientsData.filter(
      (client) => client.isActif == false
    );

    res.status(200).json({
      status: 200,
      data: {
        archives: archivesClient,
        actives: actifsClient,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

//get list of volenteers to assign them to new client
const getAssignListVolenteers = async (req, res) => {
  try {
    const assignList = await VolenUser.aggregate([
      {
        $match: { isActif: { $all: [true] } },
      },
      {
        $group: {
          _id: null,
          users: {
            $push: {
              _id: "$_id",
              key: "$_id",
              value: { $concat: ["$first_name", " ", "$last_name"] },
            },
          },
        },
      },
    ]);
    if (!assignList) {
      throw Error("Can't find users in database");
    }
    res.status(200).json({
      status: 200,
      data: assignList,
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

const getTotalUser = async (req, res) => {
  const { userType } = req.params;
  let totalUser = [];

  try {
    if (userType == "volenteer") {
      totalUser = await VolenUser.aggregate([
        {
          $group: {
            _id: "$isActif",
            // total: { $sum: "$time" },
            count: { $sum: 1 },
          },
        },
      ]);
    } else if (userType == "client") {
      totalUser = await ClientUser.aggregate([
        {
          $group: {
            _id: "$isActif",
            // total: { $sum: "$time" },
            count: { $sum: 1 },
          },
        },
      ]);
    }

    if (!totalUser) throw Error("Can't find users in database");

    res.status(200).json({
      status: 200,
      data: totalUser,
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

const getCLientsStatus = async (req, res) => {
  const { statusType } = req.params;

  let ClientUsers;

  try {
    if (statusType == "active") {
      ClientUsers = await ClientUser.find({ isActif: true });
    } else if (statusType == "archive") {
      ClientUsers = await ClientUser.find({ isActif: false });
    } else if (statusType == "toAssign") {
      ClientUsers = await ClientUser.find({ "assignTo.assignGM": "" });
    }
    if (!ClientUsers) {
      throw "The selected status is not defined!";
    }
    res.status(200).json({
      status: 200,
      data: ClientUsers,
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

module.exports = {
  getUsersVolenteer,
  getUserVolenteer,
  updateUserVolenteer,
  deleteUserVolenteer,
  getUsersClients,
  getUserClient,
  updateUserClient,
  deleteUserClient,
  getUsersClientsAssignTo,
  getClientAssignTo,
  getAssignListVolenteers,
  getTotalUser,
  getCLientsStatus,
};
