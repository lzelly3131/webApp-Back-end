var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const router = express.Router();
var cors = require('cors');
const mongoose = require('mongoose');

// CREAR CONEXION A LA BD DE MONGODB
mongoose.connect('mongodb://127.0.0.1:27017/todobackend');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const exp = require('constants');
var usersTasks = require('./routes/tasks');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//CREACION DE MIDDLEWARE
router.use((req, res, next)=>{
  if(req.headers.authorization && req.headers.authorization === 'tds2024'){
    next();
  }else{
    res.status(401).json({'ERROR':'No se encontró una autorización valida'})
  }
})


app.use(cors());
app.use('/', router);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', usersTasks);

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

module.exports = app;
