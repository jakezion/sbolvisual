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


module.exports = {

    dataModel: (data) => {

    },

    getRole: (SO,GO) => {
        let search = SO.replace("SO:","");
        let search2 = GO.replace("GO:","");
        console.log(search)
        switch(search){
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
        let search = SBO.replace("SBO:","");
        console.log(search);
        switch(search){
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
        let search = SBO.replace("SBO:","");
        console.log(search);
        switch(search){
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
            fs.writeFileSync("./public/json.json", JSON.stringify(json));
        } catch (e) {
            console.error(e);
        }
    },
    setDocument: (context, graph, data) => {
        // console.log(java.isJvmCreated());

        //console.log(context);
       // let json = fs.writeFileSync("./public/json.json", JSON.stringify(data));



        let SBOLDocument = java.import("org.sbolstandard.entity.SBOLDocument");
        let ComponentType = java.import("org.sbolstandard.vocabulary.ComponentType");
        let Role = java.import("org.sbolstandard.vocabulary.Role");
        //let SBOLIO = java.newInstanceSync("org.sbolstandard.io.SBOLIO");
        let SBOLIO = java.import("org.sbolstandard.io.SBOLIO");
        let File = java.import("java.io.File");
        let SBOLAPI = java.import("org.sbolstandard.api.SBOLAPI");
        let identified = java.import("org.sbolstandard.entity.Identified");
        let component = java.import("org.sbolstandard.entity.Component");
        let URI = java.import("java.net.URI");
        //let testUtil = java.import("org.sbolstandard.TestUtil");
        try {
            let uri = new URI("");
            let API = new SBOLAPI();
            let io = new SBOLIO();
            let base = URI.create_("https://synbiohub.org/public/igem/"); //TODO: REMOVE BASE URI AND SEND A FILE INSTEAD FOR DOCUMENT IN SBOLIO
            let doc = new SBOLDocument(base);

            let test3 = SBOLIO.write_(doc, "JSON-LD"); //TODO CHECK
            let test = SBOLIO.read_(test3, "JSON-LD");
            // let json = JSON.stringify(graph);

            //let componentRole = new Role();
            //let componentType = new ComponentType();
            //console.log(uri.equalsSync("https://synbiohub.org/public/igem/"));
            // console.log(uri => create_("https://synbiohub.org/public/igem/"));
            //let base = java.callMethodSync(uri, "create", "https://synbiohub.org/public/igem/");
           // let base = URI.create_("https://synbiohub.org/public/igem/"); /

            // console.log(context);
            //let base = URI.create_(JSON.stringify(context));
            // let base = java.callMethodSync(uri, "create", JSON.stringify(context));

           // let doc = new SBOLDocument();
            // console.log(JSON.stringify(doc.getBaseURISync()));

            //let doc = new SBOLDocument(data);
            //console.log(doc);

            //console.log("doc" ,doc.valueOf());

//TODO:  _________________________________________



            //-------------------------------------------//


            // let test = io.read_( json, "JSON-LD");

            //-------------------------------------------//
            // console.log(SBOLIO);
            // let doc = SBOLIO.read_(json, "JSON-LD");


            //TODO let TetR_protein = SBOLAPI.createComponent_(doc, SBOLAPI.append_(baseUri, "TetR_protein"), ComponentType.Protein.getUrl(), "TetR", "TetR protein", Role.TF);

            //let b = doc.createExperimentalData_("BBa_J100252/1");
            //console.log("Test data", b);

            /* TODO
                        String baseUri="https://s  bolstandard.org/examples/";
                        SBOLDocument doc=new SBOLDocument(URI.create(baseUri));
                        Component TetR_protein=SBOLAPI.createComponent(doc, SBOLAPI.append(baseUri, "TetR_protein"), ComponentType.Protein.getUrl(), "TetR", "TetR protein", Role.TF);
                        Component LacI_protein=SBOLAPI.createComponent(doc, SBOLAPI.append(baseUri, "LacI_protein"), ComponentType.Protein.getUrl(), "LacI", "LacI protein", Role.TF);
                        Collection col=doc.createCollection(SBOLAPI.append(baseUri,"col1"));
                        col.setTopLevels(Arrays.asList(TetR_protein.getUri(), LacI_protein.getUri()));
                        TestUtil.serialise(doc, "entity/collection", "collection");
                        System.out.println(SBOLIO.write(doc, "Turtle"));
                        TestUtil.assertReadWrite(doc);

             */


            //addToList()

           // let test3 = SBOLIO.write_(doc, File(json), "JSON-LD"); //TODO CHECK

            //let test4 = SBOLIO.write_(doc, "RDF/XML-ABBREV");

            //let tu = new testUtil();
            //let util = testUtil.assertReadWrite_(test);
            // let test3 = SBOLIO.write_(test,"JSON-LD");

            //console.log("util",util);
            console.log("test3", test3);
            console.log("test", test);
            // console.log("test4", test4);
            /*
                        TestUtil.assertReadWrite(doc2);
                        String output2=SBOLIO.write(doc2, "RDF/XML-ABBREV");
                        System.out.println(output2);
                        */
            //let test2 = test.getRDFModel_();
            //console.log(test2.size_());


            //let testTypes = java.getStaticFieldValue("org.sbolstandard.io.SBOLIO", "doc");
            //console.log(testTypes);

            // t.deepEqual(testTypes, [json, "JSON-LD"]);


            //console.log(SBOLIO);
            // console.log(test);
            //console.log(test.is);
            //console.log(test.model);
            //test.doc = SBOLIO.read_(json, "JSON-LD");
            //let b = test.doc;
            //console.log(b);

            //-------------------------------------------//


            //console.log(java.callStaticMethodSync("org.sbolstandard.io.SBOLIO", "read", json, "JSON-LD"));

            //-------------------------------------------//
            /*
                        console.log("IO: ", io.toString().valueOf());
                        console.log("IO2: ", io.toString_());
                        console.log("test: ", test.toString());
                        console.log("test: ", JSON.stringify(test));
                        console.log("test2: ", test.getRDFModel_().valueOf());
                        console.log("doc2: ", doc.getRDFModel_().valueOf());
                        //console.log("doc3: ", SBOLDocument.valueOf());
                        //console.log("doc: ", SBOLIO.valueOf());
                        console.log("test3: ", test.valueOf());
                        console.log("test4: ", test.getBaseURI_());
                        console.log(test);
            */
            //-------------------------------------------//
            let comptest = java.newArray("org.sbolstandard.entity.Component", []);
            let components = test.getIdentifieds_("?identified a sbol:Component; sbol:role  GO:0003700; sbol:type SBO:0000252 .", component);
            //let components = java.callMethodSync(test, "getIdentifieds", "?identified a sbol:Component; sbol:role  GO:0003700; sbol:type SBO:0000252 .", component);
            console.log("Graph query results:");
            for (let i = 0; i < components.size_(); i++) {
                comptest.add_(v);
                console.log("Components", comptest.toString_());
            }
            // console.log("compon" ,components);

            console.log("Doc: ", components.size_());
            console.log("n");

            //-------------------------------------------//

            // let doc2 = new SBOLDocument(test);

            //let doc2 = java.callMethodSync(io, 'read', json, 'JSON-LD');
            //   console.log(java.callMethodSync(io, 'read', '', ''));
            //console.log(data.toString());
            //console.log(typeof data.toString());
            //TODO: make doc SBOLDocument object then pass read


            // console.log(doc2);

            //let doc2 = java.callStaticMethodSync("org.sbolstandard.io.SBOLIO","read",json,"JSON-LD");
            // io.read = [json,"JSON-LD"];
            //let data2 = io.read(json,"JSON-LD");
            //console.log(SBOLIO.readSync(json, "JSON-LD"));
            // console.log(SBOLIO.readSync(json, "JSON-LD"));


            /*
                        io.read(json,'JSON-LD',function (err, output){
                            if(err){console.log(err);return;}
                            let components =  java.callMethodSync(output, "getIdentifieds", "?identified a sbol:Component; sbol:role  GO:0003700; sbol:type SBO:0000252 .", component);
                            console.log("Doc: ", components.toStringSync());
                        });
            */
            //  let SBOLIO2 = java.newInstanceSync("org.sbolstandard.io.SBOLIO");
            /*
                        let SBOLIO2 = java.newInstanceSync("org.sbolstandard.io.SBOLIO");
                        console.log(SBOLIO2.toString());
                        let json2 = JSON.stringify(data);
                        let type2 = "JSON-LD";
                        console.log(SBOLIO2.read_(json2,type2));
                        let document = java.callStaticMethodSync("org.sbolstandard.io.SBOLIO", "read", json2, type2);
                        let components2 =  java.callMethodSync(document, "getIdentifieds", "?identified a sbol:Component; sbol:role  GO:0003700; sbol:type SBO:0000252 .", component);
                        console.log("Doc: ", components2.toStringSync());
            */
//let test = findClassSync(io);
            //  console.log(test);


            // let doc2 = java.callMethodSync("org.sbolstandard.io.SBOLIO", 'read', json, 'JSON-LD');


            // java.callMethodSync(io, "read", json, "JSON-LD");
            //java.setStaticFieldValue("org.sbolstandard.entity.SBOLDocument", "doc2", java.callMethodSync(api, "read", data.toString(), "JSON-LD"));
            //let doc2 = java.getStaticFieldValue("org.sbolstandard.entity.SBOLDocument", "doc2");
            //let doc2 = java.callMethodSync(api, "read", data.toString(), "JSON-LD");
            //  let doc2 = java.callMethodSync(api,"write",doc,"JSON-LD",function (err,result) {
            //      return err ?  "no" : "yes";
            //  });
            // let test = JSON.stringify(java.callMethodSync(doc2, "getRDFModel",));
            //  doc2.createModelSync(json, 'JSON-LD');
            // console.log("Doc: ", doc2.getRDFModelSync());


            //SBOLDocument doc2=SBOLIO.read(output, "JSON-LD");

            //String output=SBOLIO.write(doc, "Turtle");
            //Read using the RDF Turtle format
            //SBOLDocument doc2=SBOLIO.read(output, "Turtle");


            // Component device= SBOLAPI.createDnaComponent(doc, "i13504", "i13504", "Screening plasmid intermediate", ComponentType.DNA.getUrl(), null);
            /*
            SBOLAPI.appendComponent(doc, device,rbs,Orientation.inline);
            SBOLAPI.appendSequenceFeature(doc, device, "tactag", Orientation.inline);
            SBOLAPI.appendComponent(doc, device,gfp, Orientation.inline);
            SBOLAPI.appendSequenceFeature(doc, device, "tactagag", Orientation.inline);
            SBOLAPI.appendComponent(doc, device,term, Orientation.inline);

            for (SubComponent subComp: device.getSubComponents()){
                System.out.println(subComp.getIsInstanceOf());
            }
            */

//TODO: LIST NOT DEFINED    TRY WITH LIST //java.setStaticFieldValue("org.sbolstandard.entity.SBOLDocument", "doc2", java.callMethodSync(api, "read", data.toString(), "JSON-LD"));


            /*
                        for (data of components) {
                            console.log(data);
                            console.log("  " + java.callMethodSync(data, "getDisplayId")); //TODO: FIX
                        }
            */


            /*
                                                                                EXAMPLE EXAMPLE
            URI base=URI.create("https://synbiohub.org/public/igem/");
            SBOLDocument doc=new SBOLDocument(base);

            String output=SBOLIO.write(doc, "JSON-LD");
            //Read using the RDF Turtle format
            SBOLDocument doc2=SBOLIO.read(output, "JSON-LD");


            List<Component> components=(List<Component>)doc.getIdentifieds("?identified a sbol:Component; sbol:role  SO:0000141; sbol:type SBO:0000251 .", Component.class);
            System.out.println("Graph query results:");
            for (Component component:components){
                System.out.println("  " +  component.getDisplayId());
            }
            */


            //let base = URI.create;

            //SBOLDocument = base;
            // SBOLDocument.SBOLDocument = base;
            //  let doc = SBOLDocument.SBOLDocument;


            // List<Component> components=(List<Component>)doc.getIdentifieds("?identified a sbol:Component; sbol:role  SO:0000141; sbol:type SBO:0000251 .", Component.class);
            //List.newArray = ("org.sbolstandard.entity.Component"); //, component.class

            //console.log(List.newArray );
            // SBOLDocument.getIdentifieds = List.newArray;

            // doc.getIdentifieds = "?identified a sbol:Component; sbol:role  SO:0000141; sbol:type SBO:0000251 ."; //, "org.sbolstandard.entity.Component"); //TODO: FIX
            // let components = doc.getIdentifieds;

            //console.log(SBOLDocument.getIdentifieds);


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

