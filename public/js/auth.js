$(document).ajaxStart(() => {
    $('#login-form').hide();
    $('#loading-wheel').show();
}).ajaxStop(() => {
    $('#loading-wheel').hide();
});

const HOST = "https://cepbruxelles.herokuapp.com";
//const HOST = "http://localhost:3010";

$(document).ready(function(){

    for(var i = 0; i <= 30; i++){
        $('.bg-bubbles').append('<li></li>');
    }

    let username = $('#username'),
        password = $('#password'),
        legend = $('#fields legend'),
        loginButtons = $('#login-buttons'),
        firstname = $('#firstname'),
        lastname = $('#lastname'),
        passwordConfirm = $('#password-confirm'),
        email = $('#email'),
        loginFields = [ username, password ],
        registerFields = [
            firstname, lastname, email, loginFields[0], loginFields[1], passwordConfirm
        ];

    $("#login-button").click((event) => {
        event.preventDefault();
        if(validate(loginFields)) {
            $.post( `${HOST}/api/auth/`,
                {
                    "username": username.val(),
                    "password": password.val()
                },function(res) {
                    $('.wrapper h1').html(`Welcome ${res.firstname} !!`);
                    $('.wrapper').addClass('form-success');
                }).done(function() {
                    setCookie("username", username.val());
                window.location.replace("./home.html");
            }).fail(function() {
                    $('#label-username').empty().append("Invalid username or password.");
                    $('#login-form').show();
                    // TODO: Alert the user properly
                }).always(function() {
                    // TODO: Refresh a few elements or something idk
                });
            }
        });

    $('#register-button').on('click', function(){
        validate(loginFields, true);
        loginButtons.hide().removeClass("show");
        legend.text('Register');
    });

    $('#cancel-register-button').on('click',  function(){
        validate(registerFields, true);
        loginButtons.show().addClass("show");
        legend.text("Login");
    });

    $('#submit-register-button').on('click',  function(event){
        event.preventDefault();
        // remove warnings
        validate(registerFields, true);
        // TODO: Some validation
        let isFormValid = validate(registerFields);
        if(isFormValid){
            $('form').fadeOut(500);
            $('.wrapper h1').html(`Coming Soon !!`);
            $('.wrapper').addClass('form-success');
            $.post( `${HOST}/api/users`,
                {
                    "username": username.val(),
                    "password": password.val(),
                    "firstname": firstname.val(),
                    "lastname": lastname.val(),
                    "email": email.val()
                },function(res) {
                    $('.wrapper h1').html(`Welcome ${res.firstname} !!`);
                    $('.wrapper').addClass('form-success');
                }).done(function(res) {
                // TODO: Set cookies and open home page
                setCookie("userid", res.id);
                window.location.replace("./home.html");
            }).fail(function(res) {
                    $('#login-form').hide();
                    // TODO: Alert the user properly
                }).always(function() {
                    // TODO: Refresh a few elements or something idk
                });
        } else {
            // TODO: Send information for server-side validation
            legend.text("Register");
        }

        // TODO: Update field borders accordingly

        // TODO: OK? --> Set cookies / Session & load Home Page
    });
});

function validate(fields, reset=false){
    let isFormValid = true;
    let password = $('#password');
    fields.forEach(input => {
        let label = $(`#label-${input.attr('id')}`);
        if(reset) {
            input.css({'border': '1px solid rgba(255, 255, 255, 0.4)'});
            label.empty();
        } else if(input.val() === ''){
            input.css({ 'border-color': 'red' });
            let message = input.attr('id') !== "password-confirm"?
                `${input.attr('id')} is required.` : `Please confirm password`;
            label.empty().append(message);
            isFormValid = false;
        } else if(input.attr('id') === "password-confirm"){
            if(!validatePassword(input, password)){
                isFormValid = false;
            }
        } else if(input.attr('id') === "email"){
            if(!validateEmail(input)){
                input.css({ 'border-color': 'red' });
                label.empty().append("This is not a valid email address.");
                isFormValid = false;
            }
            console.log("email: " + isFormValid);
        }
    });
    return isFormValid;
}

function validatePassword(input, password) {
    let isFormValid = true;
    input.css({ 'border-color': 'red' });
    password.css({ 'border-color': 'red' });
    let label = $(`#label-${input.attr('id')}`);
    if(password.val().length < 6) {
        $(`#label-${password.attr('id')}`).empty().append("Password requires at least 6 characters.")
        isFormValid = false;
    } else if(input.val() !== password.val()){
        label.empty().append("Passwords don't match.");
        isFormValid = false;
    } else {
        input.css({'border': '1px solid rgba(255, 255, 255, 0.4)'});
        password.css({'border': '1px solid rgba(255, 255, 255, 0.4)'});
        label.empty();
    }
    return isFormValid;
}

function validateEmail(input) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(input.val()).toLowerCase());
}

function setCookie(cname, cvalue, exdays = 1) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user == "") {
        window.location.replace("home.html");
    }
}