var express = require('express');
const bodyparser = require('body-parser');
var Usuario = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

var router = express.Router();
router.use(bodyparser.json());

router.get('/', (req, res, next) => {
    Usuario.find({})
    .then((users) => {
        res.stausCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
        console.log(users);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = router;