require("dotenv").config();
const { isRef } = require("joi");
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
  const filter = { _id: req.body._id };
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
};
