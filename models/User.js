const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { PRIVATE_JWT } = process.env;

const Schema = mongoose.Schema;

//Create a Volenteer user Schema
const volenUserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    minLenght: 5,
    maxLength: 50,
  },
  last_name: {
    type: String,
    required: true,
    minLenght: 5,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    minLenght: 5,
    maxLength: 255,
    unique: true,
  },
  address: {
    city: String,
    street: String,
    zipCode: String,
  },
  password: {
    type: String,
    required: true,
    minLenght: 5,
    maxLength: 1024,
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
  languages: [String],

  isAdmin: {
    type: Boolean,
    default: false,
  },
  isMember: {
    type: Boolean,
    default: false,
  },
  isActif: {
    type: Boolean,
    default: false,
  },

  training: [String],
});

volenUserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
      first_name: this.first_name,
      last_name: this.last_name,
    },
    PRIVATE_JWT
  );

  return token;
};

const VolenUser = mongoose.model("UserVolenteer", volenUserSchema);

const ClientUserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minLenght: 5,
    maxLength: 50,
  },
  last_name: {
    type: String,
    required: true,
    minLenght: 5,
    maxLength: 50,
  },
  origin: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    minLenght: 5,
    maxLength: 255,
    unique: true,
  },
  address: {
    city: String,
    street: String,
    zipCode: String,
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },

  isActif: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
  },
  infoParent: {
    name: { type: String },
    isContact: { type: Boolean },
  },
  isMember: {
    type: Boolean,
    default: false,
  },
  isActif: {
    type: Boolean,
    default: false,
  },
  assignTo: {
    isAssign: { type: Boolean },
    assignGM: { type: String },
  },
});

const ClientUser = mongoose.model("UserClient", ClientUserSchema);

module.exports = { VolenUser, ClientUser };
