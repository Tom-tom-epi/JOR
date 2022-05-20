import $ from 'jquery';

$(function(){ 
    // alert("test");
    var button_form_character = document.getElementsByClassName('button_form_character');
    var button_dices = document.getElementsByClassName('button_dices');
    var dices = document.getElementsByClassName('dices');
    var form_character = document.getElementsByClassName('form_character');
    var button_card_characters = document.getElementsByClassName('button_card_characters');
    var cardCharacters = document.getElementsByClassName('cardCharacters');
    var forms = document.getElementsByClassName('form');
    var card_char = document.getElementsByClassName('char_card');
    console.log(button_dices);
    console.log(button_form_character);
    console.log(dices);
    console.log(form_character);
    console.log(button_card_characters);
    console.log(cardCharacters);
    console.log(forms);
    
    // alert("test");
    $(button_dices).text("test");
    $(button_dices).on('click', function() {
        alert("test");
        if($(dices).hasClass("displayed")) {
            $(dices).removeClass("displayed"); 
        }else {
            $(dices).addClass("displayed"); 
        }
    })

    $(".content_center").on("click", function() {
        alert("test");
        $(".displayed").removeClass("displayed");
    })


    $(button_form_character).on('click', function() {
        if($(form_character).hasClass("displayed")) {
            $(form_character).removeClass("displayed"); 
        }else {
            $(forms).removeClass("displayed");
            $(form_character).addClass("displayed"); 
        }
    })

    $(button_card_characters).on('click', function() {
        if($(cardCharacters).hasClass("displayed")) {
            $(cardCharacters).removeClass("displayed"); 
        }else {
            $(cardCharacters).addClass("displayed"); 
        }
    })
});