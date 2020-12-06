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

router.post("/", async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      await req.logOut();
      await req.session.destroy();
    }

    let response = {
      message: "User logged out.",
    };

    return res.status(200).json(response);
  } catch (error) {
    let response = {
      message: "Could not log out.",
    };

    return res.status(500).json(response);
  }
});

module.exports = router;
