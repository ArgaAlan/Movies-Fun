var express = require('express');
const bodyparser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

const router = express.Router();
router.use(bodyparser.json());

router.route('/')
.get((req, res, next) => {
    User.find({})
    .then((users) => {
        res.stausCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
        console.log(users);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    User.create(req.body)
    .then((user) => {
        console.log('User created ' + user.username + ' as ' + (user.admin ? "an admin" : "a normal user"))
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
});

//THIS ROUTE SHOULD NOT BE WHEN THIS IS DEPLOYED

module.exports = router;