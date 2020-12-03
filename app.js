// --------------------- Import Required Modules ---------------------

require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const helmet = require("helmet");
const csrf = require("csurf");

const session = require("express-session");
const passport = require("passport");

const morgan = require("morgan");

// Create Server

const app = express();

// --------------------- Import Server and Database Configuration ---------------------

const { PORT, origin, sessionSecret, sessionAge, NODE_ENV } = require("./settings/settings");

// --------------------- Set Global Middlware ---------------------

// Parsing Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Logging Middlware

app.use(morgan("dev"));

// Global Security Middleware

app.use(helmet());

if (NODE_ENV === "production") {
  // Enable TLS/SSL Proxy Configuration

  app.enable("trust proxy");
}

// Set Response Headers

app.use(async (req, res, next) => {
  try {
    await res.header("Access-Control-Allow-Origin", origin);
    await res.header("Access-Control-Allow-Credentials", true);
    return await next();
  } catch (error) {
    let response = {
      message: "Could not set response headers.",
      error,
    };
    console.error(response);
    return res.status(500).json(response);
  }
});

// CORS Pre-Flight

app.options(
  "*",
  cors({
    origin,
    method: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
    allowedHeaders: [
      "_sid",
      "_csrf",
      "x-csrf-token",
      "X-Auth-Token",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Methods",
      "X-Requested-With",
      "X-forwarded-proto",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
  })
);

// Import Session Store

const SessionStore = require("./settings/SessionStore.config");

// Session Middleware

app.use(
  session({
    name: "_sid",
    store: SessionStore,
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    proxy: NODE_ENV == "production" ? true : false,
    cookie: {
      domain: NODE_ENV == "production" ? "hansleyp.org" : undefined,
      maxAge: sessionAge,
      secure: NODE_ENV == "production" ? true : false,
      sameSite: "lax",
    },
  })
);

// --------------------- Set Passport Middleware ---------------------

// Import Passport Local Configuration

const initializePassport = require("./settings/passportLocal.config");

initializePassport(passport);

app.use(passport.initialize());
app.use(passport.session());

// --------------------- Connect Database ---------------------

// Import Connect Databse Task

const connectDB = require("./tasks/connectDB");

// Connect Database

connectDB();

// // CSRF Middleware

// app.use(
//   csrf({
//     cookie: {
//       domain: NODE_ENV == "production" ? "hansleyp.org" : undefined,
//       maxAge: sessionAge,
//       secure: NODE_ENV == "production" ? true : false,
//       sameSite: "lax",
//       httpOnly: false,
//     },
//     value: async (req) => {
//       try {
//         return await req.headers["x-csrf-token"];
//       } catch (error) {
//         console.error(error);
//         return console.error("Could not pull token");
//       }
//     },
//   })
// );

// // Handle CSRF Errors

// app.use(async (err, req, res, next) => {
//   try {
//     if (err.code == "EBADCSRFTOKEN") {
//       let error = new Error("Invalid CRSF Token.");
//       let response = {
//         message: "Invalid CSRF Token.",
//         error,
//       };

//       console.log(req.headers);

//       res.status(403).json(response);
//       throw error;
//     } else {
//       console.log("Valid CRSF Token");

//       return next();
//     }
//   } catch (error) {
//     return console.error("Invalid CSRF Token.");
//   }
// });

// --------------------- Set Router Middleware ---------------------

// Import Authentication Routes

const authLogin = require("./routes/auth/login");
const authLogout = require("./routes/auth/logout");

app.use("/auth/login", authLogin);
app.use("/auth/logout", authLogout);

// Import API Routes

const userAPI = require("./routes/api/users");

app.use("/api/users", userAPI);

// // Default Route

// app.get("/", async (req, res, next) => {
//   try {
//     console.log(req.headers.cookie);
//     // Set CSRF Cookie
//     await res.cookie("_csrf", req.csrfToken());

//     let response = {
//       message: "Success",
//     };

//     console.log("Cookie Set.");

//     return await res.json(response);
//   } catch (error) {
//     let response = {
//       message: "Could not set CSRF Token.",
//       error,
//     };

//     console.log(response);

//     return res.status(500).json(response);
//   }
// });

// --------------------- Start Server ---------------------

try {
  if (!PORT) {
    throw new Error("Port not set.");
  } else {
    app.listen(PORT, () => {
      if (NODE_ENV === "development") {
        return console.log("Environment: Development.");
      } else if (NODE_ENV === "production") {
        return console.log("Environment: Production.");
      } else if (!NODE_ENV) {
        throw new Error("Environment not set.");
      } else {
        throw new Error("Environment invalid.");
      }
    });

    console.log(`Server started on port: ${PORT}.`);
  }
} catch (error) {
  throw error;
}

if (NODE_ENV === "development") {
  const OS = require("os");

  console.log(`CPU count: ${OS.cpus().length}.`);
}
