"use strict";

var mysql = require('mysql');

var connection = mysql.createConnection({
    host        : process.env.DB_HOST,
    user        : process.env.DB_USER,
    password    : process.env.DB_PASS,
    database    : process.env.DB_TABLE 
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
