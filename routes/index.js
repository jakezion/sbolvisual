let express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    api = require('../public/javascripts/API');


//initialise arrays
let displayGlyphs = [];
let list = [];

//placeholder for textarea
let placeholder = fs.readFileSync("./public/placeholder.json").toString();


router.use(express.urlencoded({extended: true}));

router.use(express.json());

//render of get request for index page
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

//route for post requests on index page
router.post('/', (req, res) => {

    //data being sent by user
    let sboldata = req.body.sboldata;

    //data format for XML
    let format = req.body.format;

    //if body data exists, then sync promise parse data and set list data
    if (sboldata !== undefined) {
        try {
            let components = parser(sboldata, format);
            setGlyphs(components);
            setList(components);
        } catch (e) {
            //redirects back to index page if erroneous data is entered on input
            res.redirect('/');

        }

    }

    //actual data being rendered from post
    res.render('index', {
        description: 'SBOL Visual Homepage',
        language: 'en-GB',
        data: {author: 'Jake Sumner', university: 'Keele University'},
        title: 'SBOL Visual',
        tagline: 'SBOL Visual is a web-based visualisation tool',
        keywords: ['SBOL', 'Visualisation', 'Synthetic Biology', 'SBOL v3', 'Glyph Creator'],
        copyright: 'Jake Sumner &copy; 2020',
        sboldata: sboldata,
        list: list,
        placeholder: sboldata,
        glyphs: displayGlyphs
    });


});



/*
    parser of sbol data and its format to the API,
    where it will be organised by position and all
    related attributes of each component in a sequence will be gathered
 */
const parser = (sbol, format) => {
    try {
        const API = new api(getJSON(sbol), format);
        return API.getComponents();
    } catch (e) {

        throw new Error(e);
    }
}

/*
* sets glyphs from returned components
* by adding a type, orientation and name attribute
* for each component to be displayed
 */
function setGlyphs(components) {
    let glyphs = [];

    components.forEach((component) => {
        let glyph = [];

        if (component.subcomponents.length !== 0) {
            let set = [];

            component.subcomponents.forEach((subcomponent) => {
                if (subcomponent.start && subcomponent.end !== undefined) {

                    let item = getComponent(components, subcomponent.instance);

                    /*
                    * currently only handles DNA data as RNA,etc.
                    * require a different method of determining
                    * if it needs to be displayed
                    */

                    if (item.type === "DNA") {
                        let details = {
                            type: item.glyph,
                            orientation: subcomponent.orientation,
                            name: item.name
                        };
                        glyph.push(details);
                    }
                }
            });
            //displays individual components
        } else if (components.size === 1) {
            let details = {
                type: component.glyph,
                orientation: component.orientation,
                name: component.name
            };
            glyph.push(details);
        }

        if (glyph.length !== 0) {
            glyphs.push(glyph);
        }


    });

    getGlyph(glyphs);

    //check if sequences doesnt contain any subcomponents and then displays them.
    /*
     if (glyphs.length === 0) {
         components.forEach((component) => {
             // console.log("comp",component);
             if (component.type === "DNA") {
                 let details = {
                     type: component.glyph,
                     orientation: component.orientation,
                     name: component.name
                 };
                 glyphs.push(details);
             }

         });

     }
     */

}

/*
* gets all attributes of a given component
 */
function getComponent(map, key) {

    let component = map.get(key);

    return {

        displayID: component.displayID,
        description: component.description,
        role: component.role,
        orientation: component.orientation,
        sequence: component.sequence,
        type: component.type,
        name: component.name,
        glyph: component.glyph

    };
}

//parses the json data sent from the browser for use
function getJSON(json) {
    try {
        return JSON.parse(json);
    } catch (e) {
        throw new Error(e);
    }
}

/*
* gets the glyph based on a components type to allow it to be displayed in the browser
* if correct glyph doesnt exist then a user-defined glyph is used (template glyph)
 */
function getGlyph(glyph) {
    if (glyph) {
        let URI = [];
        glyph.forEach((type) => {
            let tempURI = [];
            // console.log(type);
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

//sets the list for the list view in the browser
function setList(data) {

    let count = 0;
    list.length = 0;
    data.forEach((component) => {
        let subcomponents = [];
        let count2 = 0;
        if (component.subcomponents.length !== 0) {

            component.subcomponents.forEach((subcomponent) => {

                subcomponents.push(getComponent(data, subcomponent.instance));
                count++;

            });

            component.subcomponents.length = 0;
            component.subcomponents = subcomponents.slice(0);

        }

        list.push([component, count]);
        count++;
    });

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
