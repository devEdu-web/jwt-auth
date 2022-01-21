const User = require("./userModel");
const authController = require("./authController");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const path = require("path");

async function register(req, res, next) {
    const passwordEncrypted = await bcrypt.hash(req.body.password, 10);
    const currentUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: passwordEncrypted,
    });

    try {
        const user = await currentUser.save();
        res.status(201).sendFile(path.join(__dirname, "..", "..", "..", "views", "login.html"));
    } catch (e) {
        console.log(e);
        res.status(403).send(e);
    }
}

async function login(req, res, next) {
    const selectedUser = await User.findOne({ email: req.body.email });
    if (!selectedUser)
        return res.status(400).send("Email or password incorrect.");

    const passwordMatch = await bcrypt.compare(
        req.body.password,
        selectedUser.password
    );
    if (!passwordMatch)
        return res.status(400).send("Email or password incorrect");

    const userToken = jsonwebtoken.sign({ id: selectedUser._id, name: selectedUser.name }, process.env.JWT_SECRET, { expiresIn: 60, });
    if (!userToken) return res.status(400).send("Email or password incorrect");

    res.cookie("auth", userToken, {httpOnly: true,});
    res.cookie("username", selectedUser.name);

    res.redirect("/user/user-page");
}

function getLoginPage(req, res, next) {
    const userToken = req.cookies.auth;
    const isUserVerified = authController.validateToken(userToken);

    if (isUserVerified) {
        res.redirect("/user/user-page");
    } else {
        res.sendFile(path.join(__dirname, "..", "..", "..", "views", "login.html"));
    }
}

function getRegisterPage(req, res, next) {
    res.sendFile(path.join(__dirname, "..", "..", "..", "views", "register.html"));
}

function getUserPage(req, res, next) {
    res.render("user", { username: req.cookies.username });
}

function logout(req, res, next) {
    res.clearCookie("auth");
    res.redirect("/user/login");
}

module.exports = {
    register,
    login,
    getLoginPage,
    getRegisterPage,
    getUserPage,
    logout,
};
