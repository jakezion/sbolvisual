//const index = require("./routes/index");

const fs = require('fs');
const java = require('java');
const mvn = require('node-java-maven');
//const Util = require('util');
//const EventEmitter = require('events').EventEmitter;
//const ChildProc = require('child_process');
//console.log(typeof index); // => 'function'
//let context;

java.classpath.push("./public/libSBOLj3.jar");

mvn(function (err, mvnResults) {
    if (err) {
        return console.error('could not resolve maven dependencies', err);
    }
    mvnResults.classpath.forEach(function (c) {
        // console.log('adding ' + c + ' to classpath');
        //console.log("\n");
        java.classpath.push(c);
    });
});

java.asyncOptions = {
    asyncSuffix: undefined,     // Don't generate node-style methods taking callbacks
    syncSuffix: "_",              // Sync methods use the base name(!!)
    promiseSuffix: "Promise",   // Generate methods returning promises, using the suffix Promise.
    promisify: require('util').promisify // Needs Node.js version 8 or greater, see comment below
};


//class API {


// setIdentified = (ident) => {
// }
//
// getRoles = (XO) => {
//     let search = XO.replace(["SO:", "GO:"], "");
//     // let search2 = XO.replace("GO:", "");
//     console.log(search)
//     switch (search) {
//         case "0000167":
//             //Promoter
//             break;
//         case "0000139":
//             //RBS
//             break;
//         case "0000316":
//             //CDS
//             break;
//         case "0000141":
//             //Terminator
//             break;
//         case "0000704":
//             //Gene
//             break;
//         case "0000057":
//             //Operator
//             break;
//         case "0000704":
//             //EngineeredGene
//             break;
//         case "0000234":
//             //mRNA
//             break;
//         case "35224":
//             //Effector
//             break;
//         case "0003700":
//             //TF
//             break;
//         case "0000289":
//             //FunctionalCompartment
//             break;
//         case "0000290":
//             //PhysicalCompartment
//             break;
//         default:
//             break;
//     }
// }
//
// dataModel = (data) => {
//     switch (data) {
//         case "Identified":
//
//     }
// }
//
// getData = () => {
//     fs.readFile("./public/json.jsonld", function (err, json) {
//         if (err) return console.error(err);
//         return json.toString();
//     });
//
// }
//
// storeData = (json) => {
//     try {
//         fs.writeFileSync("./public/json.jsonld", JSON.stringify(json));
//     } catch (e) {
//         console.error(e);
//     }
// }
// componentType = (SBO) => {
//         let search = SBO.replace("SBO:", "");
//         console.log(search);
//         switch (search) {
//             case "0000251":
//                 //DNA
//                 break;
//             case "0000250":
//                 //RNA
//                 break;
//             case "0000252":
//                 //Protein
//                 break;
//             case "0000247":
//                 //SimpleChemical
//                 break;
//             case "0000253":
//                 //NoncovalentComplex
//                 break;
//             case "0000241":
//                 //FunctionalEntity
//                 break;
//             case "0005623":
//                 //Cell
//                 break;
//             default:
//                 break;
//         }
//     }
// interactionType = (SBO) => {
//     let search = SBO.replace("SBO:", "");
//     console.log(search);
//     switch (search) {
//         case "000169":
//             // Inhibition
//             break;
//         case "0000170":
//             //Stimulation
//             break;
//         case "0000176":
//             //BiochemicalReaction
//             break;
//         case "0000177":
//             //NonCovalentBinding
//             break;
//         case "0000179":
//             //Degradation
//             break;
//         case "0000589":
//             //GeneticProduction
//             break;
//         case "0000168":
//             //Control
//             break;
//         default:
//             break;
//     }
// }
// setDocument = (context, graph, data) => {
//     // console.log(java.isJvmCreated());
//
//     //console.log(context);
//     let json = JSON.stringify(data);
//
//
//     let SBOLDocument = java.import("org.sbolstandard.entity.SBOLDocument");
//     let ComponentType = java.import("org.sbolstandard.vocabulary.ComponentType");
//     let Role = java.import("org.sbolstandard.vocabulary.Role");
//     let Arrays = java.import("java.util.Arrays");
//     let List = java.import("java.util.ArrayList")
//     //let SBOLIO = java.newInstanceSync("org.sbolstandard.io.SBOLIO");
//     let SBOLIO = java.import("org.sbolstandard.io.SBOLIO");
//     let File = java.import("java.io.File");
//     let SBOLAPI = java.import("org.sbolstandard.api.SBOLAPI");
//     let identified = java.import("org.sbolstandard.entity.Identified");
//     let component = java.import("org.sbolstandard.entity.Component");
//     let URI = java.import("java.net.URI");
//     //let testUtil = java.import("org.sbolstandard.TestUtil");
//     try {
//         let ArrayList = new List();
//         let uri = new URI("");
//         let API = new SBOLAPI();
//         let io = new SBOLIO();
//         // let base = URI.create_("https://synbiohub.org/public/igem/"); //TODO: REMOVE BASE URI AND SEND A FILE INSTEAD FOR DOCUMENT IN SBOLIO
//         let base = URI.create_(""); //TODO: REMOVE BASE URI AND SEND A FILE INSTEAD FOR DOCUMENT IN SBOLIO
//
//         let doc = new SBOLDocument(base);
//
//
//         this.storeData(data);
//         let file = new File(this.getData());
//         let test3 = SBOLIO.write_(doc, file, "JSON-LD"); //TODO CHECK
//         // let test3 = SBOLIO.write_(doc, "JSON-LD"); //TODO CHECK
//         let test = SBOLIO.read_(test3, "JSON-LD");
//
//         //console.log("util",util);
//         console.log("test3", test3);
//         console.log("test3", test3);
//         console.log("test", test);
//         // console.log("test4", test4);
//
//         //-------------------------------------------//
//
//         //-------------------------------------------//
//
//
//         //-------------------------------------------//
//         let comptest = java.newArray("org.sbolstandard.entity.Component", []);
//         let components = test.getIdentifieds_("?identified a sbol:Component; sbol:type SBO:0000251 .", component);
//         //let components = java.callMethodSync(test, "getIdentifieds", "?identified a sbol:Component; sbol:role  GO:0003700; sbol:type SBO:0000252 .", component);
//         console.log("Graph query results:");
//         for (let i = 0; i < components.size_(); i++) {
//             comptest.add_(v);
//             console.log("Components", comptest.toString_());
//         }
//         // console.log("compon" ,components);
//
//         console.log("Doc: ", components.size_());
//         console.log("n");
//
//
//     } catch (e) {
//         console.log(e);
//     }
//
// }

//}


module.exports = {
    setIdentified: (ident) => {
    },

    dataModel: (data) => {
        switch (data) {
            case "Identified":
                break;
            case "TopLevel":
                break;
            case "Feature":
                break;
            case "Component":
                break;
            case "Sequence":
                break;
            case "SubComponent":
                break;
        }
    },

    getRoles: (XO) => {
        let search = XO.replace(["SO:", "GO:"], "");
        // let search2 = XO.replace("GO:", "");
        console.log(search)
        switch (search) {
            case "0000167":
                //Promoter
                break;
            case "0000139":
                //RBS
                break;
            case "0000316":
                //CDS
                break;
            case "0000141":
                //Terminator
                break;
            case "0000704":
                //Gene
                break;
            case "0000057":
                //Operator
                break;
            case "0000704":
                //EngineeredGene
                break;
            case "0000234":
                //mRNA
                break;
            case "35224":
                //Effector
                break;
            case "0003700":
                //TF
                break;
            case "0000289":
                //FunctionalCompartment
                break;
            case "0000290":
                //PhysicalCompartment
                break;
            default:
                break;
        }
    },
    storeData: (json) => {
        try {
            fs.writeFileSync("./public/json.jsonld", JSON.stringify(json));
        } catch (e) {
            console.error(e);
        }
    },

    getData: () => {
        fs.readFile("./public/json.jsonld", function (err, json) {
            if (err) return console.error(err);
            return json.toString();
        });

    },
    setDocument: (context, graph, data) => {

        function getRoles(so) {
            let search = so.toString().replace("SO:", "");
            // let search2 = XO.replace("GO:", "");
            // console.log(search);
            if (search === "0000167") {
                return "Promoter";
            } else if (search === "0000139") {
                return "RBS";
            } else if (search === "0000316") {
                return "CDS";
            } else if (search === "0000141") {
                return "Terminator";
            } else if (search === "0000704") {
                return "Gene";
            } else if (search === "0000057") {
                return "Operator";
            } else if (search === "0000704") {
                return "EngineeredGene";
            } else if (search === "0000234") {
                return "mRNA";
            } else if (search === "35224") {
                return "Effector";
            } else if (search === "0003700") {
                return "TF";
            } else if (search === "0000289") {
                return "FunctionalCompartment";
            } else if (search === "0000290") {
                return "PhysicalCompartment";
            }
        }

        function componentType(sbo) {
            let search = sbo.toString().replace("SBO:", "");
            //console.log(search);
            if (search === "0000251") {
                return "DNA";
            } else if (search === "0000250") {
                return "RNA";
            } else if (search === "0000252") {
                return "Protein";
            } else if (search === "0000247") {
                return "SimpleChemical";
            } else if (search === "0000253") {
                return "NoncovalentComplex";
            } else if (search === "0000241") {
                return "FunctionalEntity";
            } else if (search === "0005623") {
                return "Cell";
            }
        }

        function interactionType(sbo) {
            // console.log(sbo);
            let search = sbo.toString().replace("SBO:", "");
            //  console.log(search);
            if (search === "000169") {
                return "Inhibition";
            } else if (search === "0000170") {
                return "Stimulation";
            } else if (search === "0000176") {
                return "BiochemicalReaction";
            } else if (search === "0000177") {
                return "NonCovalentBinding";
            } else if (search === "0000179") {
                return "Degradation";
            } else if (search === "0000589") {
                return "GeneticProduction";
            } else if (search === "0000168") {
                return "Control";
            } else {
                return "";
            }
        }

        // console.log(java.isJvmCreated());

        //console.log(context);
        let json = JSON.stringify(data);


        let SBOLDocument = java.import("org.sbolstandard.entity.SBOLDocument");
        let ComponentType = java.import("org.sbolstandard.vocabulary.ComponentType");
        let Role = java.import("org.sbolstandard.vocabulary.Role");
        let Arrays = java.import("java.util.Arrays");
        let List = java.import("java.util.ArrayList")
        //let SBOLIO = java.newInstanceSync("org.sbolstandard.io.SBOLIO");
        let SBOLIO = java.import("org.sbolstandard.io.SBOLIO");
        let File = java.import("java.io.File");
        let SBOLAPI = java.import("org.sbolstandard.api.SBOLAPI");
        let identified = java.import("org.sbolstandard.entity.Identified");
        let component = java.import("org.sbolstandard.entity.Component");
        let URI = java.import("java.net.URI");
        //let testUtil = java.import("org.sbolstandard.TestUtil");
        try {
            let ArrayList = new List();
            let uri = new URI("");
            let API = new SBOLAPI();
            let io = new SBOLIO();
            let base = URI.create_("https://synbiohub.org/public/igem/"); //TODO: REMOVE BASE URI AND SEND A FILE INSTEAD FOR DOCUMENT IN SBOLIO
            //let base = URI.create_(""); //TODO: REMOVE BASE URI AND SEND A FILE INSTEAD FOR DOCUMENT IN SBOLIO

            // let doc = new SBOLDocument(base);

            //let arruri = List(Arrays.asList_(ComponentType.DNA.getUrl_()));
            //console.log(arruri);
            //let TetR_protein = doc.createComponent_("TetR_protein", arruri);

            // let apiAdd = SBOLAPI.append_("test",json);
            // console.log(apiAdd);
            // TetR_protein.setName_("TetR_protein");
            // TetR_protein.setDescription_("Test");
            //TetR_protein.setRoles_(Arrays.asList(Role.RBS));
            // let maker = SBOLAPI.appendComponent_(doc, device,rbs,Orientation.inline);
            //fs.writeFile('./public/json.jsonld', '', function () {console.log('done')});


            fs.writeFileSync("./public/javascripts/LD.jsonld", "");
            fs.writeFileSync("./public/javascripts/LD.jsonld", json);

            let fileWrite = new File("public/javascripts/write.jsonld");
            let fileRead = new File("public/javascripts/LD.jsonld");

            let ModelFactory = java.import("org.apache.jena.rdf.model.ModelFactory");
            let InputStream = java.import("java.io.FileInputStream");
            let is = new InputStream(fileRead);
            let modelFactory = ModelFactory.createDefaultModel_();
            let model = modelFactory.read_(is, "https://synbiohub.org/public/igem/", "JSON-LD");
            let doc = new SBOLDocument(model);
            //TODO CREATE DATA OBJECT THAT SENDS COMPONENTS OBJECT FOR GLYPH VIEW AND INTERACTIONS OBJECT FOR LIST VIEW
            //TODO CREATE DATA OBJECT THAT SENDS COMPONENTS OBJECT FOR GLYPH VIEW AND INTERACTIONS OBJECT FOR LIST VIEW
            //TODO CREATE DATA OBJECT THAT SENDS COMPONENTS OBJECT FOR GLYPH VIEW AND INTERACTIONS OBJECT FOR LIST VIEW
            //TODO CREATE DATA OBJECT THAT SENDS COMPONENTS OBJECT FOR GLYPH VIEW AND INTERACTIONS OBJECT FOR LIST VIEW
            //TODO CREATE DATA OBJECT THAT SENDS COMPONENTS OBJECT FOR GLYPH VIEW AND INTERACTIONS OBJECT FOR LIST VIEW

            let components = {};

            let interactions = [];


            //console.log(doc.getTopLevelResourceTypes_().toString_());
            // console.log(componentData);

            //getComponents(doc);

            function getComponentList(doc) {
                let componentsData = doc.getComponents_();
                if (componentsData && !(componentsData instanceof URI)) { //&& componentsData.getURI_()
                    // getDisplayComponents(doc);
                }
            }

            return getComponents(doc);
            //console.log(comps);


            //let comptest = java.newArray("org.sbolstandard.entity.Component", []);
            //let componentIdentified = doc.getIdentifieds_("?identified a sbol:Component; sbol:role GO:0003700; sbol:type SBO:0000252 .", component);
            //let components = java.callMethodSync(test, "getIdentifieds", "?identified a sbol:Component; sbol:role  GO:0003700; sbol:type SBO:0000252 .", component);
            //console.log("Graph query results:");
            /*for (let i = 0; i < components.size_(); i++) {
                comptest.add_(v);
                console.log("Components", comptest.toString_());
            }*/
            // console.log("compon" ,components);
            //console.log("Doc: ", components.size_());
            //console.log("n");


            function sortComponents() {
                for (let x = 0; x < doc.getComponents_().size_(); x++) {
                    let found = false;
                    let componentData = doc.getComponents_().get_(x);
                    for (let x in componentData) {

                    }
                }

            }

            function getComponents(doc) {
                let mainComponents = [];

                let features = [];
                // let instances;

                for (let x = 0; x < doc.getComponents_().size_(); x++) { //TODO CHECK AND REMOVE
                    let component = doc.getComponents_().get_(x);
                    // console.log("component", component);
                    //  console.log("component string", component.getName_());
                    // console.log(component.getSubComponents_());
                    component.getSubComponents_() ? features.push(component.getSubComponents_()) : "invalid";
                    component.getComponentReferences_() ? features.push(component.getComponentReferences_()) : "invalid";
                    component.getLocalSubComponents_() ? features.push(component.getLocalSubComponents_()) : "invalid";
                    component.getExternallyDefineds_() ? features.push(component.getExternallyDefineds_()) : "invalid";
                    component.getSequenceFeatures_() ? features.push(component.getSequenceFeatures_()) : "invalid";
                    //ALSO WORKS component.getSubComponents_() ? console.log("role intergration",component.getSubComponents_()) : "no role intergration";
                }

                for (let i in features) {
                    let tempComponents = [];
                    //console.log("temp before",tempComponents);
                    //console.log("features[i]:", features[i]);
                    for (let j = 0; j < features[i].size_(); j++) {
                       // console.log(j);
                        let instance = features[i].get_(j);
                       // console.log("instinace", instance);
                        let instanceOf = instance.getIsInstanceOf_() ? instance.getIsInstanceOf_() : "invalid";


                        //TODO IMPORTANT ------- TODO IMPORTANT ------- TODO IMPORTANT ------- TODO IMPORTANT ------- TODO IMPORTANT -------
                        // FIND IF ORIENTATION IS SET AND ASSIGN IT TO THE CURRENT FEATURE IN THE OBJECT, THEN PASS THE ORIENTATION
                        // TO THE GET DISPLAY COMPONENTS FOR USE

                        let orientation = instance.getOrientation_() ? instance.getOrientation_().toString_() : null;

                        tempComponents.push([instanceOf,orientation]);
                        //console.log(orientation);
                       /* for(let i in instance){
                            console.log(instance[i]);
                            //console.log(instance[i].orientation ? "orientation set" : "invalid");
                        }*/

                        //console.log("instance of", tempComponents[j].toString_());
                        //TODO IMPORTANT ------- TODO IMPORTANT ------- TODO IMPORTANT ------- TODO IMPORTANT ------- TODO IMPORTANT -------
                        //TODO IMPORTANT ------- TODO IMPORTANT ------- TODO IMPORTANT ------- TODO IMPORTANT ------- TODO IMPORTANT -------
                        //TODO IMPORTANT ------- TODO IMPORTANT ------- TODO IMPORTANT ------- TODO IMPORTANT ------- TODO IMPORTANT -------
                        //TODO IMPORTANT ------- TODO IMPORTANT ------- TODO IMPORTANT ------- TODO IMPORTANT ------- TODO IMPORTANT -------
                        //TODO IMPORTANT ------- TODO IMPORTANT ------- TODO IMPORTANT ------- TODO IMPORTANT ------- TODO IMPORTANT -------
                        //TODO IMPORTANT ------- TODO IMPORTANT ------- TODO IMPORTANT ------- TODO IMPORTANT ------- TODO IMPORTANT -------
                    }
                   // console.log(tempComponents);
                    mainComponents.push(tempComponents);
                }
                //console.log("main",mainComponents);
                let allComponents = uriToComponents(doc, mainComponents);
                //console.log("all comps",allComponents);
                //TODO CALL ALL COMPONENTS HERE AND CHECK PER INSTANCE TO PRE GET COMPONENTS
                // console.log("tempAfter", tempComponents[i].toString_());

                return getDisplayComponents(doc, allComponents);
                // mainComponents.push(features);
                //console.log("Main comp", mainComponents);

            }

            function exists(arr, search) {
                return arr.some(row => row.includes(search));
            }

            function uriToComponents(doc, componentURI) {
                let allComponents = [];
                let search = [];

                for (let j = 0; j < doc.getComponents_().size_(); j++) {
                    let instanceComponent = doc.getComponents_().get_(j);
                    let instance = doc.getComponents_().get_(j).getDisplayId_();
                    search.push([instanceComponent, instance]);
                }

                for (let i in componentURI) {
                   // console.log("[i]",componentURI[i]);
                    let components = [];
                    for (let j in componentURI[i]) {
                       // console.log("[j]",componentURI[i][j]);
                        let searchURI = componentURI[i][j][0].toString_();
                        let orientation = componentURI[i][j][1];
                        let componentQuery = searchURI.replace(/https:\/\/synbiohub.org\/public\/igem\//g, "");
                        //console.log("component id", search);

                        // console.log(components);
                        // get individual ids
                        // console.log("search",search);
                        //console.log("component uri", componentQuery); //ARRAY SEARCH URI BASED ON IDS

                        if (exists(search, componentQuery)) {
                            // if (search[j][1].includes(componentQuery)) {
                            //console.log("Match");
                            let componentPosition = search.findIndex(row => row.includes(componentQuery));
                            //console.log("position",componentPosition);
                            //let componentPosition = search[j][search.indexOf(componentQuery)];
                            //console.log("position", componentPosition);
                           // console.log(orientation);
                            let componentFound = search[componentPosition][0];
                            //console.log(componentFound);
                          //TODO WORKS  components.push(search[componentPosition][0]);
                            components.push([componentFound,orientation]);

                        }
                        // console.log("components",components);
                        //console.log("uri",componentURI);
                        //console.log("clipped",componentQuery);
                    }
                    //TODO GET COMPONENTS ACTUAL COMPONENT BASED ON ITS NAME
                    allComponents.push(components);
                }
                // console.log("all components",allComponents);
                return allComponents;
            }


            function getDisplayComponents(doc, displayComponents) {
                let components = [];

                // console.log("display comps",displayComponents);
                for (let i in displayComponents) {
                    let component = [];
                    // console.log("display comps i",displayComponents[i]);
                    // console.log("display comps just i",i);
                    for (let j = 0; j < displayComponents[i].length; j++) {
                        //console.log(displayComponents[i]);
                        // for (let j in displayComponents[i]) {
                        let componentData = displayComponents[i][j][0];
                        let orientation = displayComponents[i][j][1];

                       // console.log(orientation);

//TODO for component data query and find component based on uri
                        // sortComponents();
                        let displayId = componentData.getDisplayId_();
                        let types = componentData.getTypes_();
                        let topologies = [];

                        //DNA Checker
                        let isDNA = "";
                        if (types) {
                            for (let y = 0; y < types.size_(); y++) {
                                let formatType = types.get_(y).toString_().replace(/https:\/\/identifiers.org\//g, "");
                                let sbo = (formatType).match(/SBO.([0-9]+)/g);
                                if (!sbo || !sbo.length) return
                                let type = componentType(sbo);
                                isDNA = type;
                                if (type) {
                                    if (isDNA === "DNA") {
                                        topologies.push(type);
                                    } else {
//TODO -----------------------------------------
                                    }
                                }
                            }
                        }
                        //console.log("\n");
                        //console.log(isDNA);
                        // console.log("^");

                        if (isDNA === "DNA") { //TODO CHECK componentData.sequenceAnnotations.length === 0 &&  === 0
                            // console.log("reached DNA");
                            let glyph = 'unspecified';
                            displayId = componentData.getName_() === null ? componentData.getDisplayId_() : componentData.getName_();
                            let roles = componentData.getRoles_();

                            let details = 'Component: \n';
                            if (displayId) details += 'Name:' + displayId + '\n';

                            if (roles) {
                                for (let i = 0; i < roles.size_(); i++) {
                                    let role = roles.get_(i).toString_();
                                    let formatRole = role.replace(/https:\/\/identifiers.org\//g, "");
                                    let so = (formatRole).match(/SO.([0-9]+)/g);
                                    if (!so || !so.length) return
                                    let roleGlyph = getRoles(so);
                                    //console.log(roleGlyph);

                                    if (isDNA === "DNA") {
                                        roleGlyph ? glyph = roleGlyph : glyph = 'unspecified';
                                    }
                                }
                            }

                          //TODO  let orientation =  componentData.orientation ? "inline" : "reverseComplement"

                            component.push({
                                name: displayId,
                                idURI: "https://synbiohub.org/public/igem/" + componentData.getDisplayId_(),
                                items: [{
                                    orientation: orientation,
                                    type: glyph,
                                    id: componentData.getDisplayId_(),
                                    name: displayId,
                                    tooltip: details,
                                    isComposite: false

                                }],
                                topologies: topologies
                            });
                        }


                        // console.log("in loop component:", component);

                        // console.log(topologies);
                        // console.log(displayId);
                        /*
                                            return {
                                                idName: displayId,
                                                idURI: componentData.getURI_().toString(),
                                                items: () => {
                                                    let glyph = 'unspecified';

                                                     let displayId = componentData.getName_() === '' ? componentData.getDisplayId_() : componentData.getName_();
                                                },
                                                topologies: topologies

                                            }
                        */

                    }
                    // console.log("component", component);
                    components.push(component);
                }
                return components;
            }


            //.forEach_(function (componentData) {


            //  component.segments = component.segments.concat(componentData);
            // });


            //console.log(component);


            //TODO-----------------------TODO--------------------------------TODO//
            /*
                        doc.moduleDefinitions.forEach(function (moduleDefinition) {
                            let currentInteractions = getIteractionList(moduleDefinition);
                            for (let x of currentInteractions) {
                                interactions.push(currentInteractions[x]);
                            }
                        });

             */

            // console.log("doc", doc.getRDFModel_().toString_());
            // console.log(doc.getPrefixedUnits_() !== null ? doc.getPrefixedUnits_().toString_() : doc.getPrefixedUnits_());
            //  console.log(doc.getActivities_() !== null ? doc.getActivities_().toString_() : doc.getActivities_());
            // console.log(doc.getPlans_() !== null ? doc.getPlans_().toString_() : doc.getPlans_());
            // console.log(doc.getAgents_() !== null ? doc.getAgents_().toString_() : doc.getAgents_());
            // console.log(doc.getAttachments_() !== null ? doc.getAttachments_().toString_() : doc.getAttachments_());
            // console.log(doc.getNamespaces_() !== null ? doc.getNamespaces_().toString_() : doc.getNamespaces_());
            // console.log(doc.getCollections_() !== null ? doc.getCollections_().toString_() : doc.getCollections_());
            // console.log(doc.getModels_() !== null ? doc.getModels_().toString_() : doc.getModels_());
            // console.log(doc.getSequences_() !== null ? doc.getSequences_().toString_() : doc.getSequences_());
            // console.log(doc.getComponents_() !== null ? doc.getComponents_() : doc.getComponents_());
            //  console.log(doc.getBaseURI_());
            //  console.log(doc.getTopLevelResourceTypes_().toString_());
            // console.log(doc.getRDFModel_());
            // for (let i = 0; i < doc.getComponents_().size_(); i++) {
            //     let test = doc.getComponents_().get_(i);
            //     if (test.getSubComponents_() !== null) {
            //         //  console.log(JSON.stringify(test));
            //
            //     } else {
            //         //   console.log("has subcomponents");
            //     }
            // }

            //   TODO  if(doc.contains(doc.getTopLevelResourceTypes_()) {
            //    add array top, then dataModel, search those types for their components add to array for list.
            //    For normal glyph, then search for components add them to list, toplevel name of item, components pieces
            //    }
            // TODO: get components of model and possibly subcomponents as well, find use get role and type to get glyph
            //  connected to it, send glyphs to array and in order display them using genome factory glyphs

            //   let writeDocument = SBOLIO.write_(doc, fileWrite, "JSON-LD"); //TODO CHECK
            //    let reReadDocument = SBOLIO.read_(fileWrite, "N-TRIPLES");
            //  let test = readDocument.getRDFModel_();

            // console.log("test", test.getGraph_().toString_());
            //  console.log("empty?", test.getGraph_().isEmpty_());

            //   console.log("write", writeDocument);
            //   console.log("re read", reReadDocument);
//TODO ----------------------------------------
            //  let comptest = java.newArray("org.sbolstandard.entity.Component", []);
            //  let components = doc.getIdentifieds_("?identified a sbol:Component; sbol:role GO:0003700; sbol:type SBO:0000252 .", component);
            //let components = java.callMethodSync(test, "getIdentifieds", "?identified a sbol:Component; sbol:role  GO:0003700; sbol:type SBO:0000252 .", component);
            // console.log("Graph query results:");
            /*for (let i = 0; i < components.size_(); i++) {
                comptest.add_(v);
                console.log("Components", comptest.toString_());
            }*/
            // console.log("compon" ,components);

            //  console.log("Doc: ", components.size_());
            //  console.log("n");
//TODO ----------------------------------------


        } catch
            (e) {
            console.log(e);
        }


        //TODO: IMPORT METHOD GETIDENTIFIED FROM SBOLDOCUMENT
        // comp = list<components>
        // comp.doc.getIdentifieds
        //    let components = java.newArray("org.sbolstandard.entity.Component", doc.getIdentifieds("?identified a sbol:Component; sbol:role  SO:0000141; sbol:type SBO:0000251 .", component.class));


    }
};


//const base = java.newInstance("java.util.ArrayList");


// const API = function (){
//
//     // The location of java and the - we're making these public because maybe
//     // we want to change them in the user of this module.
//
//     this.jarPath = "./public/libSBOLj3.jar";
//
//     /*
//     mvn(function(err, mvnResults) {
//         if (err) {
//             return console.error('could not resolve maven dependencies', err);
//         }
//         mvnResults.classpath.forEach(function(c) {
//             // console.log('adding ' + c + ' to classpath');
//             //console.log("\n");
//             java.classpath.push(c);
//         });
//     });
//     */
//
//     /**
//      * Executes the java process to begin sending and receiving communication
//      */
//     this.run = function (context,graph) {
//
//         // Invoke the process
//         java.classpath.push(this.jarPath);
//
//
//
//         let URI = java.import("java.net.URI");
//         let SBOLDocument = java.newInstanceSync("org.sbolstandard.entity.SBOLDocument");
//         let List = java.newInstanceSync("java.util.ArrayList");
//         let component = java.import("org.sbolstandard.entity.Identified");
//
//
//     }
//
//     function setBase(uri) {
//
//     }
//
//     function querySPARQL(doc) {
//
//     }
//
//     /**
//      * Receive data over standard input
//      */
//     function onData(data) {
//
//         // Attach or extend receive buffer
//         receiverBuffer = (null == receiverBuffer) ? data : Buffer.concat([receiverBuffer, data]);
//
//         // Pop all messages until the buffer is exhausted
//         while (null != receiverBuffer && receiverBuffer.length > 3) {
//             let size = receiverBuffer.readInt32BE(0);
//
//             // Early exit processing if we don't have enough data yet
//             if ((size + 4) > receiverBuffer.length) {
//                 break;
//             }
//
//             // Pull out the message
//             let json = receiverBuffer.toString('utf8', 4, (size + 4));
//
//             // Resize the receive buffer
//             receiverBuffer = ((size + 4) === receiverBuffer.length) ? null : receiverBuffer.slice((size + 4));
//
//             // Parse the message as a JSON object
//             try {
//                 let msgObj = JSON.parse(json);
//
//                 // emit the generic message received event
//                 this.emit('message', msgObj);
//
//                 // emit an object-type specific event
//                 if ((typeof msgObj.messageName) == 'undefined') {
//                     this.emit('unknown', msgObj);
//                 } else {
//                     this.emit(msgObj.messageName, msgObj);
//                 }
//             } catch (ex) {
//                 this.emit('exception', ex);
//             }
//         }
//     }
//
//     /**
//      * Receive error output from the java process
//      */
//     function onJavaError(data) {
//         javaProcess.emit('java_error', data.toString());
//     }
// };
//
//
//
// // Make our JavaClient class an EventEmitter
// Util.inherits(API, EventEmitter);

