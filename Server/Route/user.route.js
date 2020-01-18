const route = require('express').Router()
const User = require('../Model/user.model')
const bcrtpt = require('bcrypt')

route.get('/', (req, res)=>{
    User.find({},(err, data)=>{
        if (err) return res.status(400).send({err: err})
        res.status(200).send(data)
    })
})

route.post('/login', (req, res)=>{
    User.find({username: req.body.username, password: req.body.password},(err,data)=>{
        if (err) return res.status(400).send({err: err})
        if (data.length == 0){
            res.status(404).send({result: '!ok', err_msg: 'user not found'})
        }
        else{
            res.status(200).send({result: 'ok'})
        }
    })
})

route.post('/singin', (req, res)=>{
    var user = new User({
        username : req.body.username,
        password : req.body.password
    })

    user.save((err, data)=>{
        if (err) return res.status(400).send({err: err})
        res.send(data)
    })
})


module.exports = route