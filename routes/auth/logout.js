// --------------------- Import Required Modules ---------------------

const express = require("express");

// Create Express Router

const router = express.Router();

// --------------------- Create Routes ---------------------

/*
    Route: POST /auth/logout
    Desc: User Log Out
    Access: Public
*/

router.post("/", (req, res) => {
  if (req.isAuthenticated()) {
    req.logOut();
  }

  let response = {
    message: "User logged out.",
  };

  return res.status(200).json(response);
});

module.exports = router;
