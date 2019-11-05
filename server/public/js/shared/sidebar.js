$(document).ready(function() {
    $.get( "http://localhost:3010/api/users/6", function(res) {
        user = res[0];
        $("#fh5co-logo").html(user.firstname + " " + user.lastname);
    })
        .done(function() {
            //alert( "second success" );
        })
        .fail(function() {
           // alert( "error" );
        })
        .always(function() {
           // alert( "finished" );
        });
});