var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var usersRouter = require('./routes/users');
var artsRouter = require('./routes/arts');
var lifeChipsRouter = require('./routes/lifeChips');
var recentRouter = require('./routes/recent');
var visitorRouter = require('./routes/visitors');
var postcardLayoutsRouter = require('./routes/postcardLayouts');
var projectsRouter = require('./routes/projects');
var serverConfig = require('./config/index.js').serverConfig;
const { jwtMiddleware } = require('./jwt/index.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(jwtMiddleware);
app.use('/backend/user', usersRouter);
app.use('/backend/arts', artsRouter);
app.use('/backend/lifeChips', lifeChipsRouter);
app.use('/backend/recent', recentRouter);
app.use('/backend/visitors', visitorRouter);
app.use('/backend/postcardLayouts', postcardLayoutsRouter);
app.use('/backend/projects', projectsRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// set the host and port to run the server

app.listen(serverConfig.port, serverConfig.host, () => {
  console.log(`Server is running at http://${serverConfig.host}:${serverConfig.port}/`);
});

module.exports = app;
