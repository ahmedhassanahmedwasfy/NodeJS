process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', err => {
        console.error(err, 'Uncaught Exception thrown');
        // process.exit(1);
    });
const logger = require('./api/logs/logs')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport');
var routesApi = require('./api/routes/index');
require('./api/models/db');
const config = require('./api/config/config');
//const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
//const finalConfig = _.merge(defaultConfig, environmentConfig);
//global.gConfig = finalConfig;
var port = process.env.port || config.development.app.node_port;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());


app.use('/api', routesApi);

app.use(function (err, req, res, next) {
    logger.error("user: " + req.user + ". error is : " + err);
    res.status(500).json({ error: err.message });
});

app.use(function (req, res, next) {
    res.status(404).send();
});

app.listen(port, function () {
    // logger.info("Running on port"+port);
    console.log("Running on port" + port);
});


module.exports = app;

