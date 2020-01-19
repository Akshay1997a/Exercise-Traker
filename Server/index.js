const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const url = require('./config/config').url
const userRoute = require('./Route/user.route')
const exerciseRoute = require('./Route/exercise.route')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/user', userRoute)
app.use('/exercise', exerciseRoute)

mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true, 
    useCreateIndex: true,
    useFindAndModify: true
    }, (err)=>{
    if (err) throw err
    console.log('Database connected')
})

app.listen(PORT,()=>{
    console.log('Listning on port '+PORT)
})

app.on('exit',()=>{

})




