function battle (move, playerType, otherMove) {

    // Sorts out local and opponent players
    let localPlayer = {
        ID: localStorage.getItem('localPlayerID'),
        currentRecord: JSON.parse(localStorage.getItem('localPlayer')).currentRecord,
        move: (playerType === 'local') 
        ? `${String.toUpperCase(move[0])}${move.substring(1)}` 
        : `${String.toUpperCase(otherMove[0])}${otherMove.substring(1)}`
    }
    let opponentMove = (playerType === 'opponent') ? move : otherMove;

    // If tie
    if (localPlayer.move === opponentMove) {

        // Updates local player current record ties
        localPlayer.currentRecord.ties++;

        // Updates game status display
        $('#game-status').text(`${localPlayer.move} draws with ${opponentMove}!<br>It's a draw!`);
    }
    
    // If win
    else if (((localPlayer.move === 'Paper') && (opponentMove === 'Rock')) ||
    ((localPlayer.move === 'Rock') && (opponentMove === 'Scissors')) ||
    ((localPlayer.move === 'Scissors') && (opponentMove === 'Paper'))) {
        
        // Updates local player current record wins
        localPlayer.currentRecord.wins++;
        
        // Updates game status display
        $('#game-status').text(`${localPlayer.move} beats ${opponentMove}!<br>You win!`);

    }

    // If loss
    else if (((localPlayer.move === 'Paper') && (opponentMove === 'Scissors')) ||
    ((localPlayer.move === 'Rock') && (opponentMove === 'Paper')) ||
    ((localPlayer.move === 'Scissors') && (opponentMove === 'Rock'))) {
        
        // Updates local player current record losses
        localPlayer.currentRecord.losses++;
        
        // Updates game status display
        $('#game-status').text(`${opponentMove} beats ${localPlayer.move}!<br>You lose!`);
    }

    // Updates firestore currentRecord only for local player (other client will handle opponent record
    firestoreUsers.doc(localPlayer.ID).set({

        // Reinitializes player move
        move: 'none',
        currentRecord: localPlayer.currentRecord
    }, {merge:true})    
    .then(() => {  
        console.log('Record updated successfully!')
    })
    .catch(error => {
        console.log('Error setting document: ', error)
    })

}