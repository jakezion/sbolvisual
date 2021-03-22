let express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    api = require('../public/javascripts/API');

let displayGlyphs = [];
let SBOL;
let list = [];

//placeholder for textarea
let placeholder = fs.readFileSync("./public/placeholder.json").toString();


router.use(express.urlencoded({extended: true}));

router.use(express.json());


router.post('/', (req, res) => {
    let sboldata = req.body.sboldata;
    let format = req.body.format;

    //  console.log(sboldata);
//if body data exists, then sync promise parse data and set list data
    if (sboldata !== undefined) {

        let components = parser(sboldata, format);
        //console.log(components); //tODO proper sort of components
        setGlyphs(components);
        setList(components);

    }

console.log(list);
    res.render('index', {
        sboldata: sboldata,
        list: list,
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
        let API = new api(data, format);
        return API.getComponents();
    } catch (e) {
        throw new Error(e);
    }
}

/* TODO works
const parser = (sbol, format) => {
    try {
        let data = getJSON(sbol);
        return API.setDocument(data, format);
    } catch (e) {
        throw new Error(e);
    }
}
 */

function setGlyphs(components) {
    let glyphs = [];
    //console.log("compoentns", components);
    components.forEach((component) => {
        let glyph = [];

        if (component.subcomponents.length !== 0) {
            //console.log(component);
            //console.log("range",component.subcomponents.start);
            let set = [];
            // if (set.length !== 0) {
            component.subcomponents.forEach((subcomponent) => {
                if (subcomponent.start && subcomponent.end !== undefined) {
                    let item = getComponent(components, subcomponent.instance);
                    if (item.type === "DNA") {
                        let details = {
                            type: item.glyph,
                            orientation: subcomponent.orientation,
                            name: item.name
                        };
                        glyph.push(details);
                    }
                }

                // console.log("set", set);
                // glyph.push(set);
            });
            //if (subcomponent.start && subcomponent.end !== undefined) {

            // let item = getComponent(components, subcomponent.instance);
            // // console.log("type",item.);
            // if (item.type === "DNA") {
            //     // console.log(item);
            //     let details = {
            //         type: item.glyph,
            //         orientation: subcomponent.orientation,
            //         name: item.name
            //     };
            //     glyph.push(details);
            // }
            // }
            //});
            // } else {

            // }
        }
        if (glyph.length !== 0) {
            glyphs.push(glyph);
        }


    });
    //console.log("glyph", glyphs);
    /* if (glyphs.length === 0) {
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

     }*/
    //console.log("glyphs",glyphs);
    getGlyph(glyphs);

}

function getComponent(map, key) {
    let component = map.get(key);
    //console.log(component);
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


function getJSON(json) {
    try {
        return JSON.parse(json);
    } catch (e) {
        throw new Error(e);
    }
}

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

function setList(data) {
  //  let temp = data;
//let val = temp;
   // temp.forEach(x => console.log("before",x));
let count =0;

    data.forEach((component) => {
        let subcomponents = [];
        let count2 = 0;
        if (component.subcomponents.length !== 0) {

            component.subcomponents.forEach((subcomponent) => {
                //console.log(getComponent(data,subcomponent));
                subcomponents.push(getComponent(data, subcomponent.instance));
                count++;
            });

            component.subcomponents.length = 0;
            component.subcomponents = subcomponents.slice(0);


        }

        list.push([component,count]);
        count++;
    });
//
  //  val.forEach(x => console.log("x",x));
   // return val;
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
