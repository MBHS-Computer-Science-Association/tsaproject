var exports = module.exports = {};
var url = require('url');
var Pool = require('pg-pool');


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

function database(){
  const pool = new Pool(config);

  pool.connect().then(client => {                  // tableColumnsArray will not work like this as of right now TODO: change it!
    return client.query('CREATE TABLE IF NOT EXISTS Users(info json NOT NULL)').then(() => client)
  }).then(client => client.release());
  pool.connect().then(client => {                  // tableColumnsArray will not work like this as of right now TODO: change it!
    return client.query('CREATE TABLE IF NOT EXISTS Messages(info json NOT NULL)').then(() => client)
  }).then(client => client.release());
  pool.connect().then(client => {                  // tableColumnsArray will not work like this as of right now TODO: change it!
    return client.query('CREATE TABLE IF NOT EXISTS Groups(info json NOT NULL)').then(() => client)
  }).then(client => client.release());
  pool.connect().then(client => {                  // tableColumnsArray will not work like this as of right now TODO: change it!
    return client.query('CREATE TABLE IF NOT EXISTS Annoucements(info json NOT NULL)').then(() => client)
  }).then(client => client.release());
}
database();

/*
    id primary key
    json data
*/
exports.insertIntoUsers = function(row, value){
  pool.connect().then(client => {
    return client.query({text: 'INSERT INTO Users($1) VALUES($2);', values: [row, value]}).then(() => client)
  }).then(client => client.release());
}
/*
    id primary key
    json data
*/
exports.insertIntoGroups = function(row, value){
  pool.connect().then(client => {
    return client.query({text: 'INSERT INTO Groups($1) VALUES($2);', values: [row, value]}).then(() => client)
  }).then(client => client.release());
}
/*
    json data
*/
exports.insertIntoMessages = function(row, value){
  pool.connect().then(client => {
    return client.query({text: 'INSERT INTO Messages($1) VALUES($2);', values: [row, value]}).then(() => client)
  }).then(client => client.release());
}
/*
    json data
*/
exports.insertIntoAnnouncements = function(row, value){
  pool.connect().then(client => {
    return client.query({text: 'INSERT INTO Announcements($1) VALUES($2);', values: [row, value]}).then(() => client)
  }).then(client => client.release());
}


exports.updateUsers = function(newValue, column, jsonPathway, oldValue){
  pool.connect().then(client => {
    return client.query({text: 'UPDATE Users SET $1 WHERE info#>>\'status\'=$2', values: [newValue, oldValue]}).then(() => client)
  }).then(client => client.release());
}



exports.retrieveUsers = function(toBeSelected, jsonPathway){
  pool.connect().then(client => {
    return client.query({text: 'SELECT $1#>>\'{#2}\' AS FROM Users', values: [toBeSelected, jsonPathway]}).then(() => client)
  }).then(client => client.release());
}
exports.retrieveGroups = function(toBeSelected, jsonPathway){
  pool.connect().then(client => {
    return client.query({text: 'SELECT $1#>>\'{#2}\' AS FROM Groups', values: [toBeSelected, jsonPathway]}).then(() => client)
  }).then(client => client.release());
}
exports.retrieveMessages = function(toBeSelected, jsonPathway){
  pool.connect().then(client => {
    return client.query({text: 'SELECT $1#>>\'{#2}\' AS FROM Messages', values: [toBeSelected, jsonPathway]}).then(() => client)
  }).then(client => client.release());
}
exports.retrieveAnnouncements = function(toBeSelected, jsonPathway, table){
  pool.connect().then(client => {
    return client.query({text: 'SELECT $1#>>\'{#2}\' AS FROM Annoucements', values: [toBeSelected, jsonPathway]}).then(() => client)
  }).then(client => client.release());
}
