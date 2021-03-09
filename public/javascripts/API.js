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


    componentType: (SBO) => {
        let search = SBO.replace("SBO:", "");
        console.log(search);
        switch (search) {
            case "0000251":
                //DNA
                break;
            case "0000250":
                //RNA
                break;
            case "0000252":
                //Protein
                break;
            case "0000247":
                //SimpleChemical
                break;
            case "0000253":
                //NoncovalentComplex
                break;
            case "0000241":
                //FunctionalEntity
                break;
            case "0005623":
                //Cell
                break;
            default:
                break;
        }
    },
    interactionType: (SBO) => {
        let search = SBO.replace("SBO:", "");
        console.log(search);
        switch (search) {
            case "000169":
                // Inhibition
                break;
            case "0000170":
                //Stimulation
                break;
            case "0000176":
                //BiochemicalReaction
                break;
            case "0000177":
                //NonCovalentBinding
                break;
            case "0000179":
                //Degradation
                break;
            case "0000589":
                //GeneticProduction
                break;
            case "0000168":
                //Control
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

            let component = {
                segments: []
            };

            let interactions = [];
//TODO-----------------------TODO--------------------------------TODO//
            /*    doc.componentDefinitions.forEach(function (componentDefinition) {
                    component.segments = component.segments.concat(getDisplayList(componentDefinition).components[0].segments[0]);
                });

             */
            console.log(doc.getComponents_() !== null ? doc.getComponents_().toString_() : doc.getComponents_());

            for (let x = 0; x < doc.getComponents_().size_(); x++) {
                // console.log(componentData);
                let displayId = doc.getComponents_().get_(x).getComponentReferences_();
                console.log(displayId);

                let types = doc.getComponents_().get_(x).getTypes_();

                let topologies = [];

                //default is always the part to be rendered is a DNA one
                let nonDNAType = null;

                for (let x = 0; x < types.size_(); x++) {
                    // console.log(types.get_(x).toString_());
                    let formatType = types.get_(x).toString_().replace(/https:\/\/identifiers.org\//g, "");
                    let sbo = (formatType).match(/SBO.([0-9]+)/g);
                    if (!sbo || !sbo.length) return

                    //let topology = SBO FIND TYPE
                    //if (topology) topologies.push(topology);

                    //TODO CHECK INTERACTION TYPE AND COMPONENT TYPE

                }
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
            /*
                        design.displayList.components.forEach(function(component) {

                            component.segments.forEach(function(segment) {

                                segment.sequence.forEach(function(glyph) {

                                    if(glyph.svg !== undefined) {

                                        var $node = $(glyph.svg.node);

                                        var title = ({
                                            'aptamer': 'Aptamer',
                                            'assembly-scar': 'Assembly Scar',
                                            'biopolymer-junction': 'Biopolymer Junction',
                                            'biopolymer-base': 'Biopolymer Base',
                                            'biopolymer-amino-acid': 'Biopolymer Amino Acid',
                                            'blunt-restriction-site': 'Blunt Restriction Site',
                                            'primer-binding-site': 'Primer Binding Site',
                                            'overhang-site-5': '5\' Overhang Site',
                                            'overhang-site-3': '3\' Overhang Site',
                                            'sticky-restriction-site-5': '5\' Sticky Restriction Site',
                                            'cds': 'Coding Site',
                                            'engineered-region': 'Engineered Region',
                                            'signature': 'Signature',
                                            'insulator': 'Insulator',
                                            'mature-transcript-region': 'Mature Transcript Region',
                                            'origin-of-replication': 'Origin of Replication',
                                            'origin-of-transfer': 'Origin of Transfer',
                                            'operator': 'Operator',
                                            'poly-a': 'PolyA',
                                            'promoter': 'Promoter',
                                            'protease-site': 'Protease Site',
                                            'protein-stability': 'Protein Stability Element',
                                            'res': 'Ribosome Entry Site',
                                            'restriction-site': 'Restriction Site',
                                            'ribonuclease-site': 'Ribonuclease Site',
                                            'rna-stability': 'RNA Stability Element',
                                            'stem-loop': 'Stem Loop',
                                            'scar': 'Scar',
                                            'terminator': 'Terminator',
                                            'unspecified': 'Unspecifed',
                                            'non-coding-rna-gene': 'Non Coding RNA Gene',
                                            'no-glyph-assigned': 'No Glyph Assigned'
                                        })[glyph.type];

                                        if(glyph.start !== glyph.end) {
                                            title += '\n';
                                            title += glyph.start + ' -> ' + glyph.end;
                                        }

                                        $node.tooltip({
                                            container: 'body',
                                            placement: 'bottom',
                                            title: title,
                                            animation: false
                                        });
                                    }
                                });

                            });


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
            console.log(doc.getComponents_() !== null ? doc.getComponents_() : doc.getComponents_());
            //  console.log(doc.getBaseURI_());
            console.log(doc.getTopLevelResourceTypes_().toString_());
            // console.log(doc.getRDFModel_());
            for (let i = 0; i < doc.getComponents_().size_(); i++) {
                let test = doc.getComponents_().get_(i);
                if (test.getSubComponents_() !== null) {
                    console.log(JSON.stringify(test));

                } else {
                    //   console.log("has subcomponents");
                }
            }

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

        } catch (e) {
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

