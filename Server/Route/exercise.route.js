const route = require('express').Router()
const exerciseController = require('../Controller/exercise.controller')

route.get('/:user', exerciseController.getUserExercise)
route.post('/add/:user', exerciseController.addUserExercise)
route.post('/update/:user', exerciseController.editUserExercise)
route.post('/delete/', exerciseController.deleteUserExercise)

module.exports = route