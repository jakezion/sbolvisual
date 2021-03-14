//TODO: GLOBAL increase reqiure effiecnecy and reduce code reuse with module.export file. set up cheeriojs instead of jsdom + jquery, more efficient

const express = require('express'),
    path = require('path'), //possible remove
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    indexRouter = require('./routes/index'),
    dragdropRouter = require('./routes/dragdrop'),
    examplesRouter = require('./routes/examples'),
    staticRouter = require('./routes/static'),
    ect = require('ect'),
    ectRenderer = ect({watch: true, root: path.join(__dirname, 'views'), ext: '.ect'}),
    app = express();


app.hostname = 'http://localhost';
app.port = 5858;
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
app.use('/libSBOLj3', express.static(path.join(__dirname, 'src/main/java/org/sbolstandard')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/jq', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/popper', express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd')));
app.use('/style', express.static(path.join(__dirname, 'public/stylesheets')));
// app.use('/javascripts', express.static(path.join(__dirname, 'public/javascripts')));
app.use('/public', express.static(path.join(__dirname, "public")));

//routing paths
app.use('/', indexRouter);
app.use('/dragdrop', dragdropRouter);
app.use('/examples', examplesRouter);
app.use('/github', staticRouter);
app.use('/about', staticRouter);
app.use('/links', staticRouter);

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});

app.use((req, res, next) => {
    res.status(304).send("Not modified");
});

app.use((req, res, next) => {
    res.status(200).send("Working as intended");
});

app.use( (req, res, next) => {
    res.status(500).send('Something broke!');
});

app.listen(app.port, () => {

    console.log(`Server hosted at ${app.hostname}:${app.port}`);
});

module.exports = app;
