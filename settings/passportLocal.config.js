// --------------------- Import Required Modules ---------------------

const LocalStrategy = require("passport-local").Strategy;

// --------------------- Import Models ---------------------

const { User } = require("../Models/mongoose/User");
const { Credentials } = require("../Models/mongoose/Credentials");

// Import Password Verification Task

const verifyPassword = require("../tasks/verifyPassword");

// --------------------- Create Passport Initialization Configuration ---------------------

const initializePassport = async (passport) => {
  try {
    // Authenticate User

    const authenticateUser = async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        const credentials = await Credentials.findOne({ email });

        if (user && credentials) {
          const match = await verifyPassword(password, credentials.hashedPassword);

          if (match) {
            return await done(null, user);
          } else {
            return await done(null, false, { message: "Incorrect Password." });
          }
        } else {
          return await done(null, false, { message: "This user does not exist." });
        }
      } catch (error) {
        console.error(error);
        return await done(error);
      }
    };

    // Set Strategy

    passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

    passport.serializeUser(async (user, done) => {
      try {
        console.log("Serializing user...");

        return await done(null, user.id);
      } catch (error) {
        console.error(error);
        return await done(error);
      }
    });

    passport.deserializeUser(async (id, done) => {
      try {
        console.log("De-serializing user...");

        const user = await User.findById(id);
        return await done(null, user);
      } catch (error) {
        console.log(error);
        return await done(error);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = initializePassport;
