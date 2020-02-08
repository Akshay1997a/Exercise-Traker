const exerciseModel = require('../Model/exercise.model')

exports.getUserExercise = (req, res)=>{
    exerciseModel.find({ username: req.params.user }, (err, data) => {
        if (err) return res.status(400).send({ err: err })
        res.send({result: 'ok', data: data})
    })
}

exports.addUserExercise = (req, res)=>{
    var exercise = new exerciseModel({
        username: req.params.user,
        title: req.body.title,
        description: req.body.description,
        date: Date.parse(req.body.date)
    })

    exercise.save((err, data) => {
        if (err) return res.status(400).send({ err: err })
        res.status(200).send({result: 'ok',data: data })
    })
}

exports.editUserExercise = (req, res)=>{
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

exports.deleteUserExercise = (req, res)=>{
    exerciseModel.findOneAndDelete({
        title: req.body.title,
    }, (err, doc)=>{
        if (err) {return res.send({result: '!ok'})}
        else if(doc == null){
            return res.send({result: '!ok'})
        }
        else{
            return res.send({result: 'ok'})
        }
    })
}