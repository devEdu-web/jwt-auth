const jwt = require("jsonwebtoken");

function verifyAuthentication(req, res, next) {
    const endpoint = req.originalUrl;
    const userToken = req.cookies.auth;
    if (!userToken)
        return res.status(401).location("/user/login").end("Unauthorized");

    try {
        const isUserVerified = jwt.verify(userToken, process.env.JWT_SECRET);
        next();
    } catch (e) {
        if (e) console.log(e);
        res.status(404);
        res.location("/user/login").end("Unauthorized");
    }
}

function validateToken(token) {
    try {
        const tokenIsValid = jwt.verify(token, process.env.JWT_SECRET);
        return tokenIsValid;
    } catch (e) {
        return false;
    }
}

module.exports = { verifyAuthentication, validateToken };
