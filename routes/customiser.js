const express = require('express'),
    router = express.Router();


router.get('/customiser', function (req, res) {

    res.render('customiser', {

        description: 'Customiser',
        language: 'en-GB',
        data: {author: 'Jake Sumner', university: 'Keele University'},
        title: 'SBOL Visual',
        tagline: 'SBOL Visual is a web-based visualisation tool',
        keywords: ['SBOL', 'Visualisation', 'Synthetic Biology', 'SBOL v3', 'Glyph Creator'],
        copyright: 'Jake Sumner &copy; 2020',

    });
});


module.exports = router;
