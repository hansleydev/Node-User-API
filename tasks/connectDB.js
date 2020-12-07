// --------------------- Import Required Modules ---------------------

const mongoose = require("mongoose");

const { DB_HOST, DB_DBNAME, DB_USER, DB_PASSWORD, DB_PORT } = require("../settings/settings");

// --------------------- Create Connect Database Task ---------------------

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb://${DB_HOST}:${DB_PORT}/${DB_DBNAME}?ssl=true&replicaSet=globaldb`,
      {
        auth: {
          user: DB_USER,
          password: DB_PASSWORD,
        },
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        retryWrites: false,
      }
    );

    return console.log("Database Connected.");
  } catch (error) {
    console.error(error);
    // eslint-disable-next-line no-process-exit
    return process.exit(1);
  }
};

module.exports = connectDB;
