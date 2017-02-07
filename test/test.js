var assert = require('chai').assert;

var db = require('../models/database');

describe('PostgreSQL Database', function() {
  describe('get users function', function() {
    it('should return all of the users in json');
  });

  describe('insert user function', function() {
    it('should insert user properly');
  });

  describe('get groups function', function() {
    it('should return all of the groups in json');
  });

  describe('insert group function', function() {
    it('should insert group properly');
  });

  describe('get messages function', function() {
    it('should return all of the messages in json');
  });

  describe('insert message function', function() {
    it('should insert message properly');
  });

  describe('get announcements function', function() {
    it('should return all of the announcements in json');
  });

  describe('insert announcement function', function() {
    it('should insert announcement properly');
  });
});
