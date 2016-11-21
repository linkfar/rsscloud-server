(function () {
    "use strict";

    var appMessages = require('../../services/app-messages.js');

    describe('services/app-messages.js expected properties', function () {
        it('should have expected properties', function (done) {
            appMessages.should.have.property('error');
            appMessages.error.should.have.property('subscription');
            appMessages.error.subscription.should.have.property('missingParams');
            appMessages.error.subscription.should.have.property('invalidProtocol');
            appMessages.error.subscription.should.have.property('readResource');
            appMessages.error.subscription.should.have.property('noResources');
            appMessages.error.subscription.should.have.property('failedHandler');
            appMessages.error.should.have.property('ping');
            appMessages.error.ping.should.have.property('tooRecent');
            appMessages.error.ping.should.have.property('readResource');

            appMessages.should.have.property('log');
            appMessages.log.should.have.property('subscription');
            appMessages.log.should.have.property('ping');
            appMessages.log.should.have.property('notify');

            appMessages.should.have.property('success');
            appMessages.success.should.have.property('subscription');
            appMessages.success.should.have.property('ping');

            done();
        });
    });
}());
