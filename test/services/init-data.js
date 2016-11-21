(function () {
    "use strict";

    var initData = require('../../services/init-data.js');

    describe('services/init-data.js default data', function () {
        it('should have expected default data when empty', function (done) {
            var data = initData({});

            data.should.have.property('eventlog');
            data.eventlog.should.be.instanceof(Array).and.have.lengthOf(0);

            data.should.have.property('resources');
            data.resources.should.be.instanceof(Object).and.be.empty();

            data.should.have.property('prefs');
            data.prefs.should.be.instanceof(Object).and.not.be.empty();
            data.prefs.should.have.property('maxConsecutiveErrors').and.equal(3);
            data.prefs.should.have.property('maxResourceSize').and.equal(256000);
            data.prefs.should.have.property('ctSecsResourceExpire').and.equal(90000);
            data.prefs.should.have.property('minSecsBetweenPings').and.equal(0);
            data.prefs.should.have.property('maxEvents').and.equal(100);

            data.should.have.property('subscriptions');
            data.resources.should.be.instanceof(Object).and.be.empty();

            data.should.have.property('dirty').and.equal(true);

            done();
        });
    });

    describe('services/init-data.js preset data', function () {
        it('should have preset data when available', function (done) {
            var data = initData({
                eventlog: ['log'],
                resources: {sample: 'data'},
                prefs: {
                    maxConsecutiveErrors: 10,
                    maxResourceSize: 10,
                    ctSecsResourceExpire: 10,
                    minSecsBetweenPings: 10,
                    maxEvents: 10
                },
                subscriptions: {sample: 'data'},
                dirty: false
            });

            data.should.have.property('eventlog');
            data.eventlog.should.be.instanceof(Array).and.have.lengthOf(1);

            data.should.have.property('resources');
            data.resources.should.be.instanceof(Object).and.not.be.empty();

            data.should.have.property('prefs');
            data.prefs.should.be.instanceof(Object).and.not.be.empty();
            data.prefs.should.have.property('maxConsecutiveErrors').and.equal(10);
            data.prefs.should.have.property('maxResourceSize').and.equal(10);
            data.prefs.should.have.property('ctSecsResourceExpire').and.equal(10);
            data.prefs.should.have.property('minSecsBetweenPings').and.equal(10);
            data.prefs.should.have.property('maxEvents').and.equal(10);

            data.should.have.property('subscriptions');
            data.resources.should.be.instanceof(Object).and.not.be.empty();

            data.should.have.property('dirty').and.equal(false);

            done();
        });
    });
}());
