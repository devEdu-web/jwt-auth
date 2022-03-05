const router = require("express").Router();
const path = require("path");
const userController = require("../components/user/userController");
const authController = require("../components/user/authController");

router.post("/login", userController.login);
router.post("/register", userController.register);


module.exports = router;
