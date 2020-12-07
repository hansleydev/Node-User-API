// --------------------- Import Models ---------------------

const { User } = require("../Models/mongoose/User");
const { Credentials } = require("../Models/mongoose/Credentials");

// --------------------- Create New User Task ---------------------

const createUser = async (req, res) => {
  try {
    // Get User Input

    const { firstName, lastName, email, hashedPassword, street, city, state, zip } = req.body;

    const address = {
      street,
      city,
      state,
      zip,
    };

    // Create Credentials Document

    const credentialsExist = await Credentials.findOne({ email });

    if (credentialsExist) {
      const response = {
        message: "User already exist.",
      };

      console.error(response);

      return res.status(400).json(response);
    } else {
      const newCredentials = await new Credentials({
        email,
        hashedPassword,
      });

      await newCredentials.save();
    }

    // Create User Document

    const userExists = await User.findOne({ email });

    if (userExists) {
      const response = {
        message: "User already exist.",
      };

      console.error(response);

      return res.status(400).json(response);
    } else {
      const newUser = await new User({
        firstName,
        lastName,
        email,
        address,
      });

      await newUser.save();

      const response = {
        message: "User created.",
      };

      return res.status(201).json(response);
    }
  } catch (error) {
    const response = {
      message: "Failed validation.",
      error,
    };

    console.error(response);

    return res.status(400).json(response);
  }
};

module.exports = createUser;
