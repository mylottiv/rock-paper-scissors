// Setting up test functions to emulate neccessary dom manipulation
$(function(){
    //  Player card shadows will be triggered once a user has been initialized
    $('#local-button').click(e => {
        e.preventDefault();
        let card = $('#local-card');
        card.toggleClass('floating-card');
    });
    // Callback function to change gamespace upon game completion
    arenaFunction = function(e){
        e.preventDefault();
        let arena = $('#battle-arena');
        let currentGame = 
        `<div class='row'>
            <div class='col text-center'>
                <h5>Battle Arena:</h5>
                <p class='text-danger'>This is where status information is given</p>
            </div>
        </div>
        <div class='row'>
            <div class='col align-content-center'>
                <div class='row'>
                    <div class='col text-center'>
                        <h5>Choose your Destiny:</h5>
                    </div>
                </div> 
                <div class='row'>
                    <div class='col text-center'>
                        <button class='btn btn-primary'>Rock</button>
                    </div>
                    <div class='col text-center'>
                        <button class='btn btn-primary'>Paper</button>
                    </div>
                    <div class='col text-center'>                        
                        <button class='btn btn-primary'>Scissors</button>               
                    </div>
                </div>
                <div class='row mt-2'>
                    <div class='col text-center'>
                            <button class='btn btn-primary' id='arena-button'>Toggle</button>
                    </div>
                </div>
            </div>
        </div>`
        let newGame = `        
        <div class='row'>
            <div class='col text-center'>
                <h5>Battle Arena:</h5>
                <p class='text-danger'>You {Status}!</p>
            </div>
        </div>
        <div class='row'>
            <div class='col align-content-center'>
                <div class='row'>
                    <div class='col text-center'>
                        <h5>Ready to try again?</h5>
                    </div>
                </div> 
                <div class='row'>
                    <div class='col text-center'>
                        <button class='btn btn-primary' id='new-game-button'>New Game</button>
                    </div>
                </div>
                <div class='row mt-2'>
                    <div class='col text-center'>
                            <button class='btn btn-primary' id='arena-button'>Toggle</button>
                    </div>
                </div>
            </div>
        </div>`;
        if (arena.data('status') === 'current'){
            arena.data('status','new');
            arena.html(newGame);
        } 
        else if (arena.data('status') === 'new'){
            arena.data('status','current');
            arena.html(currentGame);
        }
        // Since button has been recreated, reinitialize listener
        $('#arena-button').click(arenaFunction);
    }
    // Initialize Arena button with callback
    $('#arena-button').click(arenaFunction);
    // Opponent card will have shadow added when an opponent has been downloaded from database
    $('#opponent-button').click(e => {
        e.preventDefault();
        let card = $('#opponent-card');
        card.toggleClass('floating-card')
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