$('#register-form').hide();
$(document).ready(function(){
    for(var i = 0; i <= 30; i++){
        $('.bg-bubbles').append('<li></li>');
    }

    $("#login-button").click(function(event){
        event.preventDefault();

        const HOST = "https://cepbruxelles.herokuapp.com";
        $.post( `${HOST}/api/auth/`,
            {
                "username": $('#username').val(),
                "password": $('#password').val()
            },function(res) {
             $('form').fadeOut(500);
             $('.wrapper h1').html(`Welcome ${res.firstname} !!`);
             $('.wrapper').addClass('form-success');
        }).done(function() {
                // TODO: Set cookies and open home page
            })
            .fail(function() {
                 alert( "Invalid credentials." );
                 // TODO: Alert the user properly
            })
            .always(function() {
                // TODO: Refresh a few elements or something idk
            });


    });

    $('#register-button').on('click', function(){
        $('#login-form').hide();
        $('#register-form').fadeIn(500);
    });

    $('#cancel-register-button').on('click',  function(){
        $('#register-form').hide();
        $('#login-form').fadeIn(1000);
    });

    $('#submit-register-button').on('click',  function(){
        $('form').fadeOut(500);
        $('.wrapper h1').html(`Coming Soon !!`);
        $('.wrapper').addClass('form-success');
    });
});

