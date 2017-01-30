const pg = require('pg');

var config = {
  user: 'postgres',
  database: 'todo',
  password: 'password',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
};

var pool = new pg.Pool(config);

function database(){
  pool.connect(function (err, client, done){
    client.query('CREATE TABLE Users(name VARCHAR(64) NOT NULL, pin VARCHAR(4) NOT NULL, admin BOOLEAN NOT NULL, status BOOLEAN NOT NULL, userID INT PRIMARY KEY NOT NULL)', function(err, client, done) {
      if(err){
          return console.log("database already existing");
      }
    });
    client.query('CREATE TABLE Groups(name VARCHAR(64) NOT NULL, userID INT NOT NULL, messageID INT NOT NULL, annoucementID INT NOT NULL, groupID INT PRIMARY KEY NOT NULL)', function(err, client, done) {
      if(err){
          return console.log("database already existing");
      }
    });
    //add date later
    client.query('CREATE TABLE Messages(message varchar(256) NOT NULL, userID INT NOT NULL, messageID INT PRIMARY KEY NOT NULL)', function(err, client, done) {
      if(err){
          return console.log("database already existing");
      }
    });
    client.query('CREATE TABLE Annoucements(name VARCHAR(256) NOT NULL, userID INT NOT NULL, annoucementID INT PRIMARY KEY NOT NULL)', function(err, client, done) {
      if(err){
          return console.log("database already existing");
      }
    });

  });
}
database();

function insertData(param){
  pool.connect(function(err, client, done) {
    if(err) {
      done();
      return console.error('Error fetching client from pool', err);
    }
    const query = client.query(param);
    query.on('end', () => { done(); });
  });
}

function readData(param){
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

    query.on('end', () => { done(); });
  });
  return results;
}

function udData(param){
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
