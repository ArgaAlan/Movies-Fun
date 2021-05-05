const express = require('express');
const bodyParser = require('body-parser');
const fetch = require("node-fetch");
var authenticate = require('../authenticate');

const moviesRouter = express.Router();

moviesRouter.use(bodyParser.json());

moviesRouter.route('/')
.get(authenticate.verifyUser, async (req, res, next) => {
    try {
        if (!req.body.type) next({err: 'Request does not contains type'});
        if (!req.body.slug) next({err: 'Request does not contains slug'});
        var response = await fetch('https://api.trakt.tv/'+req.body.type+'s/'+req.body.slug, { method: 'GET', headers: {"Content-Type": "application/json", "trakt-api-key": "4085dc60d019ec4b6d1c59562e6a25ffdba71fd796b2a86f430356066ac95475", "trakt-api-version": "2"}})

        if (!response.ok) next({err: 'HTTP request not OK'});

        var json = await response.json()
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(json);
    } catch (err) {
        return next(err);
    }
});

module.exports = moviesRouter;