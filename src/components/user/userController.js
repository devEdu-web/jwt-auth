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
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({
            error,
            message: 'Email already exists.'
        });
    }
}

async function login(req, res, next) {

    try {

        const fetchedUser = await User.findOne({ email: req.body.email });
        const passwordMatch = await bcrypt.compare(req.body.password, fetchedUser.password);

        if (!fetchedUser || !passwordMatch) return res.status(400).json({
            statusCode: 400,
            message: 'Email or password invalid'
        });
    
        const userToken = jsonwebtoken.sign({ id: fetchedUser._id, name: fetchedUser.name }, process.env.JWT_SECRET, { expiresIn: '1h', });
        res.json({
            access_token: userToken,
            expiresIn: '1h'
        })

    } catch(error) {
        res.status(500).json(error)
    }

}

module.exports = {
    register,
    login,
};
