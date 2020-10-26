const express = require('express'),
    path = require('path'),
    helmet = require('helmet'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    indexRouter = require('./routes/index'),
    listRouter = require('./routes/list'),
    ect = require('ect'),
    ectRenderer = ect({watch: true, root: path.join(__dirname, 'views'), ext: '.ect'}),
    app = express(),
    port = 80,
    hostname = 'localhost';

app.enable('strict routing');

//sets view engine
app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//static directory names
app.use(express.static(path.join(__dirname, 'views')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

//routing paths
app.use('/', indexRouter);
app.use('/list', listRouter);

//bash popup to show connection recieved
app.use(helmet());
app.listen(port, function () {
    console.log(`Server hosted at http://${hostname}:${port}`);
});

module.exports = app;


/*
NOTES

function interchangeable with =>
app.use to add extra routing
create external functions in pulbic javascripts or possibly put in routes but unknown how expressJS handles these atm


 */
