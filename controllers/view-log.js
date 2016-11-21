(function () {
    "use strict";

    var async = require('async'),
        errorResult = require('../services/error-result'),
        express = require('express'),
        router = express.Router(),
        syncStruct = require('../services/sync-struct');

    function processResponse(req, res, data) {
        switch (req.accepts('html', 'json')) {
            case 'html':
                res.render('view-log', data);
                break;
            case 'json':
                res.json(data.eventlog);
                break;
            default:
                res.status(406).send('Not Acceptable');
                break;
        }
    }

    function handleError(req, res, errorMessage) {
        processResponse(req, res, errorResult(errorMessage));
    }

    router.get('/', function (req, res) {
        async.waterfall([
            function (callback) {
                syncStruct.watchStruct('data', callback);
            },
            function (data) {
                processResponse(req, res, data);
            }
        ], function (errorMessage) {
            handleError(req, res, errorMessage);
        });
    });

    module.exports = router;
}());
