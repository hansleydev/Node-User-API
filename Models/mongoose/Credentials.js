// --------------------- Import Required Modules ---------------------

const mongoose = require("mongoose");

// Import Soft Deleted Subdocument

const IsDeletedSchema = require("./IsDeleted");

// Instantiate Mongoose Schema

const { Schema } = mongoose;

// --------------------- Create Credentials Schema ---------------------

const CrendentialsSchema = new Schema({
  hashedPassword: {
    type: String,
    required: true,
    default: "",
    trim: true,
    minlength: 60,
    maxlength: 60,
  },
  email: {
    type: String,
    required: true,
    default: "",
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 64,
  },
  softDelete: {
    type: IsDeletedSchema,
  },
});

module.exports = {
  CrendentialsSchema,
  Credentials: mongoose.model("Credentials", CrendentialsSchema),
};
