$(() => {

    // Initialize game buttons
    initGameButtons();

    // Initialize Firestore
    firestore = initFirestore();
    firestoreUsers = firestore.collection('users');
    firestoreGames = firestore.collection('games');

    // Checks localStorage for player ID
    let localPlayerID = localStorage.getItem('localPlayerID');
    let currentGame = localStorage.getItem('gameID');
    let opponentPlayerID = localStorage.getItem('opponentPlayerID');
    if ((localPlayerID) && (localPlayerID !== '')) {

        // Initializes local player
        loadPlayer(localPlayerID, 'local')

        // Checks if existing game
        if (currentGame) {

            // If you have an opponent
            if (opponentPlayerID) {
            
                // Initializes opponent player
                loadPlayer(opponentPlayerID, 'opponent')
            }

            // Otherwise reinitialize listener for a new challenger
            else {
                firestoreGames.doc(currentGame).onSnapshot(doc => {

                    // If an opponent has joined
                    console.log(doc.data().joinID)
                    if (doc.data().joinID !== 'none') {
                        
                        // Save opponentID to localstorage
                        localStorage.setItem('opponentID', doc.data().joinID);
                        
                        // Load new opponent
                        loadPlayer(doc.data().joinID, 'opponent');
        
                    }
        
                })
            }
        }

        // Else create a new game
        else {

            newGame(localPlayerID)

        }
    }

    // If no local player
    else {

        console.log('no local player');
        // Initialize newPlayer listener
        $('#new-player-button').click(e => {

            // Prevents page refresh
            e.preventDefault();
            
            // Captures user input for name of new User
            let input = $('#new-player-input').val();
            newPlayer(input);

        })
    }
})