//TODO: jquery event listener for when text entered into text area, when entered, getJson called,
// data is updated onto new value and then sent to the parser that attempts to stringify it
// and uses java api to put into correct glyphs.

//get json data from textarea and continuously update when next text is entered

module.exports = {

    textarea: document.getElementById('main-textarea'),

    newtextarea: document.getElementById('tester'),

    getJSON: function () {
        json = $('#main-textarea').val();

        setJSON(json);
    },

    setJSON: function (jsonUpdate) {
        $('#main-textarea').on('input propertychange paste', function () {
            jsonUpdate = $(this).val();

            $("#tester").val(jsonUpdate);
        });
    },

    // parser: function () {
    //
    // }

}



var form = document.querySelector('form');
form.addEventListener('change', function() {
    alert('Hi!');
});

function updateResult() {
    result.textContent = textarea.value;
}

textarea.onkeyup = updateResult;

