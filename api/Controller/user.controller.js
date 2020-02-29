const userModel = require('../Model/user.model')

exports.userLogin = (req, res) => {
    if(req.body.isRememberMe){
        req.session.cookie.maxAge = 2628000000;
    }
    console.log(req.session.cookie.maxAge)
    userModel.findOne({ username: req.body.username, password: req.body.password }, (err, doc) => {
        if (err) return res.send({ result: '!ok', user_err_msg: 'user not found' })
        else {
            if (doc != null) {
                req.session.userId = doc._id
                res.send({ result: 'ok', username: doc.username })
            } else {
                res.send({ result: '!ok', user_err_msg: 'user not found' })
            }
        }
    })
}

exports.userSignin = (req, res) => {
    console.log(req.body)
    var user = new userModel({
        username: req.body.username,
        password: req.body.password
    })

    user.save((err, doc) => {
        if (err) return res.send({ result: '!ok', user_err_msg: 'username already taken' })
        req.session.userId = doc._id
        res.send({ result: 'ok' })
    })
}

exports.dashboard = (req, res) => {
    if (req.session.userId) {
        userModel.findById(req.session.userId, (err, doc) => {
            if (err) return res.send({ result: '!ok', err: err })
            res.send({
                result: 'ok',
                username: doc.username,
            })
        })
    } else {
        res.send({ result: '!ok', err: 'session expired' })
    }
}

exports.userLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) { console.log(err) }
        else {
            return res.send({ result: 'ok' })
        }
    })
}