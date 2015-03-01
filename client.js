"use strict";

var express = require('express');
var nconf = require('nconf');
var packageJson = require('./package.json');

// Setup nconf to use (in-order):
//   1. Overrides
//   2. Command-line arguments
//   3. Environment variables
//   4. A config.json file
//   5. Default values
nconf
    .overrides({
        'APP_NAME': 'rssCloudClient',
        'APP_VERSION': packageJson.version,
    })
    .argv()
    .env()
    .defaults({
        "PORT": 9000
    });

console.log(nconf.get('APP_NAME') + ' ' + nconf.get('APP_VERSION'));

// Setup express app
var app = express();

app.get('/*', function (req, res) {
    var challenge = req.query.challenge || "";
    res.send(challenge);
});

var server = app.listen(nconf.get('PORT'), function () {
    var host = server.address().address,
        port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
})
    .on('error', function (error) {
        switch (error.code) {
        case 'EADDRINUSE':
            console.log('Error: Port ' + nconf.get('PORT') + ' is already in use.');
            break;
        default:
            console.log(error.code);
        }
    });
