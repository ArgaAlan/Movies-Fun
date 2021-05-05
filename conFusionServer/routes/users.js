var express = require('express');
const bodyparser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

const router = express.Router();
router.use(bodyparser.json());

router.route('/')
.get(authenticate.verifyUser, (req, res, next) => {
    User.find({})
    .then((users) => {
        res.stausCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
        console.log(users);
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.post('/signup', (req, res, next) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if(err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: err});
        }
        else {
            if(req.body.firstname) user.firstname = req.body.firstname;
            if(req.body.lastname) user.lastname = req.body.lastname;
            if(req.body.email) user.email = req.body.email;
            if(req.body.avatarUrl) user.avatarUrl = req.body.avatarUrl;
            user.save((err, user) => {
                if(err){
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({err: err});
                    return;
                }
                passport.authenticate('local')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true, status: 'You have successfully registered in'});
                });
            });
        }
    });
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You have successfully logged in'});
});

module.exports = router;