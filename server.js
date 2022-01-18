require('dotenv').config()
const app = require('./src/app')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/auth-practice', {autoIndex: true})
.then(db => {
    app.listen(process.env.PORT, (e) => {e ? console.log(e) : console.log('Server running and connected to database.')})
})
.catch(error => console.log(error))
