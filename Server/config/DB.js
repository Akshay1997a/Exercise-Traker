const mongoose = require('mongoose')
const {url} = require('../config/config')

exports.connectToDatabase = () => {
    mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true
    }, (err) => {
        if (err) throw err
        console.log('Database connected')
    })
}
