//TODO: jquery event listener for when text entered into text area, when entered, getJson called,
// data is updated onto new value and then sent to the parser that attempts to stringify it
// and uses java api to put into correct glyphs. possible use of res to dynamically get value

//get json data from textarea and continuously update when next text is entered
const events = require('events');
const eventEmitter = new events.EventEmitter();
const cheerio = require('cheerio');
const fs = require('fs');
const $ = cheerio().load(fs.readFileSync('./layout.ect'));







//if the value changes, via input or paste, it will emit the input event with the param of json
$('textarea[id="main-textarea"]').on('input', function () { // propertychange paste

    let json = $('textarea[id="main-textarea"]').val();
    eventEmitter.emit('input', json);

});

//on recieving the event, the value will be parsed
eventEmitter.on('input', function (json) {
    $('div[id="tester"]').val(json).html();

});


// module.exports = {
//
//
//     getJSON: function (json) {
//         console.log('reached getJSON');
//        // this.setJSON($('#main-textarea').val());
//        // let json = $('#main-textarea');
//
//        //  $(json).on('input propertychange paste', function () {
//         //    console.log(json);
//       //      $('#tester').html(json);
//       // });
//     },
//
//     setJSON: function (json) {
//
//         // setInterval(function() {
//         //     console.log(json);
//         //     //  $('#tester').html(json);
//         // });
//
//         // $('#main-textarea').on('input propertychange paste', function () {
//         //     jsonUpdate = $(this).val();
//         //     $("#tester").val(jsonUpdate);
//         // });
//     },
//
//
//
// }


//Link dom to indexjs allow it to run scripts,scripts work based on jquery functions

//Event handler attributes, like <div onclick="">, are also governed by this setting; they will not function unless runScripts is set to "dangerously". (However, event handler properties,
// like div.onclick = ..., will function regardless of runScripts.)
//
// If you are simply trying to execute script "from the outside", instead of letting <script> elements and event handlers attributes run "from the inside", you can use the runScripts:
// "outside-only" option, which enables fresh copies of all the JavaScript spec-provided globals to be installed on window. This includes things like window.Array, window.Promise, etc.
// It also, notably, includes window.eval, which allows running scripts, but with the jsdom window as the global:
//
// const { window } = new JSDOM(``, { runScripts: "outside-only" });
//
// window.eval(`document.body.innerHTML = "<p>Hello, world!</p>";`);
// window.document.body.children.length === 1;