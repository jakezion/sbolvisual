//const index = require("./routes/index");


const java = require('java');
const mvn = require('node-java-maven');
const Util = require('util');
const EventEmitter = require('events').EventEmitter;
const ChildProc = require('child_process');
//console.log(typeof index); // => 'function'
//let context;

java.classpath.push("./public/libSBOLj3.jar");


module.exports = {


    setDocument: (context, graph, data) => {

        //console.log(context);

        let SBOLDocument = java.import("org.sbolstandard.entity.SBOLDocument");
        let SBOLIO = java.import("org.sbolstandard.io.SBOLIO");
        let File = java.import("java.io.File");
        let SBOLAPI = java.import("org.sbolstandard.api.SBOLAPI");
        let identified = java.import("org.sbolstandard.entity.Identified");
        let component = java.import("org.sbolstandard.entity.Component");
        let URI = java.import("java.net.URI");
        try {
            let uri = new URI("");
            let base = java.callMethodSync(uri, "create", "https://synbiohub.org/public/igem/");
            // console.log("base", base.toString());
            let doc = new SBOLDocument(base);

            //console.log("doc" ,doc.valueOf());

            let io = new SBOLIO();
//console.log(data.toString());
//console.log(typeof data.toString());
//TODO: make doc SBOLDocument object then pass read
           // console.log(data);
            let doc2 = java.callMethodSync(io, "read", JSON.stringify(data), "JSON-LD");

            //java.setStaticFieldValue("org.sbolstandard.entity.SBOLDocument", "doc2", java.callMethodSync(api, "read", data.toString(), "JSON-LD"));
            //let doc2 = java.getStaticFieldValue("org.sbolstandard.entity.SBOLDocument", "doc2");
            //let doc2 = java.callMethodSync(api, "read", data.toString(), "JSON-LD");
            //  let doc2 = java.callMethodSync(api,"write",doc,"JSON-LD",function (err,result) {
            //      return err ?  "no" : "yes";
            //  });
            //console.log("Doc: ",doc2);


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


            //let List = java.newArray("org.sbolstandard.entity.Component"); //, component.class
            let components = java.callMethodSync(doc, "getIdentifieds", "?identified a sbol:Component; sbol:role  SO:0000141; sbol:type SBO:0000251 .", component);
            //let List = java.newInstanceSync("java.util.ArrayList");
            //let test = java.callMethodSync(List, "add", "item1");
            //console.log("Test 2: ", List.sizeSync());
            //console.log("Test line: ", List.toStringSync());
            console.log("Graph query results:");

            // console.log("compon" ,components);

            console.log("Doc: ", components.toStringSync());

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

