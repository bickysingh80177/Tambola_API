const dotenv = require("dotenv");

const app = require("./app");
const connectDB = require("./config/database");

// Handling uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exceptions`);
  process.exit(1);
});

dotenv.config({ path: "config/.env" });

const port = process.env.PORT || 5000;

// connecting to the database
connectDB();

const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
