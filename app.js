const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { userRoutes } = require("./routes/userRouter");
const { ticketRoutes } = require("./routes/ticketRouter");
const errorMiddleware = require("./middleware/error");

const app = express();

// applying the middleware
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", userRoutes);
app.use("/api/v1", ticketRoutes);

// middleware for error
app.use(errorMiddleware);

module.exports = app;
