const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const employeeLogin = require("./api/routes/login/employee-login");
const department = require("./api/routes/department/index");
const leaveType = require("./api/routes/leave-type/index");
const employeePersonalDetail = require("./api/routes/employee-details/personalinfo");
const { RESPONSE_MESSAGE, API_CONFIG } = require("./api/constant");

require("dotenv").config();

const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;

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

app.use("/login", employeeLogin);
app.use("/department", department);
app.use("/leaveType", leaveType);
app.use("/employee", employeePersonalDetail);

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
