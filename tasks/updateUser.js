// --------------------- Import Required Modules ---------------------

const moment = require("moment");

// --------------------- Import Models ---------------------

const { User } = require("../Models/mongoose/User");

// --------------------- Create Update User Task ---------------------

const updateUser = async (req, res) => {
  try {
    // Get User Email

    const { email } = req.user;

    if (!email) {
      const response = {
        message: "Cannot not find email.",
      };

      console.error(response);

      return res.status(500).json(response);
    } else {
      await User.findOneAndUpdate({ email }, { $set: req.body });
      await User.findOneAndUpdate(
        { email },
        { lastUpdated: moment().format("MMMM Do YYYY, h:mm:ss a") }
      );

      const response = {
        message: "User Updated.",
        user: req.user,
      };

      console.log(response.message);

      return res.status(200).json(response);
    }
  } catch (error) {
    const response = {
      message: "Could not update user.",
      error,
    };

    console.error(response);

    return res.status(500).json(response);
  }
};

module.exports = updateUser;
