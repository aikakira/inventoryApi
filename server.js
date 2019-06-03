// Load our config
require("dotenv").config();

var express =  require('express');
var parser = require('body-parser');
var db = require('./lib/db.js');
var app = express();
var port = process.env.PORT || 3000;
var routes = require('./routes/inventoryRoutes.js');

app.listen(port);
console.log('API server started on: ' + port);

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

routes(app);
