const router = require('express').Router()
const userController = require('../components/user/userController')

router.post('/login')
router.post('/register', userController.register)


module.exports = router