(function () {
    "use strict";

    var moment = require('moment'),
        ping = require('../../services/ping.js'),
        request = require('request'),
        sinon = require('sinon'),
        clock;

    describe('services/ping.js notify subscribers', function () {
        before(function (done) {
            sinon
                .stub(request, 'post')
                .yields(null, {statusCode: 200});
            clock = sinon.useFakeTimers();
            clock.tick(300000);
            done();
        });

        after(function (done) {
            request.post.restore();
            clock.restore();
            done();
        });

        it('should notify subscribers correctly', function (done) {
            var data = {
                eventlog: [],
                resources: {
                    'http://www.google.com/': {
                        flDirty: false,
                        lastSize: 100,
                        lastHash: 100,
                        ctChecks: 5,
                        whenLastCheck: moment('0', 'x'),
                        ctUpdates: 5,
                        whenLastUpdate: moment('0', 'x')
                    }
                },
                subscriptions: {
                    'http://www.google.com/': {
                        'http://192.168.0.1/': {
                            ctUpdates: 0,
                            whenLastUpdate: moment('0', 'x'),
                            ctErrors: 0,
                            ctConsecutiveErrors: 0,
                            whenLastError: moment('0', 'x'),
                            whenExpires: moment('0', 'x')
                        }
                    }
                },
                prefs: {
                    ctSecsResourceExpire: 25 * 60 * 60,
                    minSecsBetweenPings: 10
                }
            };

            ping(data, 'http://www.google.com/', function (err, result) {
                if (err) {
                    return done(new Error(err));
                }
                result.success.should.equal(true);
                done();
            });
        });
    });

    describe('services/ping.js notify too recently', function () {
        before(function (done) {
            sinon
                .stub(request, 'post')
                .yields(null, {statusCode: 200});
            clock = sinon.useFakeTimers();
            clock.tick(300000);
            done();
        });

        after(function (done) {
            request.post.restore();
            clock.restore();
            done();
        });

        it('should return error', function (done) {
            var data = {
                eventlog: [],
                resources: {
                    'http://www.google.com/': {
                        flDirty: false,
                        lastSize: 100,
                        lastHash: 100,
                        ctChecks: 5,
                        whenLastCheck: moment(),
                        ctUpdates: 5,
                        whenLastUpdate: moment()
                    }
                },
                subscriptions: {
                    'http://www.google.com/': {
                        'http://192.168.0.1/': {
                            ctUpdates: 0,
                            whenLastUpdate: moment('0', 'x'),
                            ctErrors: 0,
                            ctConsecutiveErrors: 0,
                            whenLastError: moment('0', 'x'),
                            whenExpires: moment('0', 'x')
                        }
                    }
                },
                prefs: {
                    ctSecsResourceExpire: 25 * 60 * 60,
                    minSecsBetweenPings: 10
                }
            };

            ping(data, 'http://www.google.com/', function (err, result) {
                err.should.equal('Can\'t accept the request because the minimum seconds between pings is 10 and you pinged us 0 seconds ago.');
                done();
            });
        });
    });

    describe('services/ping.js failed check', function () {
        before(function (done) {
            sinon
                .stub(request, 'get')
                .yields(null, {statusCode: 404});
            clock = sinon.useFakeTimers();
            clock.tick(300000);
            done();
        });

        after(function (done) {
            request.get.restore();
            clock.restore();
            done();
        });

        it('should return error', function (done) {
            var data = {
                eventlog: [],
                resources: {
                    'http://www.google.com/': {
                        flDirty: false,
                        lastSize: 100,
                        lastHash: 100,
                        ctChecks: 5,
                        whenLastCheck: moment('0', 'x'),
                        ctUpdates: 5,
                        whenLastUpdate: moment('0', 'x')
                    }
                },
                subscriptions: {
                    'http://www.google.com/': {
                        'http://192.168.0.1/': {
                            ctUpdates: 0,
                            whenLastUpdate: moment('0', 'x'),
                            ctErrors: 0,
                            ctConsecutiveErrors: 0,
                            whenLastError: moment('0', 'x'),
                            whenExpires: moment('0', 'x')
                        }
                    }
                },
                prefs: {
                    ctSecsResourceExpire: 25 * 60 * 60,
                    minSecsBetweenPings: 10
                }
            };

            ping(data, 'http://www.google.com/', function (err, result) {
                err.should.equal('The ping was cancelled because there was an error reading the resource at URL http://www.google.com/.');
                done();
            });
        });
    });
}());
