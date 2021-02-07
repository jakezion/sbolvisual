//const index = require("./routes/index");


const java = require('java');
const mvn = require('node-java-maven');
const Util = require('util');
const EventEmitter = require('events').EventEmitter;
const ChildProc = require('child_process');
//console.log(typeof index); // => 'function'
//let context;

java.classpath.push("./public/libSBOLj3.jar");

/*
java.classpath.push("src");
java.classpath.push("./public/libSBOLj3.jar/libSBOLj3/src");
java.classpath.push("./public/libSBOLj3.jar/src");
*/
//GET CONTEXT
/*
mvn(function(err, mvnResults) {
    if (err) {
        return console.error('could not resolve maven dependencies', err);
    }
    mvnResults.classpath.forEach(function(c) {
        // console.log('adding ' + c + ' to classpath');
        //console.log("\n");
        java.classpath.push(c);
    });
});
*/
//TODO: ETHICS REPORT ETHICS REPORT ETHICS REPORT ETHICS REPORT ETHICS REPORT ETHICS REPORT ETHICS REPORT ETHICS REPORT ETHICS REPORT ETHICS REPORT 


module.exports = {
    /*
    getContext: (data) => {
    context = data;
    console.log(context);
},
*/

    setDocument: (context, graph) => {
        let URI = java.import("java.net.URI");
        let SBOLDocument = java.newInstanceSync("org.sbolstandard.entity.SBOLDocument");
        let List = java.newInstanceSync("java.util.ArrayList");
        let component = java.import("org.sbolstandard.entity.Identified");

        try {
            //  var base = new URI();
            URI.create = context;
            let base = URI.create;

            //SBOLDocument = base;
            SBOLDocument.SBOLDocument = base;
            let doc = SBOLDocument.SBOLDocument;
/*
            List.newArray = ("org.sbolstandard.entity.Component",
            for (let set in graph) {
                "?identified a sbol:Component; sbol:role  ", graph[set].role, "; sbol:type ", graph[set].type, " ."
            }
                    , component.class); //, component.class
*/


            console.log(List.newArray);

            //console.log(List.newArray );
            SBOLDocument.getIdentifieds = List.newArray;
            let components = SBOLDocument.getIdentifieds;
            //console.log(SBOLDocument.getIdentifieds);
            //console.log("Graph query results:");


            /*
                        for (component in components) {
                            console.log("  " + component.getDisplayId);
                        }
            */


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
//
//     // The child process object we get when we spawn the java process
//     let javaProcess = null;
//
//     // buffer for receiving messages in part and piecing them together later
//     let receiverBuffer = null;
//
//     // The location of java and the - we're making these public because maybe
//     // we want to change them in the user of this module.
//     this.javaPath = 'java';
//     this.jarPath = "C:/Users/jakes/WebstormProjects/sbolvisual/public/libSBOLj3.jar";
//
//    // this.verbose = true;
//     // list of events emitted - for informational purposes
//     this.events = [
//         'spawn', 'message', 'exception', 'unknown', 'sent', 'java_error',
//
//         // Response messages that then become events themselves
//         'Error', 'Hello', 'Info'
//     ];
//
//     /**
//      * Attach our own event handler to reply to the hello message.
//      * This is just a convenience part of the protocol so that clients don't have to do it.
//      * Also connects if connection data was supplied.
//      */
//     this.on('Hello', function () {
//         this.sendHello();
//     });
//
//     /**
//      * Executes the java process to begin sending and receiving communication
//      */
//     this.run = function () {
//         // Invoke the process
//         javaProcess = ChildProc.spawn(this.javaPath, ['-jar', this.jarPath]);
//
//         // Wire up events
//         javaProcess.on('data', data => {
//             console.log(data);
//          //   onData(data)
//         });
// /*
//         javaProcess.stderr.on('data', data => {
//             onJavaError(data)
//         });
// */
//         javaProcess.on('exit', code => {
//             console.log("The java program exited with code " + code + ".");
//         });
//
//         // Emit our own event to indicate to others that we have spawned
//         this.emit('spawn', javaProcess);
//     }
//
//     // sends the hello request message
//     this.sendHello = function () {
//         sendMessage(
//             {
//                 messageName: 'Hello',
//                 version: '1.1'
//             });
//     }
//
//     // sends a message that will be echoed back as an Info message
//     this.sendEcho = function (message) {
//         sendMessage(
//             {
//                 messageName: "Echo",
//                 message: message
//             });
//     }
//
//     // sends a message telling the java app to exit
//     this.sendGoodbye = function () {
//         sendMessage(
//             {
//                 messageName: "Goodbye"
//             });
//     }
//
//     /**
//      * Sends a message object as a JSON encoded string to the java application for processing.
//      */
//     function sendMessage(aMsg) {
//         // convert to json and prepare buffer
//         let aJsonString = JSON.stringify(aMsg);
//         let lByteLength = Buffer.byteLength(aJsonString);
//         let lMsgBuffer = new Buffer(4 + lByteLength);
//
//         // Write 4-byte length, followed by json, to buffer
//         lMsgBuffer.writeUInt32BE(lByteLength, 0);
//         lMsgBuffer.write(aJsonString, 4, aJsonString.length, 'utf8');
//
//         // send buffer to standard input on the java application
//         javaProcess.stdin.write(lMsgBuffer);
//
//         this.emit('sent', aMsg);
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

// export our class


/*
var javaInit = require('./javaInit');
var java = javaInit.getJavaInstance();
*/
/*
var base = java.newInstance("java.net.URI");
if (java.instanceOf(base,"java.net.URI")){
console.log(" is an instance of ", base);
}

base.create("https://synbiohub.org/public/igem/");
var doc = new SBOLDocument(base);

List<Component> components=(List<Component>)doc.getIdentifieds("?identified a sbol:Component; sbol:role  SO:0000141; sbol:type SBO:0000251 .", Component.class);
System.out.println("Graph query results:");
for (Component component:components){
    System.out.println("  " +  component.getDisplayId());
}
*/


/*
java.classpath.push("java.net.URI;
java.classpath.push("java.util.ArrayList;
java.classpath.push("java.util.Arrays;
java.classpath.push("java.util.List;
java.classpath.push("java.util.Set;
java.classpath.push("Org.sbolstandard.entity.Component;
java.classpath.push("org.sbolstandard.entity.ComponentReference;
java.classpath.push("org.sbolstandard.entity.Constraint;
java.classpath.push("org.sbolstandard.entity.Feature;
java.classpath.push("org.sbolstandard.entity.Identified;
java.classpath.push("org.sbolstandard.entity.Interaction;
java.classpath.push("org.sbolstandard.entity.Location;
java.classpath.push("org.sbolstandard.entity.Participation;
java.classpath.push("org.sbolstandard.entity.SBOLDocument;
java.classpath.push("org.sbolstandard.entity.Sequence;
java.classpath.push("org.sbolstandard.entity.SequenceFeature;
java.classpath.push("org.sbolstandard.entity.SubComponent;
java.classpath.push("org.sbolstandard.entity.Location.LocationBuilder;
java.classpath.push("org.sbolstandard.util.SBOLGraphException;
java.classpath.push("org.sbolstandard.vocabulary.ComponentType;
java.classpath.push("org.sbolstandard.vocabulary.DataModel;
java.classpath.push("org.sbolstandard.vocabulary.Encoding;
java.classpath.push("org.sbolstandard.vocabulary.Orientation;
java.classpath.push("org.sbolstandard.vocabulary.RestrictionType;
*/

//TODO: MODULE EXPORT FROM INDEX AND SEND DATA OF SBOL HERE TO BE PROCESSED

/*
java.classpath.push("java.util.List");
java.classpath.push("java.util.ArrayList");
java.classpath.push("java.util.Arrays");
java.classpath.push("java.util.Set");
java.classpath.push("org.sbolstandard.entity.Component");
java.classpath.push("org.sbolstandard.entity.Identified");
java.classpath.push("org.sbolstandard.entity.SBOLDocument");
java.classpath.push("java.net.URI");
*/

/*
java.classpath.push("src");
java.classpath.push("commons-lang3-3.1.jar");
java.classpath.push("commons-io.jar");

var list1 = java.newInstanceSync("java.util.ArrayList");


console.log(list1.sizeSync()); // 0
list1.addSync('item1');
console.log(list1.sizeSync()); // 1

java.newInstance("java.util.ArrayList", function(err, list2) {
  list2.addSync("item1");
  list2.addSync("item2");
  console.log(list2.toStringSync()); // [item1, item2]
});

var ArrayList = java.import('java.util.ArrayList');
var list3 = new ArrayList();
list3.addSync('item1');
list3.equalsSync(list1); // true
*/