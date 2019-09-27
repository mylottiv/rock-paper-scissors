function joinGame (playerID, gameID) {
    // Adds local player as "joiner" to firestore game
    firestoreGames.doc(gameID).set({
        joinID: playerID,
        // Closes game to new players
        open: false
    }, {merge: true})
    .then(() => {  
        console.log('Game successfully joined!')
    })
    .catch(error => {
        console.log('Error setting document: ', error)
    })
        
    // Calls the game document
    firestoreGames.doc(gameID).get().then(doc => {

        // Save opponentID to localstorage
        localStorage.setItem('opponentID', doc.data().hostID);

        // Initializes opponent from "host" ID
        loadPlayer(doc.data().hostID, 'opponent');

    })

    // Saves gameID to localStorage
    localStorage.setItem('gameID', gameID);
}