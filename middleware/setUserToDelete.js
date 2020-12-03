// --------------------- Import Required Modules ---------------------

const moment = require("moment");

// --------------------- Import Models ---------------------

const { User } = require("../Models/mongoose/User");
const { DeletedUser } = require("../Models/mongoose/DeletedUser");

const { Credentials } = require("../Models/mongoose/Credentials");
const { DeletedCredentials } = require("../Models/mongoose/DeletedCredentials");

// --------------------- Create Set User To Delete Middleware ---------------------

const setUserToDelete = async (req, res, next) => {
  try {
    // Get User Email

    const { email } = req.user;

    if (!email) {
      let response = {
        message: "Cannot not find email.",
      };

      console.error(response);

      return res.status(500).json(response);
    } else {
      // Get User Document And Set Soft-Delete

      const userToDelete = await User.findOneAndUpdate(
        { email },
        {
          lastModified: moment().format("MMMM Do YYYY, h:mm:ss a"),
          softDelete: {
            isUserDeleted: true,
            dateDeleted: moment().format("MMMM Do YYYY, h:mm:ss a"),
          },
        },
        { new: true }
      );

      // Create New Deleted User Document

      const deletedUser = new DeletedUser({
        deletedUser: userToDelete,
      });

      await deletedUser.save();

      // Get Credentials Document And Set Soft-Delete

      const credentialsToDelete = await Credentials.findOneAndUpdate(
        { email },
        {
          softDelete: {
            isUserDeleted: true,
            dateDeleted: moment().format("MMMM Do YYYY, h:mm:ss a"),
          },
        },
        { new: true }
      );

      const deletedCredentials = new DeletedCredentials({
        deletedCredentials: credentialsToDelete,
      });

      await deletedCredentials.save();

      return next();
    }
  } catch (error) {
    let response = {
      message: "Could not set user to be deleted.",
      error,
    };

    console.error(response);

    return res.status(500).json(response);
  }
};

module.exports = setUserToDelete;
