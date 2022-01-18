const User = require('./userModel')
const bcrypt = require('bcrypt')

async function register(req, res, next) {
    const passwordEncrypted = await bcrypt.hash(req.body.password, 10)
    const currentUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: passwordEncrypted
    })

    try {
        const user = await currentUser.save()
        res.status(201).send(user)
    } catch(e) {
        res.status(403).send(e)
    }

}

async function login(req, res, next) {

}

module.exports = {register, login}