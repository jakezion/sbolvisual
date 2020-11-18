const express = require('express'),
    // JsonLdParser = require('jsonld-streaming-parser').JsonLdParser,
    // jsonParser = new JsonLdParser(),
    // jsonld = require('jsonld'),
    ParserJsonld = require('@rdfjs/parser-jsonld'),
    parserJsonld = new ParserJsonld(),
    Readable = require('stream').Readable,
    //fs = require('fs'),
    java = require('java'),
    router = express.Router();


router.use(express.urlencoded({extended: true}));
router.use(express.json());


router.all('/', (req, res) => {
    const sboldata = req.body.sboldata;


    parser(sboldata);
    // list(detailed);

    res.setHeader('Cache-Control', 'no-cache');

    res.render('index', {
        description: 'SBOL Visual Homepage',
        language: 'en-GB',
        data: {author: 'Jake Sumner', university: 'Keele University'},
        title: 'SBOL Visual',
        tagline: 'SBOL Visual is a web-based visualisation tool',
        keywords: ['SBOL', 'Visualisation', 'Synthetic Biology', 'SBOL v3', 'Glyph Creator'],
        copyright: 'Jake Sumner &copy; 2020',
        sboldata: sboldata,
        textarea: res.sendFile(__dirname + '/public/java/libSBOLj3/output/entity/collection/collection.jsonld')
        //send array list with list data that then uses the built in loop system of ECTjs to parse the data into their own cards
    });


});



function parser(data) {
    const input = new Readable({
        read: () => {
            input.push(data);
            input.push(null);
        }
    });
    const output = parserJsonld.import(input);

    output.on('data', sbol => {
        setValue(sbol.object.value);
        console.log(`Subject: ${sbol.subject.value} \nPredicate: ${sbol.predicate.value}\n  `);
    });
}

function list(detailed) {
    if (!detailed) {
        Array.forEach((item) => {
            let displayID = item.displayId.value;
            let description = item.description.value;
            let role = item.role.value;
            let roleGlyph = item.roleGlyph.value;
            let type = item.type.value;
            let typeGlyph = item.typeGlyph.value;
            let elements = item.elements.value;


        })
    } else if (detailed) {
        Array.forEach((item) => {
            let list = item.whole.value;

        })
    } else {

    }
}

function setValue(value) {
    console.log("Object", value);

}

// jsonParser.on('context', (context) => {
//     const parserJsonld = new ParserJsonld({
//         context: context
//     })
//     console.log(context);
// });

// jsonParser.write(sboldata);
// jsonParser.end();

module.exports = router;

/*
POST recieved, data parsed to json-ld format
data then sent through API to get correct glyph type
and other details relating to the glyph for the list view
data sent back to parser where it will rendered in router request
and displayed in the correct locations, using the view engine.
Make repeatable


 */
