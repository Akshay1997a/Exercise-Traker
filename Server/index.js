const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoute = require('./Route/user.route')
const exerciseRoute = require('./Route/exercise.route')
const bodyParser = require('body-parser')
const session = require('express-session')
const DB = require('./config/DB')
const {url, secretKey} = require('./config/config')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
    credentials: true
}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: secretKey,
    cookie:{
        maxAge: 1000 * 60 * 60 * 2,
    },
}))
app.use('/user', userRoute)
app.use('/exercise', exerciseRoute)

var server = app.listen(PORT,()=>{
    console.log('Listning on port '+PORT)
})

DB.connectToDatabase()

app.on('exit',()=>{
    server.close()
    console.log('Server closed')
})




