// --------------------- Import Required Modules ---------------------

const express = require("express");
const passport = require("passport");

// Create Express Router

const router = express.Router();

// --------------------- Create Routes ---------------------

/*
    Route: POST /auth/login
    Desc: User Login
    Access: Public
*/

router.post("/", passport.authenticate("local"), (req, res) => {
  if (req.session) {
    const { firstName, lastName, age, email, address } = req.user;

    const user = {
      firstName,
      lastName,
      age,
      email,
      address,
    };

    const response = {
      message: "User authenticated.",
      user,
    };

    return res.status(200).json(response);
  } else {
    const response = {
      message: "Please enable cookies in your browser settings.",
    };

    return res.status(403).json(response);
  }
});

module.exports = router;
