// --------------------- Import Required Modules ---------------------

const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

// --------------------- Import Database Configuration ---------------------

const { DB_HOST2, DB_DBNAME2, DB_USER2, DB_PASSWORD2, DB_PORT2 } = require("../settings/settings");

// Create Mongoose Connection

const connection = mongoose.createConnection(
  "mongodb://" + DB_HOST2 + ":" + DB_PORT2 + "/" + DB_DBNAME2 + "?ssl=true&replicaSet=globaldb",
  {
    auth: {
      user: DB_USER2,
      password: DB_PASSWORD2,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    retryWrites: false,
  }
);

// Create Session Store

const SessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: "sessions",
  autoRemove: "disabled",
});

module.exports = SessionStore;
