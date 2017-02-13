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
  pool.connect().then(client => {                  // tableColumnsArray will not work like this as of right now TODO: change it!
    return client.query('CREATE TABLE IF NOT EXISTS Users(userID INT PRIMARY KEY NOT NULL, info json NOT NULL)').then(() => client)
  }).then(client => client.release());
}


exports.insertIntoUsers = function(row, value){
  pool.connect().then(client => {
    return client.query({text: 'INSERT INTO Users($1) VALUES($2);', values: [row, value]}).then(() => client)
  }).then(client => client.release());
}
exports.insertIntoGroups = function(row, value){
  pool.connect().then(client => {
    return client.query({text: 'INSERT INTO Groups($1) VALUES($2);', values: [row, value]}).then(() => client)
  }).then(client => client.release());
}
exports.insertIntoMessages = function(row, value){
  pool.connect().then(client => {
    return client.query({text: 'INSERT INTO Messages($1) VALUES($2);', values: [row, value]}).then(() => client)
  }).then(client => client.release());
}
exports.insertIntoAnnouncements = function(row, value){
  pool.connect().then(client => {
    return client.query({text: 'INSERT INTO Announcements($1) VALUES($2);', values: [row, value]}).then(() => client)
  }).then(client => client.release());
}


exports.updateUsers = function(newValue, jsonPathway, column, oldValue){
  pool.connect().then(client => {
    return client.query({text: 'UPDATE Users SET $1 WHERE $2#>>\'{TODO:JSON PATH TO BE CHANGED ($3) }\'=$4;', values: [newValue, jsonPathway, column, oldValue]}).then(() => client)
  }).then(client => client.release());
}



exports.retrieveUsers = function(toBeSelected, jsonPathway){
  pool.connect().then(client => {
    return client.query({text: 'SELECT $1#>>\'{TODO:JSON PATH TO BE CHANGED($2)}\' AS FROM Users', values: [toBeSelected, jsonPathway]}).then(() => client)
  }).then(client => client.release());
}
exports.retrieveGroups = function(toBeSelected, jsonPathway){
  pool.connect().then(client => {
    return client.query({text: 'SELECT $1#>>\'{TODO:JSON PATH TO BE CHANGED($2)}\' AS FROM Groups', values: [toBeSelected, jsonPathway]}).then(() => client)
  }).then(client => client.release());
}
exports.retrieveMessages = function(toBeSelected, jsonPathway){
  pool.connect().then(client => {
    return client.query({text: 'SELECT $1#>>\'{TODO:JSON PATH TO BE CHANGED($2)}\' AS FROM Messages', values: [toBeSelected, jsonPathway]}).then(() => client)
  }).then(client => client.release());
}
exports.retrieveAnnouncements = function(toBeSelected, jsonPathway, table){
  pool.connect().then(client => {
    return client.query({text: 'SELECT $1#>>\'{TODO:JSON PATH TO BE CHANGED($2)}\' AS FROM Annoucements', values: [toBeSelected, jsonPathway]}).then(() => client)
  }).then(client => client.release());
}
