function initGameButtons() {
    // Initialize Rock, Paper, Scissors listeners
    $('.move-button').on('click', function(e) {

        e.preventDefault();

        // Captures which move was selected
        let move = $(this).data('move');

        // Loads player document ID
        let playerID = localStorage.getItem('localPlayerID');

        // Updates firestore database
        firestoreUsers.doc(playerID).set({move: move}, {merge: true})
        .then(() => {  
            console.log('Move successfully Saved!')
        })
        .catch(error => {
            console.log('Error setting document: ', error)
        });

        // This should then trigger the localPlayer document listener
        // Which will then call moveUpdate

    })
}