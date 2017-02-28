var exports = module.exports = {};
var url = require('url');
var pg = require('pg');

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

var db = new pg.Client(config);

function database(){
  db.connect(function(err) {
    if (err) throw err;
    console.log('PostgreSQL is connected!');
    db.query('CREATE TABLE IF NOT EXISTS users(info json NOT NULL)');
    db.query('CREATE TABLE IF NOT EXISTS messages(info json NOT NULL)');
    db.query('CREATE TABLE IF NOT EXISTS groups(info json NOT NULL)');
    db.query('CREATE TABLE IF NOT EXISTS announcements(info json NOT NULL)');
  });
}
database();

exports.addUser = function(array){
  db.query("INSERT INTO users(info) VALUES($1)", [JSON.stringify(array)]);
}
exports.getAllUsers = function(array){
  var query = db.query('SELECT * FROM users');
    query.on('row', function(row, result) {
        rows.unshift(row.data);
    });
}
