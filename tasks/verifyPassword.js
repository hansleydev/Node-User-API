// --------------------- Import Required Modules ---------------------

const bcrypt = require("bcrypt");

// --------------------- Create Verify Password Task ---------------------

const verifyPassword = async (password, passwordHash) => {
  try {
    const match = await bcrypt.compare(password, passwordHash);

    if (match) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return console.error(error);
  }
};

module.exports = verifyPassword;
