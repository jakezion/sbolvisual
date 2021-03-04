const express = require('express'),
    ParserJsonld = require('@rdfjs/parser-jsonld'),
    Readable = require('stream').Readable,
    //java = require('java'),
    router = express.Router(),
    http = require("http");
const API = require('../public/javascripts/API');


// detailed = false;
// JsonLdParser = require('jsonld-streaming-parser').JsonLdParser,
// jsonParser = new JsonLdParser(),
// jsonld = require('jsonld'),

let SBOL;
let list = [];
/*TODO: setup maven for nodejs, then import the libSBOLj3 dependency then use node java to set up link */

router.use(express.urlencoded({extended: true}));

router.use(express.json());
router.post('/', (req, res) => {
    let sboldata = req.body.sboldata;

    if (sboldata !== undefined) {

        parser(sboldata)
            .then(graph => setList(graph))
            .catch(function (e) {
                console.error(e.message);
            })
    }

    res.render('index', {
        sboldata: sboldata, //TODO: proper json.jsonld stringify
        list: list
    });
});

router.all('/', (req, res) => {

    res.setHeader('Cache-Control', 'no-cache');

    res.render('index', {
        description: 'SBOL Visual Homepage',
        language: 'en-GB',
        data: {author: 'Jake Sumner', university: 'Keele University'},
        title: 'SBOL Visual',
        tagline: 'SBOL Visual is a web-based visualisation tool',
        keywords: ['SBOL', 'Visualisation', 'Synthetic Biology', 'SBOL v3', 'Glyph Creator'],
        copyright: 'Jake Sumner &copy; 2020',
        //sboldata: JSON.stringify(SBOL), //TODO: proper json.jsonld stringify
        // textarea: res.sendFile(__dirname + '/public/java/libSBOLj3/output/entity/collection/collection.jsonld') //fix

        //send array setList with setList data that then uses the built in loop system of ECTjs to parse the data into their own cards
    });

    // res.end(json.jsonld);


});



//console.log(API);

/*
TODO: need to parse context in as well
   add to array and call array whilst adding to context, reform json.jsonld data and then send through formatter
   if typeof context set context to this value
   if typeof graph, for each send through parser with given context
   console log to check
*/

const parser = async (sbol) => {

    try {


        let data = await getJSON(sbol);
        let context = await getContext(data);
        let graph = await getGraph(data);

        //  let api = new API();
        API.setDocument(context, graph, data);

        return graph;
        //const APIInstance = new API();
        // APIInstance.run();
        //  return {co: context, gr: graph};

    } catch (e) {
        throw new Error(`Parsing Error`);
    }
}

function getJSON(json) {
    try {
        return JSON.parse(json);
    } catch (e) {
        throw new Error(`Parsing Error`);
    }
}


function getContext(object) {
    if (typeof object['@context'] === 'object') { //gets context
        return object['@context'];
        //Object.keys(object['@graph']).forEach((prefix) => {
        //  this.emit('prefix', prefix, this.factory.namedNode(object['@context'][prefix])); //fix
        // })
    }
}

function getGraph(object) {

    if (typeof object['@graph'] === 'object') { //gets context
        return object['@graph'];
        //return object['@graph']; //promise wait for context then run formatter

    }
}

function getGlyph(glyph, val) {
    if (val === 'role') {
        return "http://synbiodex.github.io/SBOL-visual/Glyphs/FunctionalComponents/" + glyph + "/" + glyph + ".png";
    } else if (val === 'type') {
        return "http://synbiodex.github.io/SBOL-visual/Glyphs/FunctionalComponents/" + glyph + "/" + glyph + ".png";
    }

}

function setValue(value, attribute) {
    if (attribute === "DisplayID") {
        return value;
    } else if (attribute === "Description") {
        return value;
    } else if (attribute === "Elements") {
        return value;
    }else if (attribute === "Type") {
        return value;
    }else if (attribute === "Role") {
        return value;
    }

}


function formatter(context, data) {
    const parserJsonld = new ParserJsonld({
        context: context
    });
    let dataArray = {};

    const input = new Readable({
        read: () => {
            input.push(data);
            input.push(null);
        }
    });
    const output = parserJsonld.import(input);

    output.on('data', sbol => {
        console.log(sbol); //TODO: find way to group subject

        // setValue(sbol.predicate," : ",sbol.object);
        //  console.log(sbol.predicate," : ",sbol.object);
        dataArray[sbol.predicate.value] = sbol.object.value; //find correct grouping

        // setList(false, dataArray);

    });
}

function setList(data) {
    list.length = 0;
    //console.log('\n');
    //  if (!detailed) {


    for (const set of data) {
        let tempList = {};
       // console.log(set);
        //gets each dataset
        if (set.hasOwnProperty('displayId')) {
           tempList["display"] = setValue(set['displayId'], "DisplayID");
       //    tempList["id"] = "https://synbiohub.org/public/igem/" +tempList["display"];
        }
        if (set.hasOwnProperty('description')){
            tempList["description"] = setValue(set['description'], "Description");
        }

        if (set.hasOwnProperty('elements')) {
            tempList["elements"] = setValue(set['elements'], "Elements");
        }

        if (set.hasOwnProperty('role')) {
            tempList["role"] = setValue(set['role'], "Role");
            tempList["roleGlyph"] = getGlyph(set['role'], 'role');
        }
        if (set.hasOwnProperty('type')) {
            tempList["type"] = setValue(set['type'], "Type");
            tempList["typeGlyph"] = getGlyph(set['type'], 'type');
        }
        // if(data[set].hasOwnProperty()){}
        //console.log('\n');
      //  console.log(tempList);
        list.push(tempList);

    }
    //console.log(list);
    // } else if (detailed) {
    /* for (let set in data) {
         try {
             if (data[set].hasOwnProperty('role')) setValue(data[set]['role'], "Role");
             if (data[set].hasOwnProperty('type')) setValue(data[set]['type'], "Type");
         } catch (e) {
             throw new Error(`parse err`);
         }
     }*/
    //     }
    SBOL = data; //TODO: FIX
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
