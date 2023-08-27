const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./api/routes/index");
const leaveRoute = require("./api/routes/login/leave-management");
const { RESPONSE_MESSAGE, API_CONFIG } = require("./api/constant");

require("dotenv").config();

const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const DB_CONNECTION_URL = `mongodb+srv://${userName}:${password}@cluster0.cxlprks.mongodb.net/api`;

try {
  mongoose.connect(DB_CONNECTION_URL);
  console.log("Connected with MongoDB");
} catch (error) {
  console.log("Problem with connecting with MongoDB", error);
}

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header(API_CONFIG?.ACCESS_CONTROL_ALLOW_ORIGIN, "*");
  res.header(API_CONFIG?.ACCESS_CONTROL_ALLOW_HEADER, "Content-Type, Accept");
  res.header(
    API_CONFIG?.ACCESS_CONTROL_ALLOW_METHOD,
    "GET, POST, PUT, PATCH, DELETE"
  );
  next();
});
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", routes);
app.use("/leave_management", leaveRoute);

app.use((req, res, next) => {
  const error = new Error(RESPONSE_MESSAGE?.NOT_FOUND);
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
  });
});

module.exports = app;
