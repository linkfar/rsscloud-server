(function () {
    "use strict";

    var initResource = require('../../services/init-resource.js'),
        moment = require('moment');

    describe('services/init-resource.js default data', function () {
        it('should have expected default data when empty', function (done) {
            var data = {resources: {}, dirty: false},
                resource = initResource(data, 'http://example.com/');

            data.resources.should.have.property('http://example.com/').and.equal(resource);
            data.dirty.should.equal(true);

            resource.should.have.property('flDirty').and.equal(true);
            resource.should.have.property('lastSize').and.equal(0);
            resource.should.have.property('lastHash').and.equal(0);
            resource.should.have.property('ctChecks').and.equal(0);
            resource.should.have.property('whenLastCheck');
            moment.isMoment(resource.whenLastCheck).should.equal(true);
            resource.should.have.property('ctUpdates').and.equal(0);
            resource.should.have.property('whenLastUpdate');
            moment.isMoment(resource.whenLastUpdate).should.equal(true);

            done();
        });
    });

    describe('services/init-resource.js preset data', function () {
        it('should have preset data when available', function (done) {
            var data = {
                    resources: {
                        'http://example.com/': {
                            flDirty: false,
                            lastSize: 10,
                            lastHash: 10,
                            ctChecks: 10,
                            whenLastCheck: moment('0', 'x'),
                            ctUpdates: 10,
                            whenLastUpdate: moment('0', 'x')
                        }
                    },
                    dirty: false
                },
                resource = initResource(data, 'http://example.com/');

            data.resources.should.have.property('http://example.com/').and.equal(resource);
            data.dirty.should.equal(false);

            resource.should.have.property('flDirty').and.equal(false);
            resource.should.have.property('lastSize').and.equal(10);
            resource.should.have.property('lastHash').and.equal(10);
            resource.should.have.property('ctChecks').and.equal(10);
            resource.should.have.property('whenLastCheck');
            moment.isMoment(resource.whenLastCheck).should.equal(true);
            resource.should.have.property('ctUpdates').and.equal(10);
            resource.should.have.property('whenLastUpdate');
            moment.isMoment(resource.whenLastUpdate).should.equal(true);

            done();
        });
    });
}());
