// --------------------- Import Required Modules ---------------------

const express = require("express");

// Create Express Router

const router = express.Router();

// Import Route Middleware

const protectRoute = require("../../middleware/protectRoute");

// --------------------- Create Routes ---------------------

/*
    Route: POST /api/users
    Desc: Create a new user following input validation
    Access: Public
*/

// Import Route Middlware

const validateNewUser = require("../../middleware/validateNewUser");
const hashPassword = require("../../middleware/hashPassword");
const validateNewCredentials = require("../../middleware/validateNewCredentials");

// Import Route Handlers

const createUser = require("../../tasks/createUser");

router.post("/", [validateNewUser, hashPassword, validateNewCredentials], (req, res) => {
  return createUser(req, res);
});

/*
    Route: GET /api/users/:email
    Desc: Return user information following authentication and authorization
    Access: Private
*/

router.get("/:email", [protectRoute], (req, res) => {
  const { firstName, lastName, age, email, address } = req.user;

  const user = {
    firstName,
    lastName,
    age,
    email,
    address,
  };

  res.status(200).json(user);

  return console.log(`Completed query for ${email}.`);
});

/*
    Route: PUT /api/users/:email
    Desc: Update a user document following authentication and authorization
    Access: Private
*/

// Import Route Handler

const updateUser = require("../../tasks/updateUser");

router.put("/:email", [protectRoute], (req, res) => {
  return updateUser(req, res);
});

/*
    Route: DELETE /api/users/:email
    Desc: Soft-delete a user document following authentication and authorization
    Access: Private
*/

// Import Route Middleware

const setUserToDelete = require("../../middleware/setUserToDelete");

// Import Route Handler

const deleteUser = require("../../tasks/deleteUser");

router.delete("/:email", [protectRoute, setUserToDelete], (req, res) => {
  return deleteUser(req, res);
});

module.exports = router;
