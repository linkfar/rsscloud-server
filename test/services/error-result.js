(function () {
    "use strict";

    var errorResult = require('../../services/error-result.js');

    describe('services/error-result.js expected result', function () {
        it('should have expected result', function (done) {
            var result = errorResult('Message');
            result.success.should.equal(false);
            result.msg.should.equal('Message');

            done();
        });
    });
}());
