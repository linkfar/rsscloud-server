(function () {
    "use strict";

    var moment = require('moment'),
        parsePingParams = require('../../services/parse-ping-params.js'),
        request = require('request'),
        sinon = require('sinon'),
        clock;

    describe('services/parse-ping-params.js with url', function () {
        it('should parse ping params correctly', function (done) {
            var params, req = {
                'body': {
                    'url': 'http://example.com/rss.xml'
                }
            };

            parsePingParams(req, function (err, params) {
                if (err) {
                    done(err);
                }
                params.url.should.equal('http://example.com/rss.xml');
                done();
            });
        });
    });

    describe('services/parse-ping-params.js without url', function () {
        it('should generate an error', function (done) {
            var params, req = {
                'body': {
                }
            };

            parsePingParams(req, function (err, params) {
                err.should.equal('The following parameters were missing from the request body: url.');
                done();
            });
        });
    });
}());
