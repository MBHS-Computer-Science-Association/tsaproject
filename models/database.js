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
const pool = new Pool(config);

function database(){

  pool.connect().then(client => {
    return client.query('CREATE TABLE IF NOT EXISTS Users(info json NOT NULL)').then(() => client);
  }).then(client => client.release());
  pool.connect().then(client => {
    return client.query('CREATE TABLE IF NOT EXISTS Messages(info json NOT NULL)').then(() => client);
  }).then(client => client.release());
  pool.connect().then(client => {
    return client.query('CREATE TABLE IF NOT EXISTS Groups(info json NOT NULL)').then(() => client);
  }).then(client => client.release());
  pool.connect().then(client => {
    return client.query('CREATE TABLE IF NOT EXISTS Annoucements(info json NOT NULL)').then(() => client);
  }).then(client => client.release());
}
database();

exports.queryDB = function(value){
  pool.connect().then(client => {
    return client.query({text: '$1', values: [value]}).then(() => client);
  }).then(client => client.release());
  console.log('this worked');
};
/*
    json data
*/
exports.insertIntoUsers = function(value){
  pool.connect().then(client => {
    return client.query({text: 'INSERT INTO Users(info) VALUES($1);', values: [value]}).then(() => client);
  }).then(client => client.release());
};
/*
    json data
*/
exports.insertIntoGroups = function(row, value){
  pool.connect().then(client => {
    return client.query({text: 'INSERT INTO Groups(info) VALUES($1);', values: [value]}).then(() => client);
  }).then(client => client.release());
};
/*
    json data
*/
exports.insertIntoMessages = function(value){
  pool.connect().then(client => {
    return client.query({text: 'INSERT INTO Messages(info) VALUES($1);', values: [value]}).then(() => client);
  }).then(client => client.release());
};
/*
    json data
*/
exports.insertIntoAnnouncements = function(value){
  pool.connect().then(client => {
    return client.query({text: 'INSERT INTO Announcements(info) VALUES($1);', values: [value]}).then(() => client);
  }).then(client => client.release());
};

//only information ever to be updated is user status, function to update user status
exports.updateUserStatus = function(newValue, user){
  pool.connect().then(client => {
    return client.query({text: 'UPDATE Users SET $1 WHERE info#>>\'status\' AND info#>>\'name\'=$2', values: [newValue, user]}).then(() => client);
  }).then(client => client.release());
};



exports.retrieveUsers = function(object, val){
  console.log('yes')
  pool.connect().then(client => {
    return client.query({text: 'SELECT info -> \'$1\' AS $2 FROM Users;', values: [object, val]}, function(err, result){
      console.log('hi :::: ' + err);
    }).then(() => client);
  }).then(client => client.release());
};
exports.retrieveGroups = function(toBeSelected, jsonPathway){
  pool.connect().then(client => {
    return client.query({text: 'SELECT $1#>>\'{$2}\' AS FROM Groups;', values: [toBeSelected, jsonPathway]}).then(() => client);
  }).then(client => client.release());
};
exports.retrieveMessages = function(toBeSelected, jsonPathway){
  pool.connect().then(client => {
    return client.query({text: 'SELECT $1#>>\'{$2}\' AS FROM Messages;', values: [toBeSelected, jsonPathway]}).then(() => client);
  }).then(client => client.release());
};
exports.retrieveAnnouncements = function(toBeSelected, jsonPathway, table){
  pool.connect().then(client => {
    return client.query({text: 'SELECT $1#>>\'{$2}\' AS FROM Annoucements;', values: [toBeSelected, jsonPathway]}).then(() => client);
  }).then(client => client.release());
};
