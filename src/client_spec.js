/*global sinon:false fetch:false */

var client = require('./client');
var testHelpers = require('../test/helpers');

describe('client', function () {

  var server = null;

  beforeEach(function () {
    server = sinon.fakeServer.create();
  });

  afterEach(function () {
    server.restore();
  });

  describe('responding to a generic request', function () {

    beforeEach(function () {
      var okResponse = [
        200,
        { 'Content-type': 'application/json' },
        '{"hello":"world"}'
      ];

      server.respondWith('GET', '/foobar', okResponse);
    });

    it('returns correct body', function (done) {
      client('/foobar', function (err, json) {
        if (err) return done(err);
        expect(json.hello).toBe('world');
        done();
      });

      server.respond();
    });
  });

  describe('stubbing response using test helpers', function () {

    beforeEach(function () {
      server.respondWith('GET', '/foobar', testHelpers.jsonOk({
        hello: 'world'
      }));
    });

    it('returns correct body', function (done) {
      client('/foobar', function (err, json) {
        if (err) return done(err);
        expect(json.hello).toBe('world');
        done();
      });
      server.respond();
    });
  });

  describe('error response (uses test helpers)', function () {

    beforeEach(function () {
      server.respondWith('GET', '/admin', testHelpers.jsonError(401, {
        message: 'requires authorization'
      }));
    });

    it('returns error', function (done) {
      client('/admin', function (err) {
        expect(err.status).toBe(401);
        expect(err.message).toBe('requires authorization');
        done();
      });
      server.respond();
    });
  });
});

