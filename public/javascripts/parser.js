//get json data from textarea and continuously update when next text is entered
function getJson() {


    var text = $('#jsonData').val();

    $('#jsonData').change(function () {
        text = $(this).val();
    });

}

