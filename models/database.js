var exports = module.exports = {};
var url = require('url');

const pg = require('pg');

var params = url.parse(process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/todo');
var auth = params.auth.split(':');

var config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: 10,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

function database(){
  pool.connect(function (err, client, done){
    if (err) throw err;
    client.query('CREATE TABLE IF NOT EXISTS Users(name VARCHAR(64) NOT NULL, pin VARCHAR(4) NOT NULL, admin BOOLEAN NOT NULL, status BOOLEAN NOT NULL, userID INT PRIMARY KEY NOT NULL)', function(err, client, done) {
      if(err){
        throw err;
      }
    });
    client.query('CREATE TABLE IF NOT EXISTS Groups(name VARCHAR(64) NOT NULL, userID INT NOT NULL, messageID INT NOT NULL, annoucementID INT NOT NULL, groupID INT PRIMARY KEY NOT NULL)', function(err, client, done) {
      if(err){
        throw err;
      }
    });
    //add date later
    client.query('CREATE TABLE IF NOT EXISTS Messages(message varchar(256) NOT NULL, userID INT NOT NULL, messageID INT PRIMARY KEY NOT NULL)', function(err, client, done) {
      if(err){
        throw err;
      }
    });
    client.query('CREATE TABLE IF NOT EXISTS Annoucements(name VARCHAR(256) NOT NULL, userID INT NOT NULL, annoucementID INT PRIMARY KEY NOT NULL)', function(err, client, done) {
      if(err){
        throw err;
      }
    });

  });
}
database();

exports.insertData = function (param){
  pool.connect(function(err, client, done) {
    if(err) {
      done();
      return console.error('Error fetching client from pool', err);
    }
    const query = client.query(param);
    query.on('end', () => { done(); });
  });
}

exports.readData = function(param){
  var results = []
  pool.connect(function(err, client, done) {
    if(err) {
      done();
      return console.error('Error fetching client from pool', err);
    }
    //'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)'
    const query = client.query(param);
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => { done(); });
  });
  return results;
}

exports.udData = function(param){
  pool.connect(function(err, client, done) {
    if(err) {
      done();
      return console.error('Error fetching client from pool', err);
    }
    //'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)'
    const query = client.query(param);
    query.on('end', () => { done(); });
  });
}
