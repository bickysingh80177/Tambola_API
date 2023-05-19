const express = require("express");

const { userController } = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router
  .post("/login", userController.userLogin)
  .post("/register", userController.userRegister)
  .get("/logout", isAuthenticated, userController.userLogout);

exports.userRoutes = router;
