// Setting up test functions to emulate neccessary dom manipulation
$(function(){
    //  Player card shadows will be triggered once a user has been initialized
    $('.local-button').click(e => {
        e.preventDefault();
        let card = $('#local-card');
        card.toggleClass('float-card');
        $('#existing-user').toggleClass('hidden');
        $('#new-user').toggleClass('hidden');
    });
    // Toggles between game and new game battle arena card
    $('.arena-button').click(e => {
        e.preventDefault();
        $('#battle-arena-new').toggleClass('hidden');
        $('#battle-arena-current').toggleClass('hidden');
    });
    // Opponent card will have shadow added when an opponent has been downloaded from database
    $('#opponent-button').click(e => {
        e.preventDefault();
        let card = $('#opponent-card');
        card.toggleClass('float-card')
    });
    // Chat will update when a new message is sent to database
    $('#chat-button').click(e => {
        e.preventDefault();
        let input = $('#chat-input').val();
        let newMessage = $('<p>').text(input);
        newMessage.addClass('row');
        $('#chat-box').append(newMessage);
    })
})