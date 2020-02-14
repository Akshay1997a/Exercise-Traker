const route = require('express').Router()
const User = require('../Model/user.model')
const userController = require('../Controller/user.controller')
const bcrtpt = require('bcrypt')

route.post('/login', userController.userLogin )
route.post('/signup', userController.userSignin )
route.post('/dashboard', userController.dashboard)
route.get("/logout", userController.userLogout)


module.exports = route