const router = require('express').Router()
const path = require('path')
const userController = require('../components/user/userController')
const authController = require('../components/user/authController')


router.post('/login', userController.login)
router.post('/register', userController.register)

router.get('/login', userController.getLoginPage)
router.get('/register', userController.getRegisterPage)
router.get('/user-page', authController.verifyAuthentication, userController.getUserPage)

// router.get('/login', (req, res, next) => {
//     // console.log(req.cookies)
//     // res.cookie('access_token', 'Bearer ' + 'tokenJS', {
//     //     httpOnly: true,
//     //     secure: true
//     // })
//     // res.send('done')

//     res.cookie('secure', 'random', {
//         httpOnly: true,
//         secure: true,
//         maxAge: 60
//     })

//     res.cookie('test', 'random')

//     console.log(req.cookies)
//     res.send(req.cookies)
// })



module.exports = router