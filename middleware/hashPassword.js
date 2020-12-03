// --------------------- Import Required Modules ---------------------

const bcrypt = require("bcrypt");

// --------------------- Import Models ---------------------

const { Credentials } = require("../Models/mongoose/Credentials");

// Set Salt Rounds

const salt = 10;

// --------------------- Create New Credentials Validation Middleware ---------------------

const hashPassword = async (req, res, next) => {
  try {
    // Get User Input

    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, salt);

    req.body.hashedPassword = hashedPassword;

    return next();
  } catch (error) {
    let response = {
      message: "Could not hash password.",
      error,
    };

    console.error(response);

    return res.status(500).json(response);
  }
};

module.exports = hashPassword;
