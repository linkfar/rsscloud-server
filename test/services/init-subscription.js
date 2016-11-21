(function () {
    "use strict";

    var initSubscription = require('../../services/init-subscription.js'),
        moment = require('moment');

    describe('services/init-subscription.js default data', function () {
        it('should have expected default data when empty', function (done) {
            var data = {prefs: {ctSecsResourceExpire: 0}, subscriptions: {}, dirty: false},
                subscription = initSubscription(data, 'http://example.com/feed', 'http://example.com/api');

            data.subscriptions.should.have.property('http://example.com/feed');
            data.subscriptions['http://example.com/feed'].should.have.property('http://example.com/api').and.equal(subscription);
            data.dirty.should.equal(true);

            subscription.should.have.property('ctUpdates').and.equal(0);
            subscription.should.have.property('whenLastUpdate');
            moment.isMoment(subscription.whenLastUpdate).should.equal(true);
            subscription.should.have.property('ctErrors').and.equal(0);
            subscription.should.have.property('ctConsecutiveErrors').and.equal(0);
            subscription.should.have.property('whenLastError');
            moment.isMoment(subscription.whenLastError).should.equal(true);
            subscription.should.have.property('whenExpires');
            moment.isMoment(subscription.whenExpires).should.equal(true);

            done();
        });
    });

    describe('services/init-subscription.js preset data', function () {
        it('should have preset data when available', function (done) {
            var data = {
                    prefs: {
                        ctSecsResourceExpire: 0
                    },
                    subscriptions: {
                        'http://example.com/feed': {
                            'http://example.com/api': {
                                ctUpdates: 10,
                                whenLastUpdate: moment('0', 'x'),
                                ctErrors: 10,
                                ctConsecutiveErrors: 10,
                                whenLastError: moment('0', 'x'),
                                whenExpires: moment('0', 'x')
                            }
                        }
                    },
                    dirty: false
                },
                subscription = initSubscription(data, 'http://example.com/feed', 'http://example.com/api');

            data.subscriptions.should.have.property('http://example.com/feed');
            data.subscriptions['http://example.com/feed'].should.have.property('http://example.com/api').and.equal(subscription);
            data.dirty.should.equal(false);

            subscription.should.have.property('ctUpdates').and.equal(10);
            subscription.should.have.property('whenLastUpdate');
            moment.isMoment(subscription.whenLastUpdate).should.equal(true);
            subscription.should.have.property('ctErrors').and.equal(10);
            subscription.should.have.property('ctConsecutiveErrors').and.equal(10);
            subscription.should.have.property('whenLastError');
            moment.isMoment(subscription.whenLastError).should.equal(true);
            subscription.should.have.property('whenExpires');
            moment.isMoment(subscription.whenExpires).should.equal(true);

            done();
        });
    });
}());
