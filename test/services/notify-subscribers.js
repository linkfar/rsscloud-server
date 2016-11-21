(function () {
    "use strict";

    var moment = require('moment'),
        notifySubscribers = require('../../services/notify-subscribers.js'),
        request = require('request'),
        sinon = require('sinon'),
        clock;

    describe('services/notify-subscribers.js notify subscribers', function () {
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
                    ctSecsResourceExpire: 25 * 60 * 60
                }
            };

            notifySubscribers(data, 'http://www.google.com/', function (err) {
                if (err) {
                    return done(err);
                }
                data.subscriptions['http://www.google.com/']['http://192.168.0.1/']
                    .should.have.property('ctUpdates', 1);
                data.subscriptions['http://www.google.com/']['http://192.168.0.1/']
                    .should.have.property('ctConsecutiveErrors', 0);
                data.subscriptions['http://www.google.com/']['http://192.168.0.1/'].whenLastUpdate.unix()
                    .should.equal(300);
                done();
            });
        });
    });

    describe('services/notify-subscribers.js do not fail if missing resource', function () {
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

        it('should ignore request', function (done) {
            var data = {
                eventlog: [],
                subscriptions: {},
                prefs: {
                    ctSecsResourceExpire: 25 * 60 * 60
                }
            };
            notifySubscribers(data, 'http://www.google.com/', function (err) {
                if (err) {
                    return done(err);
                }

                data.subscriptions.should.not.have.property('http://www.google.com/');

                done();
            });
        });
    });
}());
