// --------------------- Import Validation Schema ---------------------

const CredentialsValidationSchema = require("../Models/joi/CredentialsValidationSchema");

// --------------------- Create New Credentials Validation Middleware ---------------------

const validateNewCredentials = async (req, res, next) => {
  try {
    // Get User Credentials

    const { email, hashedPassword } = req.body;

    const newCredentials = { email, hashedPassword };

    // Validate Credentials

    const isValid = await CredentialsValidationSchema.validateAsync(newCredentials);

    if (isValid) {
      return next();
    } else {
      const response = {
        message: "Failed credentials validation.",
      };

      console.error(response);

      return res.status(403).json(response);
    }
  } catch (error) {
    const response = {
      message: "Failed credentials validation.",
      error,
    };

    console.error(response);

    return res.status(403).json(response);
  }
};

module.exports = validateNewCredentials;
