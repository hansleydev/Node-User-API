// --------------------- Import Required Modules ---------------------

const mongoose = require("mongoose");

// Instantiate Mongoose Schema

const { Schema } = mongoose;

// Import Credentials Schema

const { CrendentialsSchema } = require("./Credentials.js");

// --------------------- Create Deleted User Schema ---------------------

const DeletedCredentialsSchema = new Schema({
  deletedCredentials: {
    type: CrendentialsSchema,
    required: true,
  },
});

module.exports = {
  DeletedCredentialsSchema,
  DeletedCredentials: mongoose.model("DeletedCredentials", DeletedCredentialsSchema),
};
