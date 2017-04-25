var mysql      = require('mysql');

var pool = mysql.createPool({
  connectionLimit : 100,
  host     : 'localhost',
  user     : 'root',
  password : '034481077',
  database : 'Company'
});



module.exports = pool;
