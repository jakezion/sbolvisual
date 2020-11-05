//TODO: GLOBAL increase reqiure effiecnecy and reduce code reuse with module.export file. set up cheeriojs instead of jsdom + jquery, more efficient

const express = require('express'),
    path = require('path'), //possible remove
    helmet = require('helmet'),
    // bootstrap = require('bootstrap'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    indexRouter = require('./routes/index'),
    dragdropRouter = require('./routes/dragdrop'),
    customiserRouter = require('./routes/customiser'),
    githubRouter = require('./routes/github'),
    aboutRouter = require('./routes/about'),
    usefullinksRouter = require('./routes/usefullinks'),
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
// app.use(bootstrap());
app.use(helmet());


//static directory names
app.use(express.static(path.join(__dirname, 'views')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/jq', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/popper', express.static(path.join(__dirname, 'node_modules/popper.js/dist')));
app.use('/style', express.static(path.join(__dirname, 'public/stylesheets')));
// app.use('/javascripts', express.static(path.join(__dirname, 'public/javascripts')));
app.use('/public', express.static(path.join(__dirname, "public")));

//routing paths
app.use('/', indexRouter);
app.use('/dragdrop', dragdropRouter);
app.use('/customiser', customiserRouter);
app.use('/github', githubRouter);
app.use('/about', aboutRouter);
app.use('/description', usefullinksRouter);


//bash popup to show connection recieved
app.listen(port, function () {
    console.log(`Server hosted at http://${hostname}:${port}`);
});

module.exports = app;
