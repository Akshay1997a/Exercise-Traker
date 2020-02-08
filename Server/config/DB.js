const {url} = require('./config')
const mongoose = require('mongoose')

exports.connectToDB = ()=>{
    mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true, 
        useCreateIndex: true,
        useFindAndModify: true
        }, (err)=>{
        if (err) throw err
        console.log('Database connected')
    })
}