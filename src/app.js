const express = require('express')
const app = express()
const path = require('path')
const userRouter = require('./routes/userRoutes')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '..', 'views'))

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use('/user', userRouter)



module.exports = app