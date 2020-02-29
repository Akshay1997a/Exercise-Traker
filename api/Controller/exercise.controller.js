const mongoose = require('mongoose')
const path = require('path')
const exerciseModel = require('../Model/exercise.model')

exports.getUserExercise = (req, res)=>{
    exerciseModel.find({ username: req.params.user }, (err, data) => {
        if (err) return res.send({result: '!ok', err: err })
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
        if (err) return res.send({result:'!ok', err: err })
        res.send({result: 'ok',data: data })
    })
}

exports.editUserExercise = (req, res)=>{
    exerciseModel.findOneAndUpdate(
        { _id: req.body._id},
        {
            title: req.body.title,
            description: req.body.description,
            date: Date.parse(req.body.date)
        },
        (err, data) => {
            if (err) return res.send({ result:'!ok', err: err })
            res.send({result: 'ok'})
        })
}

exports.deleteUserExercise = (req, res)=>{
    console.log(req.body._id)
    exerciseModel.findOneAndDelete({
        _id: req.body._id
    }, (err, doc)=>{
        if (err) {
            res.send({result: '!ok'})
        }
        else if(doc == null){
            return res.send({result: '!ok'})
        }
        else{
            return res.send({result: 'ok'})
        }
    })
}