$(document).ajaxStart(() => {
    $('#login-form').hide();
    $('#loading-wheel').show();
}).ajaxStop(() => {
    $('#loading-wheel').hide();
});

$(document).ready(function(){
    for(var i = 0; i <= 30; i++){
        $('.bg-bubbles').append('<li></li>');
    }

    $("#login-button").click((event) => {
        event.preventDefault();
        let username = $('#username');
        let password = $('#password');

        let isFormValid = validate(username) &&  validate(password);

        if(isFormValid) {
            const HOST = "https://cepbruxelles.herokuapp.com";
            $.post( `${HOST}/api/auth/`,
                {
                    "username": username.val(),
                    "password": password.val()
                },function(res) {
                    $('.wrapper h1').html(`Welcome ${res.firstname} !!`);
                    $('.wrapper').addClass('form-success');
                }).done(function() {
                // TODO: Set cookies and open home page
            })
                .fail(function() {
                    $('#label-username').empty().append("Invalid username or password.");
                    $('#login-form').show();
                    // TODO: Alert the user properly
                })
                .always(function() {
                    // TODO: Refresh a few elements or something idk
                });
        }

    });

    $('#register-button').on('click', function(){
        let loginButtons = $('#login-buttons').hide();
        loginButtons.removeClass("show");
    });

    $('#cancel-register-button').on('click',  function(){
        let loginButtons = $('#login-buttons').show();
        loginButtons.addClass("show");
    });

    $('#submit-register-button').on('click',  function(event){
        event.preventDefault();
        $('form').fadeOut(500);
        $('.wrapper h1').html(`Coming Soon !!`);
        $('.wrapper').addClass('form-success');

        // TODO: Some validation

        // TODO: Update field borders accordingly

        // TODO: OK? --> Set cookies / Session & load Home Page
    });
});

function validate(field){
    let label = $(`#label-${field.attr('id')}`);
    console.log(`#label-${field.attr('id')}`);
    if(field.val() === ''){
        field.css({ 'border-color': 'red' });
        label.empty().append("Username is required.");
        return false;
    }
    field.css({'border': '1px solid rgba(255, 255, 255, 0.4)'});
    label.empty();
    return true;
}