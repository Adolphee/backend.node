$(document).ready(function() {
    const HOST = "https://cepbruxelles.herokuapp.com";
    $.get( `${HOST}/api/users/6`, function(res) {
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