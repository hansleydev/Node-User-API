// --------------------- Import Models ---------------------

const { User } = require("../Models/mongoose/User");
const { Credentials } = require("../Models/mongoose/Credentials");

// --------------------- Create Delete User Task ---------------------

const deleteUser = async (req, res) => {
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
      const user = await User.findOne({ email });
      const credentials = await Credentials.findOne({ email });

      if (!user || !credentials) {
        let response = {
          message: `Could not find the user linked to ${email}.`,
        };

        res.status(404).json(response);

        return console.error(error);
      } else {
        // Log Out

        await req.logOut();

        // Delete User

        await User.deleteOne(user);
        await Credentials.deleteOne(credentials);

        let response = {
          message: `Deleted user.`,
        };

        res.status(200).json(response);

        return console.log(response);
      }
    }
  } catch (error) {
    let response = {
      message: "Could not delete user.",
      error,
    };

    console.error(response);

    return res.status(500).json(response);
  }
};

module.exports = deleteUser;
