const express = require('express'),

    JsonLdParser = require('jsonld-streaming-parser').JsonLdParser,
    jsonParser = new JsonLdParser(),
    // RdfXmlParser = require('rdfxml-streaming-parser').RdfXmlParser,
    // rdfParser = new RdfXmlParser();
    router = express.Router();


//router.use(express.urlencoded({extended: true}));
router.use(express.json());
//router.use(express.text({type: 'text/html'}));


router.get('/', (req, res) => {

    res.setHeader('Cache-Control', 'no-cache');

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


router.post('/jsonld', (req, res) => {
    let sboldata = req.body.sboldata;

    jsonParser
        .on('data', console.log)
        .on('context', console.log)
        .on('error', console.error)
        .on('end', () => console.log('All triples were parsed.'));


    jsonParser.write(sboldata);
    jsonParser.end();


    //  const quads = parser.import(sboldata);

    //console.log(quads);
    res.render('index', {

        description: 'SBOL Visual Homepage',
        language: 'en-GB',
        data: {author: 'Jake Sumner', university: 'Keele University'},
        title: 'SBOL Visual',
        tagline: 'SBOL Visual is a web-based visualisation tool',
        keywords: ['SBOL', 'Visualisation', 'Synthetic Biology', 'SBOL v3', 'Glyph Creator'],
        copyright: 'Jake Sumner &copy; 2020',
        sboldata: sboldata

    });


});


// router.post('/rdfxml', (req , res) =>{
//
//     let sboldata = req.body.sboldata;
//
//     rdfParser
//         .on('data', console.log)
//         .on('context', console.log)
//         .on('error', console.error)
//         .on('end', () => console.log('All triples were parsed.'));
//
//
//     rdfParser.write(sboldata);
//     rdfParser.end();
//     res.render('index', {
//
//         description: 'SBOL Visual Homepage',
//         language: 'en-GB',
//         data: {author: 'Jake Sumner', university: 'Keele University'},
//         title: 'SBOL Visual',
//         tagline: 'SBOL Visual is a web-based visualisation tool',
//         keywords: ['SBOL', 'Visualisation', 'Synthetic Biology', 'SBOL v3', 'Glyph Creator'],
//         copyright: 'Jake Sumner &copy; 2020',
//         sboldata: sboldata
//
//     });
//
//
// });


module.exports = router;

/*
POST recieved, data parsed to json-ld format
data then sent through API to get correct glyph type
and other details relating to the glyph for the list view
data sent back to parser where it will rendered in router request
and displayed in the correct locations, using the view engine.
Make repeatable


 */
