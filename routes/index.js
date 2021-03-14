const express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    API = require('../public/javascripts/API');
let displayGlyphs = [];
let SBOL;

//placeholder for textarea
let placeholder = fs.readFileSync("./public/placeholder.json").toString();


router.use(express.urlencoded({extended: true}));

router.use(express.json());


router.post('/', (req, res) => {
    let sboldata = req.body.sboldata;
    let format = req.body.format;


//if body data exists, then sync promise parse data and set list data
    if (sboldata !== undefined) {
        let components = parser(sboldata, format);
        setList(components);
        setGlyphs(SBOL);
    }

    res.render('index', {
        //   sboldata: sboldata,
        list: SBOL,
        placeholder: sboldata,
        glyphs: displayGlyphs

    });
});

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
        placeholder: placeholder

    });
});

const parser = (sbol, format) => {
    try {
        let data = getJSON(sbol);
        return API.setDocument(data, format);
    } catch (e) {
        throw new Error(`Parsing Error`);
    }
}

//TODO IF GLYPH DNA TYPE !== DNA THEN DONT GET GLYPH
function setGlyphs(components) {
    let glyphs = [];
    components.forEach((component) => {

        let glyph = [];
        component.forEach((itemValue) => {
            //update for multiple types
            if (itemValue.dna.includes("DNA")) {
                itemValue.items.forEach((item) => {

                    let details = {

                        type: item.type,
                        orientation: item.orientation,
                        name: item.id

                    };
                    glyph.push(details);
                });
            }
        });
        glyphs.push(glyph);
    });

    getGlyph(glyphs);

}


function getJSON(json) {
    try {
        return JSON.parse(json);
    } catch (e) {
        throw new Error(`Parsing Error`);
    }
}

function getGlyph(glyph) {
    if (glyph) {
        let URI = [];

        glyph.forEach((type) => {
            let tempURI = [];

            type.forEach((value) => {
                let getGlyph = value.type.toLowerCase();
                let getOrientation = value.orientation.toLowerCase();
                let typeValue = "";
                let orientationValue = "";
                switch (getGlyph) {
                    case "cds":
                        typeValue = "cds";
                        break;
                    case "promoter":
                        typeValue = "promoter";
                        break;
                    case "terminator":
                        typeValue = "terminator";
                        break;
                    case "rbs":
                        typeValue = "ribosome-entry-site";
                        break;
                    case "unspecified":
                        typeValue = "user-defined";
                        break;
                    case "gene":
                        typeValue = "user-defined";
                        break;
                    case "operator":
                        typeValue = "operator";
                        break;
                    case "engineered region": //TODO check
                        typeValue = "user-defined";
                        break;
                    default:
                        typeValue = "user-defined";
                }
                switch (getOrientation) {
                    case "inline":
                        orientationValue = " ";
                        break;
                    case "reverseComplement":
                        orientationValue = " antisense ";
                        break;
                    default:
                        console.error("not found");
                        break;
                }
                let structure = "sbolv" + orientationValue + typeValue;
                let display = {
                    name: value.name,
                    type: value.type,
                    glyph: structure
                };
                tempURI.push(display);
            });
            URI.push(tempURI);
        });
        displayGlyphs = URI;
    }

}

function setList(data) {
    SBOL = data;
    return data;
}

module.exports = router;

/*
POST recieved, data parsed to json.jsonld-ld format
data then sent through API.js to get correct glyph type
and other details relating to the glyph for the setList view
data sent back to parser where it will rendered in router request
and displayed in the correct locations, using the view engine.
Make repeatable


 */
