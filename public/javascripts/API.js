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


    setDocument: (context, graph) => {

        console.log(context);

        let SBOLDocument = java.import("org.sbolstandard.entity.SBOLDocument");
        let List = java.newInstanceSync("java.util.ArrayList");
        let identified = java.import("org.sbolstandard.entity.Identified");
        let component = java.import("org.sbolstandard.entity.Component");
        let URI = java.import("java.net.URI");
        try {
            let uri = new URI("");
            let base = java.callMethodSync(uri, "create", "https://synbiohub.org/public/igem/");
            let doc = new SBOLDocument(base);

            let components = java.callMethodSync(doc, "getIdentifieds", "?identified a sbol:Component; sbol:role  SO:0000141; sbol:type SBO:0000251 .", component.class);

            console.log("Graph query results:");
            let identify = new identified();


            for (component in components) {
                console.log("  " + component.java.callMethodSync(identify, "getDisplayId")); //TODO: FIX
            }


            //let base = URI.create;

            //SBOLDocument = base;
            // SBOLDocument.SBOLDocument = base;
            //  let doc = SBOLDocument.SBOLDocument;


            // List<Component> components=(List<Component>)doc.getIdentifieds("?identified a sbol:Component; sbol:role  SO:0000141; sbol:type SBO:0000251 .", Component.class);
            List.newArray = ("org.sbolstandard.entity.Component"); //, component.class

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


        //list(comp) components =  componentsdoc.getIdentifieds("?identified a sbol:Component; sbol:role  SO:0000141; sbol:type SBO:0000251 .", comp().class);


        /*

        URI base=URI.create("https://synbiohub.org/public/igem/");
        SBOLDocument doc=new SBOLDocument(base);

        List<Component> components=(List<Component>)doc.getIdentifieds("?identified a sbol:Component; sbol:role  SO:0000141; sbol:type SBO:0000251 .", Component.class);
        System.out.println("Graph query results:");
        for (Component component:components){
            System.out.println("  " +  component.getDisplayId());
        }
        */


        //   console.log("step 5");
        //Write using the RDF Turtle format
        /*
                var output = java.netInstance("org.sbolstandard.io.SBOLIO",SBOLIO.write(doc, "JSON-LD"));
                //Read using the RDF Turtle format
                var doc2 = java.newInstance("org.sbolstandard.entity.SBOLDocument", output);
        */
        /*


                //var newArray = java.newArray("java.lang.String", ["item1", "item2", "item3"])

                //var indentified = java.import("org.sbolstandard.entity.Identified");
               // var components = (list<java.import("org.sbolstandard.entity.Component")>)doc.getIdentifieds("?identified a sbol:Component; sbol:role  SO:0000141; sbol:type SBO:0000251 .", comp.class);
               // list(comp) components = doc.getIdentifieds("?identified a sbol:Component; sbol:role  SO:0000141; sbol:type SBO:0000251 .", comp.class);

                console.log("Graph query results:");

                for (comp component:components){
                    console.log("  " +  component.getDisplayId());
                }
        */
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

