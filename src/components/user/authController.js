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

    // Agora tu precisa fazer o logout do user, pq se tu quiser logar com uma conta Y enquanto a conta X tá logada, a conta Y vai sobreescrever a conta X, tu tava vendo sobre logout e invalidar tokens, tu viu que pra fazer logout é daora apagar o cookie com o jwt do client-side, mas o jwt ainda fica ativo, tu tava pensando em definir um expire date justo pra cada jwt pra que ele se autodestrua futuramente e fique invalido.

}


module.exports = {verifyAuthentication}