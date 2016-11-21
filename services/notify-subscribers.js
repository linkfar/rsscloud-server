(function () {
    "use strict";

    var appMessage = require('./app-messages'),
        logEvent = require('./log-event'),
        notifyOne = require('./notify-one'),
        sprintf = require('sprintf-js').sprintf;

    function notifySubscribers(data, resourceUrl, callback) {
        var apiurl, subscriptions;

        if (undefined === data.subscriptions[resourceUrl]) {
            return callback(null);
        }

        subscriptions = data.subscriptions[resourceUrl];

        for (apiurl in subscriptions) {
            if (subscriptions.hasOwnProperty(apiurl)) {
                notifyOne(data, resourceUrl, apiurl, logEvent, function cb() {});
            }
        }

        callback(null);
    }

    module.exports = notifySubscribers;
}());
