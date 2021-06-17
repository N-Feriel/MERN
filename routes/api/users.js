const express = require("express");
const router = express.Router();
const {
  getUsersVolenteer,
  getUserVolenteer,
  deleteUserVolenteer,
  updateUserVolenteer,
  getUsersClients,
  getUserClient,
  updateUserClient,
  deleteUserClient,
  getUsersClientsAssignTo,
  getClientAssignTo,
  getAssignListVolenteers,
  getTotalUser,
  getCLientsStatus,
} = require("../handlers/handleUsers");

//@route GET api/users/volenteers
//@desc Get All volenteers users
//@access Private
router.get("/volenteers", getUsersVolenteer);

//@route GET api/users/assignList
//@desc Get All actives volenteers users list to assign them to new client
//@access Private
router.get("/assignList", getAssignListVolenteers);

//@route GET api/users/volenteers/id
//@desc Get All volenteers users
//@access Private
router.get("/volenteers/:userId", getUserVolenteer);

//@route PATCH api/users/volenteers/user
//@desc update a user volenteer
//@access Private
router.patch("/volenteers/user", updateUserVolenteer);

//@route DELETE api/users/volenteers/:userId
//@desc delete a volenteer user
//@access Private
router.delete("/volenteers/:userId", deleteUserVolenteer);

//@route GET api/users/clients
//@desc Get All clients users
//@access Private
router.get("/clients", getUsersClients);

//@route GET api/users/stat/:userType
//@desc Get total actives vs archives users
//@access Private
router.get("/stat/:userType", getTotalUser);

//@route GET api/users/clients
//@desc Get clients list assign to specific Volenteer
//@access Private
router.get("/clientList", getUsersClientsAssignTo);

//@route GET api/users/clients
//@desc Get clients list assign to specific Volenteer
//@access Private
router.get("/clientList/:userId", getClientAssignTo);

//@route GET api/users/clients/id
//@desc Get specific user with given id
//@access Private
router.get("/clients/:userId", getUserClient);

//@route GET api/users/status/client/statusType
//@desc Get clients filtered by status : ToAssign/Active/Archive
//@access Private
router.get("/status/client/:statusType", getCLientsStatus);

//@route PATCH api/users/clients/user
//@desc update a user
//@access Private
router.patch("/clients/user", updateUserClient);

//@route DELETE api/users/clients/:userId
//@desc delete a client user
//@access Private
router.delete("/clients/:userId", deleteUserClient);

module.exports = router;
