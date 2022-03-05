const router = require("express").Router();
const path = require("path");
const userController = require("../components/user/userController");
const authController = require("../components/user/authController");

router.post("/login", userController.login);
router.post("/register", userController.register);

// router.get("/login", userController.getLoginPage);
// router.get("/register", userController.getRegisterPage);
// router.get("/user-page", authController.verifyAuthentication, userController.getUserPage);
router.get("/logout", userController.logout);

module.exports = router;
