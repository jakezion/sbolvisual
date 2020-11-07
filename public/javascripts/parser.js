const events = require('events');
const eventEmitter = new events.EventEmitter();









/*

//TODO: jquery event listener for when text entered into text area, when entered, getJson called,
// data is updated onto new value and then sent to the parser that attempts to stringify it
// and uses java api to put into correct glyphs. possible use of res to dynamically get value

//get json data from textarea and continuously update when next text is entered

const cheerio = require('cheerio');
const fs = require('fs');
const $ = cheerio().load(fs.readFileSync('./views/layout.ect'));

//if the value changes, via input or paste, it will emit the input event with the param of json

$('textarea[id="main-textarea"]').on('input', function () { // propertychange paste

    let json = $('textarea[id="main-textarea"]').val();
    eventEmitter.emit('input', json);

});

//on recieving the event, the value will be parsed
eventEmitter.on('input', function (json) {
    $('div[id="tester"]').val(json).html();

});
*/
