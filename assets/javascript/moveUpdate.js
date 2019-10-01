function moveUpdate(move, playerType) {

    // Checks if move exists
    if (move !== 'none'){

        // Updates HTML to reflect move change
        let newText = (playerType === 'local') ? `Current move: ${move}` : 'Opponent has chosen their move'
        $(`#${playerType}-move`).text(newText);
        
        // Checks if both players have chosen moves
        let otherType = (playerType === 'local') ? 'opponent' : 'local'
        let otherPlayer = JSON.parse(localStorage.getItem(`${otherType}Player`))
        if (otherPlayer.move !== 'none') {
            // If both moves have been chosen and initialized then call the battle function
            battle(move, playerType, otherPlayer.move)
        }
    }

    // If move is empty, initialize appropriate text
    else {
        let newText = (playerType === 'local') ? `No move selected` : 'Waiting on opponent'
        $(`#${playerType}-move`).text(newText);    
    }

}