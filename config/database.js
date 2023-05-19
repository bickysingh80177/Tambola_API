const mongoose = require("mongoose");

const connectDB = () => {
  // mongoose.connect("mongodb://localhost:27017/Tambola").then((data) => {
  //   console.log("Server Connected.");
  // });

  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ppv3hlu.mongodb.net/Tambola_Ticket`
    )
    .then((data) => {
      console.log("Server Connected.");
    });
};

module.exports = connectDB;
