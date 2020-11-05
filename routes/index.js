const express = require('express'),
    //parser = require('../public/javascripts/parser'),
    router = express.Router();


router.get('/', function (req, res) {

    // res.setHeader('Cache-Control', 'no-cache');

    res.render('index', {

        description: 'SBOL Visual Homepage',
        language: 'en-GB',
        data: {author: 'Jake Sumner', university: 'Keele University'},
        title: 'SBOL Visual',
        tagline: 'SBOL Visual is a web-based visualisation tool',
        keywords: ['SBOL', 'Visualisation', 'Synthetic Biology', 'SBOL v3', 'Glyph Creator'],
        copyright: 'Jake Sumner &copy; 2020',


    });


});


module.exports = router;


