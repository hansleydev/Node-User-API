// --------------------- Import Required Modules ---------------------

const mongoose = require("mongoose");

// Instantiate Mongoose Schema

const { Schema } = mongoose;

// Import User Schema

const { UserSchema } = require("./User");

// --------------------- Create Deleted User Schema ---------------------

const DeletedUserSchema = new Schema({
  deletedUser: {
    type: UserSchema,
    required: true,
  },
});

module.exports = {
  DeletedUserSchema,
  DeletedUser: mongoose.model("DeletedUser", DeletedUserSchema),
};
