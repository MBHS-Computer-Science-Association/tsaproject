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

exports.insertData = function(table, tableColumnsArray, jsonArray){
  pool.connect().then(client => {                  // tableColumnsArray will not work like this as of right now TODO: change it!
    return client.query({text: "INSERT INTO $1($2) VALUES($3);", values: [table, tableColumnsArray, jsonArray]}).then(() => client)
  }).then(client => client.release());
}

exports.updateData = function(table, newValue, jsonPathway, column, oldValue){
  pool.connect().then(client => {
    return client.query({text: "UPDATE $1 SET $2 WHERE $3#>>'{TODO:JSON PATH TO BE CHANGED ($4 ) }'=$5;", values: [table, newValue, jsonPathway, column, oldValue]}).then(() => client)
  }).then(client => client.release());
}

exports.retrieveData = function(toBeSelected, jsonPathway, table){
  pool.connect().then(client => {
    return client.query({text: "SELECT $1#>>'{TODO:JSON PATH TO BE CHANGED($2)}' AS  FROM $3", values: [toBeSelected, jsonPathway, table]}).then(() => client)
  }).then(client => client.release());
}
