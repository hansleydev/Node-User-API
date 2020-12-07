// --------------------- Import Required Modules ---------------------

const mongoose = require("mongoose");

// Instantiate Mongoose Schema

const { Schema } = mongoose;

// --------------------- Create Is-Deleted Schema ---------------------

const IsDeletedSchema = new Schema(
  {
    isUserDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    dateDeleted: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

module.exports = IsDeletedSchema;
