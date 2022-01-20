const express = require('express')
const app = express()
const path = require('path')
const userRouter = require('./routes/userRoutes')
const cookieParser = require('cookie-parser')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '..', 'views'))

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use('/user', userRouter)



module.exports = app