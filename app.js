require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const users = require("./ChallengeChapter4/router/router_users");
app.use('/api/v1', users);

const account = require("./ChallengeChapter4/router/router_account");
app.use('/api/v1', account);

const transaction = require("./ChallengeChapter4/router/router_transaction");
app.use('/api/v1', transaction);

const auth = require("./routes/router_auth")
app.use('/api/v1/', auth)

module.exports = app;
