// --------------------- Import Validation Schema ---------------------

const UserValidationSchema = require("../Models/joi/UserValidationSchema");

// --------------------- Create New User Validation Middleware ---------------------

const validateNewUser = async (req, res, next) => {
  try {
    // Get User Input

    const { firstName, lastName, email, password, street, city, state, zip } = req.body;

    const newUser = {
      firstName,
      lastName,
      email,
      password,
      street,
      city,
      state,
      zip,
    };

    // Validate Input

    const isValid = await UserValidationSchema.validateAsync(newUser);

    if (isValid) {
      return next();
    } else {
      let response = {
        message: "Failed user validation.",
      };

      console.error(response);

      return res.status(403).json(response);
    }
  } catch (error) {
    let response = {
      message: "Failed user validation.",
      error,
    };

    console.error(response);

    return res.status(403).json(response);
  }
};

module.exports = validateNewUser;
