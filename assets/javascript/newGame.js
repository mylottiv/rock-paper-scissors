function newGame(playerID){

    // Queries Firestore games collection for open games
    firestoreGames.where('open', '==', true).get()
    .then(snapshot => {

        // If an open game is available
        if (snapshot.docs[0]) {

            // Join the game
            joinGame(playerID, snapshot.docs[0].id);

        }

        // Otherwise
        else{

            // Create, or 'host', a new Game on firestore
            hostGame(playerID)
        }
    })
    .catch(error => {
        console.log('Error retrieving documents', error);
    })
}