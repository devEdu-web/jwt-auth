const jwt = require('jsonwebtoken')

function verifyAuthentication(req, res, next) {
    const userToken = req.cookies.auth
    if(!userToken) return res.status(401).location('/user/login').end('Unauthorized')

    try {
        const isUserVerified = jwt.verify(userToken, process.env.JWT_SECRET) 
        req.user = isUserVerified
        next()
    } catch (e) {
        if(e) console.log(e)
        res.status(404)
        res.location('/user/login').end('Unauthorized')
    }


}


module.exports = {verifyAuthentication}