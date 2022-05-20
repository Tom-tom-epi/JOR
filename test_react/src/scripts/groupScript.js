import $ from 'jquery';

$(function() {
    var btn_up_turn = document.getElementsByClassName("upTurn");
    var card_char = document.getElementsByClassName('char_card');

    $(btn_up_turn).on('click', function() {
      let nbrCard = card_char.length; 
      for(let i = 0; i < nbrCard; i++) {
        let order = $($(card_char)[i]).css("order");
        
        if(order == 0) {
          $($(card_char)[i]).css("order", nbrCard);
        }else {
          $($(card_char)[i]).css("order", (order - 1));
        }
      }
    })
})