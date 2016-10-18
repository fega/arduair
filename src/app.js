/*
* TODO:0 Add Helmet.js
* TODO:10 protect for repeated request.
 */
var compression = require('compression');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var minifyHTML = require('express-minify-html');
var colors = require('colors');
var routes = require('./routes/index');
var test = require('./routes/test');
var api = require('./routes/api');
//MONTAR MONGOOSE Y CONECTAR A LA BASE DE DATOS
var mongoose = require('mongoose');
var db = require('./db/db');
mongoose.connect(db.url);
//Mongoose error handling
mongoose.connection.on("error", (err) => {
  console.log("Could not connect to mongo server!".yellow);
  return console.log(err.message.red);
});
try {
  mongoose.connect(db.url);
  console.log("Started connection on " + ("mongodb://" + db.url).cyan + ", waiting for it to open...".grey);
} catch (err) {
  console.log(("Setting up failed to connect to " + db.url).red, err.message);
}

var app = express();
app.use(compression()); //enables gzip compression

app.use(minifyHTML({
    override: false,
    htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true
    }
}));
//MONTAR HANDLEBARS TEMPLATE ENGINE
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'views', 'partials'),
    extname: '.handlebars'
}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/test', test);
app.use('/api', api);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;
