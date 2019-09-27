function hostGame(playerID) {
    // Creates new game document on firestore
    firestoreGames.add({
        hostID: playerID,
        joinID: 'none',
        open: true,
        complete: false
    })
    .then(doc => {
        
        gameID = doc.id;

        // Saves gameID to localStorage
        localStorage.setItem('gameID', gameID)

        // Sets game listener for a joiner
        firestoreGames.doc(gameID).onSnapshot(doc => {

            // If an opponent has joined
            if (doc.data().joinID !== 'none') {
                
                // Save opponentID to localstorage
                localStorage.setItem('opponentID', doc.data().joinID);

                // Load new opponent
                loadPlayer(doc.data().joinID, 'opponent');

            }

        })
    })
    .catch(error => {
        console.log('Error adding document:', error)
    })

}