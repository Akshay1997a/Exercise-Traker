const route = require('express').Router()
const Exercise = require('../Model/exercise.model')


route.get('/', (req, res) => {
    
})


route.get('/:user', (req, res) => {
    Exercise.find({ username: req.params.user }, (err, data) => {
        if (err) return res.status(400).send({ err: err })
        res.send({result: 'ok', data: data})
    })
})


route.post('/add/:user', (req, res) => {
    var exercise = new Exercise({
        username: req.params.user,
        title: req.body.title,
        description: req.body.description,
        date: Date.parse(req.body.date)
    })

    exercise.save((err, data) => {
        if (err) return res.status(400).send({ err: err })
        res.status(200).send({result: 'ok',data: data })
    })
})


route.post('/update/:user', (req, res) => {
    Exercise.findOneAndUpdate(
        { username: req.params.user },
        {
            title: req.body.title,
            description: req.body.description,
            date: Date.parse(req.body.date)
        },
        (err, data) => {
            if (err) return res.status(400).send({ err: err })
            res.status(200).send(data)
        })
})


module.exports = route