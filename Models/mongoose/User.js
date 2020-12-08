// --------------------- Import Required Modules ---------------------

const mongoose = require("mongoose");
const moment = require("moment");

// Import Address Subdocument

const AddressSchema = require("./Address");

// Import Soft Delete Subdocument

const IsDeletedSchema = require("./IsDeleted");

// Instantiate Mongoose Schema

const { Schema } = mongoose;

// --------------------- Create User Schema ---------------------

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    default: "",
    trim: true,
    minlength: 2,
    maxlength: 25,
  },

  lastName: {
    type: String,
    required: true,
    default: "",
    trim: true,
    minlength: 2,
    maxlength: 25,
  },

  email: {
    type: String,
    required: true,
    default: "",
    unique: true,
    trim: true,
    minlength: 8,
    maxlength: 64,
  },

  address: {
    type: AddressSchema,
  },

  createdOn: {
    type: String,
    required: true,
    trim: true,
    default: moment().format("MMMM Do YYYY, h:mm:ss a"),
  },

  lastModified: {
    type: String,
    required: false,
    trim: true,
    default: moment().format("MMMM Do YYYY, h:mm:ss a"),
  },

  softDelete: {
    type: IsDeletedSchema,
  },
});

module.exports = {
  UserSchema,
  User: mongoose.model("User", UserSchema),
};
