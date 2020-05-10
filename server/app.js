var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var ejs = require('ejs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goods = require('./routes/goods');

var app = express();

//配置 body-parser
// var bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// 引擎改为html
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 登录拦截,判断是否登录
app.use(function(req,res,next){
  if(req.cookies.userId){
    next();
  }else{
    if(req.originalUrl=='/users/login'||req.originalUrl=='/users/logout'||req.originalUrl.indexOf("/goods")>-1){
      next();
    }else{
      // this.$message.error("请先登录");
      res.json({
        status:'10001',
        msg:'当前未登录',
        result:''
      })
    }
  }
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goods',goods)

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
