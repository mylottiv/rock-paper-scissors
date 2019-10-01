function hostGame(playerID) {
    // Creates new game document on firestore
    firestoreGames.add({
        hostID: playerID,
        joinID: 'none',
        open: true,
        complete: false,
        // A debug flag
        matches: true
    })
    .then(doc => {
        
        gameID = doc.id;

        // Saves gameID to localStorage
        localStorage.setItem('gameID', gameID)

        // Sets game listener for a joiner
        firestoreGames.doc(gameID).onSnapshot(snapshot => {

            // If an opponent has joined
            if (snapshot.data().joinID !== 'none') {
                
                // Save opponentID to localstorage
                localStorage.setItem('opponentID', snapshot.data().joinID);

                // Load new opponent
                console.log('Opponent found! Loading', snapshot.data().joinID)
                loadPlayer(snapshot.data().joinID, 'opponent');

            }

        })
    })
    .catch(error => {
        console.log('Error adding document:', error)
    })

}