const express = require('express')
var app = express()
const bodyParser = require('body-parser')

var index = require('./routes/index');
var users = require('./routes/users');
var memos = require('./routes/memos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index)
app.use('/users', users)
app.use('/memos', memos)

app.listen(3000)