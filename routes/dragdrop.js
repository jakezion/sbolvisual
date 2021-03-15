const express = require('express'),
  // dragula = require('dragula'),
    router = express.Router();


router.all('/', (req, res) => {

    res.render('dragdrop', {

        description: 'Drag and Drop',
        language: 'en-GB',
        data: {author: 'Jake Sumner', university: 'Keele University'},
        title: 'SBOL Visual',
        tagline: 'SBOL Visual is a web-based visualisation tool',
        keywords: ['SBOL', 'Visualisation', 'Synthetic Biology', 'SBOL v3', 'Glyph Creator'],
        copyright: 'Jake Sumner &copy; 2020',

    });
});


module.exports = router;
