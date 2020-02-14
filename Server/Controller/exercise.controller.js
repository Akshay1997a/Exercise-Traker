const exerciseModel = require('../Model/exercise.model')

exports.getExercise = (req, res) => {
    exerciseModel.find({ username: req.params.user }, (err, data) => {
        if (err) return res.status(400).send({ err: err })
        res.send({result: 'ok', data: data})
    })
}

exports.addExercise = (req, res) => {
    var exercise = new exerciseModel({
        username: req.params.user,
        title: req.body.title,
        description: req.body.description,
        date: Date.parse(req.body.date)
    })

    exercise.save((err, data) => {
        if (err) return res.status(400).send({ err: err })
        res.status(200).send({ result: 'ok', data: data })
    })
}

exports.editExercise = (req, res) => {
    exerciseModel.findOneAndUpdate(
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
}

exports.deleteEercise = (req, res)=>{
    exerciseModel.findOneAndDelete({
        username: req.params.user, 
        title: req.body.title,
        date: req.body.date
    }, (err, Doc)=>{
        if (err) return res.status(400).send({result: '!ok'})
        else{
            res.status(200).send({result: 'ok'})
        } 
    })
}