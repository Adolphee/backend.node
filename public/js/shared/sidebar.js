$(document).ready(function() {
     const HOST = "https://cepbruxelles.herokuapp.com";
    //const HOST = "http://localhost:3010";
    const userid = getCookie("userid");
    if(userid){
        $.get( `${HOST}/api/users/${userid}`, function(res) {
            user = res[0];
            console.log(JSON.stringify(res));
            console.log(JSON.stringify(getCookie("userid")));
            let fullname = user.firstname + " ";
            fullname += user.lastname.length > 10? user.lastname[0] + ".": user.lastname;
            $("#fh5co-logo").html(fullname);
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
    } else {
        window.location.replace("index.html");
    }

    $('#logout').click((event) => {
        setCookie("userid", "", -12);
    });
});