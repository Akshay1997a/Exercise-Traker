const route = require('express').Router()
const Expences = require('../Model/expence.model')

route.get('/', (req, res) => {
    Expences.find({}, (err, data) => {
        if (err) return res.status(400).send({ err: err })
        res.status(200).send(data)
    })
})

route.get('/:user', (req, res) => {
    Expences.find({ username: req.params.user }, (err, data) => {
        if (err) return res.status(400).send({ err: err })
        res.status(200).send(data)
    })
})


route.post('/add/:user', (req, res) => {
    var expence = new Expences({
        username: req.params.username,
        description: req.body.description,
        duration: Number(req.body.duration),
        date: Date.parse(req.body.date)
    })

    expence.save((err, data) => {
        if (err) return res.status(400).send({ err: err })
        res.status(200).send({ result: 'ok', data: data })
    })
})

route.post('/update/:user', (req, res) => {
    Expences.findOneAndUpdate(
        { username: req.params.user },
        {
            description: req.body.description,
            duration: Number(req.body.duration),
            date: Date.parse(req.body.date)
        },
        (err, data) => {
            if (err) return res.status(400).send({ err: err })
            res.status(200).send(data)
        })
})


module.exports = route