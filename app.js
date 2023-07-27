var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var validateUser = require('./middlewares/auth-middleware')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var reportsRouter = require('./routes/reports');
var appointmentsRouter = require('./routes/appointment');
const { ConnectToDatabase } = require('./models');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

ConnectToDatabase()
.then(() => console.log('Connected to database'))
.catch((err) => console.log('Failed to connect to database', err))

app.use(validateUser)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reports', reportsRouter);
app.use('/appointments', appointmentsRouter);

module.exports = app;
