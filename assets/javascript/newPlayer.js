function newPlayer(name) {

    // Initialize new user object
    const user = {
        name: name,
        move: 'none',
        currentRecord: {
            wins: 0,
            ties: 0,
            losses: 0
        },
        allTimeRecord: {
            wins: 0,
            ties: 0,
            losses: 0,
            matches: {
                wins: 0,
                losses: 0,
            }
        }
    }

    // Save user as localPlayer in localStorage
    localStorage.setItem('localPlayer', JSON.stringify(user));

    // Save object as new user document on firestore
    firestoreUsers.add(user)
    .then(doc => {

        // Save document ID to local storage
        localStorage.setItem('localPlayerID', doc.id);
        
        // Initializes local player storage and listener
        loadPlayer(doc.id, 'local')

        // Start a new game with the users document ID
        newGame(doc.id);

    })
    .catch(error => {

        console.log('Error adding document:', error);
        
    })

}