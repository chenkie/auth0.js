var expect = require('expect.js');

var responseHandler = require('../../src/helper/response-handler');

describe('helpers responseHandler', function () {

  it('should return normalized format 1', function () {
    var assert_err = {};
    assert_err.response = {};
    assert_err.response.statusCode = 400;
    assert_err.response.statusText = 'Bad request';
    assert_err.response.body = {
      error: 'the_error_code',
      error_description: 'The error description.',
      name: 'SomeName'
    };

    responseHandler(function(err, data) {
      expect(data).to.be(undefined);
      expect(err).to.eql({
        original: assert_err,
        status_code: 400,
        status_text: 'Bad request',
        code: 'the_error_code',
        description: 'The error description.',
        name: 'SomeName'
      });
    })(assert_err, null);
  });

  it('should return normalized format 2', function () {
    var assert_err = {};
    assert_err.response = {};
    assert_err.response.body = {
      code: 'the_error_code',
      description: 'The error description.'
    };

    responseHandler(function(err, data) {
      expect(data).to.be(undefined);
      expect(err).to.eql({
        original: assert_err,
        code: 'the_error_code',
        description: 'The error description.'
      });
    })(assert_err, null);
  });

  it('should return normalized format 2', function () {
    var assert_err = {};
    assert_err.response = {};
    assert_err.response.body = {
    };

    responseHandler(function(err, data) {
      expect(data).to.be(undefined);
      expect(err).to.eql({
        original: assert_err,
        code: null,
        description: null
      });
    })(assert_err, null);
  });

  it('should return normalized format 2', function () {
    var assert_err = {};
    assert_err.response = {};
    assert_err.response.body = {
      error_code: 'the_error_code',
      error_description: 'The error description.'
    };

    responseHandler(function(err, data) {
      expect(data).to.be(undefined);
      expect(err).to.eql({
        original: assert_err,
        code: 'the_error_code',
        description: 'The error description.'
      });
    })(assert_err, null);
  });



  it('should return the data', function () {
    var assert_data = {
      body: {
        attr1: 'attribute 1',
        attr2: 'attribute 2'
      }
    }

    responseHandler(function(err, data) {
      expect(err).to.be(null);
      expect(data).to.eql({
        attr1: 'attribute 1',
        attr2: 'attribute 2'
      });
    })(null, assert_data);
  });

  it('should return the data 2', function () {
    var assert_data = {
      text: 'The reponse message'
    }

    responseHandler(function(err, data) {
      expect(err).to.be(null);
      expect(data).to.eql('The reponse message');
    })(null, assert_data);
  });

});