const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const protect = require("../middlewares/protect");

const router = express.Router();

router.route("/").get(userController.getAllUsers);

router.use(protect); //  protect all router which are coming after this middleware

router.patch("/updatePassword", authController.updatePassword);

router.route("/").post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
