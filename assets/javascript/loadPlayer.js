function loadPlayer(playerID, playerType) {

    console.log(playerID,);
    // Initializes firestore listener for player
    firestoreUsers.doc(playerID).onSnapshot(doc => {

        let cloudPlayer = doc.data();
        let testLoad = localStorage.getItem(`${playerType}Player`)
        let savedPlayer = (testLoad !== undefined) ? JSON.parse(testLoad) : false;

        // Updates player name on initial load
        if ((!savedPlayer) || (cloudPlayer.name !== savedPlayer.name) ||
        ($(`#${playerType}-name`).text() === `${playerType}Player`)) {

            // Set player card HTML
            playerNameUpdate(cloudPlayer.name, playerType);

        }

        // If move is updated
        if ((savedPlayer.move) && (savedPlayer.move !== cloudPlayer.move)) {

            // Call move updater for relevant player
            moveUpdate(cloudPlayer.move, playerType);
        }

        // If current record is updated
        if ((!savedPlayer) || (savedPlayer.currentRecord !== cloudPlayer.currentRecord)) {

            // Call update method for currentRecord
            playerRecordUpdate(cloudPlayer.currentRecord, playerType, 'current');

        }

        // If all time record updated
        if ((!savedPlayer) || (savedPlayer.allTimeRecord !== cloudPlayer.allTimeRecord)) {

            // Call update method for allTimeRecord
            playerRecordUpdate(cloudPlayer.allTimeRecord, playerType, 'all-time');

        }

        // Update player saved in local storage
        localStorage.setItem(`${playerType}Player`, JSON.stringify(cloudPlayer));

    })

    // If opponent is loaded then game can begin
    if (playerType === 'opponent') {
        
        // Toggle display of current game arena
        $('#battle-arena-new').toggleClass('hidden');
        $('#battle-arena-current').toggleClass('hidden');

    }
}