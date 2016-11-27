(function () {
    "use strict";

    var moment = require('moment'),
        parseNotifyParams = require('../../services/parse-notify-params.js'),
        request = require('request'),
        sinon = require('sinon'),
        clock;

    describe('services/parse-notify-params.js using remoteAddress', function () {
        it('should parse notify params correctly', function (done) {
            var params, req = {
                'body': {
                    'port': '80',
                    'path': '/ping',
                    'protocol': 'http-post',
                    'url1': 'http://example.com/rss.xml',
                    'url2': 'http://another.example.com/rss.xml'
                },
                'connection': {
                    'remoteAddress': '192.168.0.100'
                },
                'headers': {}
            };

            parseNotifyParams(req, function (err, params) {
                if (err) {
                    done(err);
                }
                params.diffDomain.should.equal(false);
                params.apiurl.should.equal('http://192.168.0.100:80/ping');
                done();
            });
        });
    });

    describe('services/parse-notify-params.js using domain', function () {
        it('should parse notify params correctly', function (done) {
            var params, req = {
                'body': {
                    'domain': 'river.geekity.com',
                    'port': '80',
                    'path': 'ping',
                    'protocol': 'http-post',
                    'url1': 'http://example.com/rss.xml',
                    'url2': 'http://another.example.com/rss.xml'
                },
                'connection': {
                    'remoteAddress': '192.168.0.100'
                },
                'headers': {}
            };

            parseNotifyParams(req, function (err, params) {
                if (err) {
                    done(err);
                }
                params.diffDomain.should.equal(true);
                params.apiurl.should.equal('http://river.geekity.com:80/ping');
                done();
            });
        });
    });

    describe('services/parse-notify-params.js missing params', function () {
        it('should return an error', function (done) {
            var params, req = {
                'body': {
                    'url1': 'http://example.com/rss.xml',
                    'url2': 'http://another.example.com/rss.xml'
                },
                'connection': {
                    'remoteAddress': '192.168.0.100'
                },
                'headers': {}
            };

            parseNotifyParams(req, function (err, params) {
                err.should.equal('The following parameters were missing from the request body: port, path, protocol.');
                done();
            });
        });
    });

    describe('services/parse-notify-params.js unsupported protocol', function () {
        it('should return an error', function (done) {
            var params, req = {
                'body': {
                    'port': '80',
                    'path': 'ping',
                    'protocol': 'soap',
                    'url1': 'http://example.com/rss.xml',
                    'url2': 'http://another.example.com/rss.xml'
                },
                'connection': {
                    'remoteAddress': '192.168.0.100'
                },
                'headers': {}
            };

            parseNotifyParams(req, function (err, params) {
                err.should.equal('Can\'t accept the subscription because the protocol, <i>soap</i>, is unsupported.');
                done();
            });
        });
    });
}());
