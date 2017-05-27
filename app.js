const express = require('express')
var app = express()
const bodyParser = require('body-parser')

var index = require('./routes/index');
var companies = require('./routes/companies');
var events = require('./routes/events');
var projects = require('./routes/projects');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index)
app.use('/companies', companies)
app.use('/events', events)
app.use('/projects', projects)

app.listen(3000)