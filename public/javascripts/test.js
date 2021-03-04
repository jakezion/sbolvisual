var BodyParser = require('body-parser');
var Express = require('express');
var JavaClient = require('./NodeJavaBridge.js');

var JavaClientInstance = new JavaClient();

var app = Express();

/////  Receive message logic  \\\\\
app.use(BodyParser.json());

app.post('/', function (request, response) {

    var task = request.body;

    response.writeHead(200, { 'content-type': 'text/plain' });

    var otherObject = { SomeData: 1234 };
    var json = JSON.stringify({
        data: otherObject
    });

    response.end(json);

});

console.log("START --> Java Client Instance");
JavaClientInstance.run();

app.listen(8080); //to port on which the express server listen
console.log("Server listening on: " + 8080);

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// var Util = require('util');
// var EventEmitter = require('events').EventEmitter;
// var ChildProc = require('child_process');
//
// var JavaClient = function () {
//     var _self = this;
//
//     // The child process object we get when we spawn the java process
//     var _javaSpawn = null;
//
//     // buffer for receiving messages in part and piecing them together later
//     var _receiveBuffer = null;
//
//     // The location of java and the - we're making these public because maybe
//     // we want to change them in the user of this module.
//     _self.javaPath = 'java';
//     _self.jarPath = 'C:/Dev/Backend_Java.jar';
//     _self.verbose = true;
//
//     // list of events emitted - for informational purposes
//     _self.events = [
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
//     _self.on('Hello', function () {
//         _self.sendHello();
//     });
//
//     /**
//      * Executes the java process to begin sending and receiving communication
//      */
//     _self.run = function () {
//         // Invoke the process
//         _javaSpawn = ChildProc.spawn(_self.javaPath, ['-jar', _self.jarPath]);
//
//         // Wire up events
//         _javaSpawn.stdout.on('data', onData);
//         _javaSpawn.stderr.on('data', onJavaError);
//         _javaSpawn.on('exit', function (code) {
//             console.log("The java program exited with code " + code + ".");
//         });
//
//         // Emit our own event to indicate to others that we have spawned
//         _self.emit('spawn', _javaSpawn);
//     }
//
//     // sends the hello request message
//     _self.sendHello = function () {
//         sendMessage(
//             {
//                 messageName : 'Hello',
//                 version     : '1.1'
//             });
//     }
//
//     // sends a message that will be echoed back as an Info message
//     _self.sendEcho = function (message) {
//         sendMessage(
//             {
//                 messageName : "Echo",
//                 message     : message
//             });
//     }
//
//     // sends a message telling the java app to exit
//     _self.sendGoodbye = function () {
//         sendMessage(
//             {
//                 "messageName" : "Goodbye"
//             });
//     }
//
//     /**
//      * Sends a message object as a JSON encoded string to the java application for processing.
//      */
//     function sendMessage(aMsg)
//     {
//         // convert to json.jsonld and prepare buffer
//         var aJsonString = JSON.stringify(aMsg);
//         var lByteLength = Buffer.byteLength(aJsonString);
//         var lMsgBuffer = new Buffer(4 + lByteLength);
//
//         // Write 4-byte length, followed by json.jsonld, to buffer
//         lMsgBuffer.writeUInt32BE(lByteLength, 0);
//         lMsgBuffer.write(aJsonString, 4, aJsonString.length, 'utf8');
//
//         // send buffer to standard input on the java application
//         _javaSpawn.stdin.write(lMsgBuffer);
//
//         _self.emit('sent', aMsg);
//     }
//
//     /**
//      * Receive data over standard input
//      */
//     function onData(data)
//     {
//
//         // Attach or extend receive buffer
//         _receiveBuffer = (null == _receiveBuffer) ? data : Buffer.concat([_receiveBuffer, data]);
//
//         // Pop all messages until the buffer is exhausted
//         while (null != _receiveBuffer && _receiveBuffer.length > 3)
//         {
//             var size = _receiveBuffer.readInt32BE(0);
//
//             // Early exit processing if we don't have enough data yet
//             if ((size + 4) > _receiveBuffer.length)
//             {
//                 break;
//             }
//
//             // Pull out the message
//             var json.jsonld = _receiveBuffer.toString('utf8', 4, (size + 4));
//
//             // Resize the receive buffer
//             _receiveBuffer = ((size + 4) == _receiveBuffer.length) ? null : _receiveBuffer.slice((size + 4));
//
//             // Parse the message as a JSON object
//             try
//             {
//                 var msgObj = JSON.parse(json.jsonld);
//
//                 // emit the generic message received event
//                 _self.emit('message', msgObj);
//
//                 // emit an object-type specific event
//                 if ((typeof msgObj.messageName) == 'undefined')
//                 {
//                     _self.emit('unknown', msgObj);
//                 }
//                 else
//                 {
//                     _self.emit(msgObj.messageName, msgObj);
//                 }
//             }
//             catch (ex)
//             {
//                 _self.emit('exception', ex);
//             }
//         }
//     }
//
//     /**
//      * Receive error output from the java process
//      */
//     function onJavaError(data)
//     {
//         _self.emit('java_error', data.toString());
//     }
// }
//
// // Make our JavaClient class an EventEmitter
// Util.inherits(JavaClient, EventEmitter);
//
// // export our class
// module.exports = JavaClient;


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


var client = require('./JavaClient');

var instance = new client();

instance.on('message', function(msg) {
    console.log('Received a message...');
    console.log(msg);
});

instance.on('sent', function(msg) {
    console.log('Sent a message...');
    console.log(msg);
});

instance.on('Info', function(msg) {
    console.log("Received info");
    console.log(msg.message);
});

(function() {
    // Start it up (Hello exchanges happen)
    instance.run();

    // Receive acknowledgement of hello
    instance.once('Info', function() {
        // Try echoing something
        instance.sendEcho("ECHO!");
    });

})();