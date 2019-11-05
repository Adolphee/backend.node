$("#register-button").click(function(event){
    event.preventDefault();

    $('form').fadeOut(500);
    $('.wrapper h1').html("Coming soon ...");
    $('.wrapper').addClass('form-success');
});