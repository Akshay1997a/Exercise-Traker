const route = require('express').Router()
const exerciseController = require('../Controller/exercise.controller')


route.get('/:user', exerciseController.getExercise)
route.post('/add/:user', exerciseController.addExercise)
route.delete('/delete/:user', exerciseController.deleteEercise)
route.post('/update/:user', exerciseController.editExercise)

module.exports = route