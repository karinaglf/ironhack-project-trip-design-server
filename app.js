// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const allRoutes = require("./routes");
app.use("/", allRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const tripRoutes = require("./routes/trip.routes");
app.use("/", tripRoutes);

const countryRoutes = require("./routes/country.routes");
app.use("/", countryRoutes);

const cityRoutes = require("./routes/city.routes");
app.use("/", cityRoutes);

const accommodationRoutes = require("./routes/accommodation.routes");
app.use("/", accommodationRoutes);

const experienceRoutes = require("./routes/experience.routes");
app.use("/", experienceRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/", userRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
