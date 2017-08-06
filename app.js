var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var controller = require('./routes/controller');
var practice = require('./routes/practice');
//require()とすることでpracice.jsを実行する。
//返ってくる変数は、practice.jsでmodule.exportに設定しているオブジェクトになる。
//他にもいろいろある。検証したソースがどっかにいってしまった。
//以下を参考にしたので気になったら再度検証。
//http://fernweh.jp/b/nodejs-require-exports/
//自分のブログでちょっと触れた箇所
//http://www.tohuandkonsome.site/entry/2017/07/21/153646

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//jadeでHTMLを出力した際に見やすい形で出力してくれる
app.locals.pretty = true;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/node_modules'));

app.use('/', index);
app.use('/controller', controller);
app.use('/practice', practice);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
