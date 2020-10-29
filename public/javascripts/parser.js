

function jsonParser(){
JSON.parse()
return getJson(parser);
}

//get json data from textarea and continuously update when next text is entered
function getJson(parser) {


    let json = $('#jsonData').val();

    $('#jsonData').change(function () {
        json = $(this).val();
    });

}

