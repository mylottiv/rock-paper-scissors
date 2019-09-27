function moveUpdate(move, playerType) {

    const playerTypes = ['local', 'opponent']

    // Checks if move exists
    if (move !== 'none'){

        // Updates HTML to reflect move change
        let newText = (playerType === 'local') ? `Current move: ${move}` : 'Opponent has chosen their move'
        $(`#${playerType}-move`).text(newText);
        
        // Checks if both players have chosen moves
        let otherType = (playerType === 'local') ? 1 :0
        let otherPlayer = JSON.parse(localStorage.getItem(`${playerTypes[otherType]}Player`))
        if (otherPlayer.move !== '') {
            battle(move, playerType, otherPlayer.move)
        }
    }

    // If move is empty, initialize appropriate text
    else {
        let newText = (playerType === 'local') ? `No move selected` : 'Waiting on opponent'
        $(`#${playerType}-move`).text(newText);    
    }

}