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

/*TODO: setup maven for nodejs, then import the libSBOLj3 dependency then use node java to set up link */

router.use(express.urlencoded({extended: true}));

router.use(express.json());

router.all('/', (req, res) => {

    let sboldata = req.body.sboldata;



    if (sboldata !== undefined)
        parser(sboldata)
        // .then(parsed => console.log(parsed.co, parsed.gr))//test
        //if setGlyph then formatter, setGlyph, otherwise just setList
        // .then(data => formatter())
       // .then(data => setList(data.gr))
        .catch(function (e) {
            console.error(e.message);
        })



    res.setHeader('Cache-Control', 'no-cache');

    res.render('index', {
        description: 'SBOL Visual Homepage',
        language: 'en-GB',
        data: {author: 'Jake Sumner', university: 'Keele University'},
        title: 'SBOL Visual',
        tagline: 'SBOL Visual is a web-based visualisation tool',
        keywords: ['SBOL', 'Visualisation', 'Synthetic Biology', 'SBOL v3', 'Glyph Creator'],
        copyright: 'Jake Sumner &copy; 2020',
        //sboldata: JSON.stringify(SBOL), //TODO: proper json stringify
        sboldata: sboldata, //TODO: proper json stringify
       // textarea: res.sendFile(__dirname + '/public/java/libSBOLj3/output/entity/collection/collection.jsonld') //fix

        //send array setList with setList data that then uses the built in loop system of ECTjs to parse the data into their own cards
    });

   // res.end(json);


});

//console.log(API);

/*
TODO: need to parse context in as well
   add to array and call array whilst adding to context, reform json data and then send through formatter
   if typeof context set context to this value
   if typeof graph, for each send through parser with given context
   console log to check
*/

const parser = async (sbol) => {

    try {



        let data = await getJSON(sbol);
        let context = await getContext(data);
        let graph = await getGraph(data);


        API.setDocument(context,graph);

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
        context = object['@context'];
        return context;
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
    switch (val) {
        case 'role':
            //console.log("Role glyph: ", glyph);
            break;
        case 'type':
            //console.log("Type glyph: ", glyph);
            break;

    }

}

function setValue(value, attribute) {
   // console.log(attribute, ": ", value);

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
    //console.log('\n');
    //  if (!detailed) {
    for (let set in data) {
        //gets each dataset
        if (data[set].hasOwnProperty('displayId')) setValue(data[set]['displayId'], "DisplayID");
        if (data[set].hasOwnProperty('description')) setValue(data[set]['description'], "Description");
        if (data[set].hasOwnProperty('elements')) setValue(data[set]['elements'], "Elements");

        if (data[set].hasOwnProperty('role')) {
            setValue(data[set]['role'], "Role");
            getGlyph(data[set]['role'], 'role');
        }
        if (data[set].hasOwnProperty('type')) {
            setValue(data[set]['type'], "Type");
            getGlyph(data[set]['type'], 'type');
        }

        //console.log('\n');
    }

    // } else if (detailed) {
    for (let set in data) {
        try {
            if (data[set].hasOwnProperty('role')) setValue(data[set]['role'], "Role");
            if (data[set].hasOwnProperty('type')) setValue(data[set]['type'], "Type");
        } catch (e) {
            throw new Error(`parse err`);
        }
    }
    //     }
    SBOL = data; //TODO: FIX
}


module.exports = router;

/*
POST recieved, data parsed to json-ld format
data then sent through API.js to get correct glyph type
and other details relating to the glyph for the setList view
data sent back to parser where it will rendered in router request
and displayed in the correct locations, using the view engine.
Make repeatable


 */
