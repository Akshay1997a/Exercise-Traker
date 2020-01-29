const route = require('express').Router()
const User = require('../Model/user.model')
const bcrtpt = require('bcrypt')

route.get('/', (req, res) => {

})

route.post('/login', (req, res) => {
    User.findOne({ username: req.body.username, password: req.body.password }, (err, doc) => {
        if (err) return res.status(404).send({ result: '!ok', user_err_msg: 'user not found' })
        else {
            if (doc != null) {
                req.session.userId = doc._id
                res.status(200).send({ result: 'ok', username: doc.username })
            } else {
                res.status(404).send({ result: '!ok', user_err_msg: 'user not found' })
            }
        }
    })
})

route.post('/signup', (req, res) => {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    })

    user.save((err, doc) => {
        if (err) return res.status(400).send({ result: '!ok', user_err_msg: 'username already taken' })
        req.session.userId = doc._id
        res.send({ result: 'ok' })
    })
})

route.post('/dashboard', (req, res) => {
    if (req.session.userId) {
        User.findById(req.session.userId, (err, doc) => {
            if (err) return res.status(404).send({ result: '!ok', err: err })
            res.status(200).send({
                result: 'ok',
                username: doc.username,
            })
        })
    } else {
        res.send({ result: '!ok', err: 'session expired' })
    }
})

route.get("/logout", (req, res)=>{
    req.session.destroy((err)=>{
        if (err) {console.log(err)}
        else{
            return res.send({result: 'ok'})
        }
    })
})


module.exports = route