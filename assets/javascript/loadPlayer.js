function loadPlayer(playerID, playerType) {

    console.log('Loading ',playerType, playerID,);
    // Initializes firestore listener for player
    firestoreUsers.doc(playerID).onSnapshot(doc => {

        // The version of the player downloaded from firestore
        let cloudPlayer = doc.data();
        
        // Try to load the player from local storage first
        let testLoad = localStorage.getItem(`${playerType}Player`)
        let savedPlayer = (testLoad !== undefined) ? JSON.parse(testLoad) : false;
        console.log('Saved player is ', savedPlayer)

        // Goes through and checks every stat for updates

        // Updates player name if new player, first load, or if changed on database
        if ((!savedPlayer) || (cloudPlayer.name !== savedPlayer.name) ||
        ($(`#${playerType}-name`).text() === `${playerType}Player`)) {

            // Set player card HTML
            console.log('Updating player name', playerType, cloudPlayer.name)
            playerNameUpdate(cloudPlayer.name, playerType);

        }

        // Only updates move if a value for savedPlayer exists
        if ((savedPlayer) && (savedPlayer.move !== cloudPlayer.move)) {

            // Call move updater for relevant player
            console.log('Updating player move', playerType, cloudPlayer.move)
            moveUpdate(cloudPlayer.move, playerType);
        }

        // If current record is updated
        if ((!savedPlayer) || (savedPlayer.currentRecord !== cloudPlayer.currentRecord)) {

            // Call update method for currentRecord
            console.log('Updating player record', playerType, cloudPlayer.currentRecord)
            playerRecordUpdate(cloudPlayer.currentRecord, playerType, 'current');

        }

        // If all time record updated
        if ((!savedPlayer) || (savedPlayer.allTimeRecord !== cloudPlayer.allTimeRecord)) {

            // Call update method for allTimeRecord
            console.log('Updating player record', playerType, cloudPlayer.allTimeRecord)
            playerRecordUpdate(cloudPlayer.allTimeRecord, playerType, 'all-time');

        }

        // Update player saved in local storage
        localStorage.setItem(`${playerType}Player`, JSON.stringify(cloudPlayer));

    })

    // If opponent is loaded then game can begin
    if (playerType === 'opponent') {

        // Flag in console
        console.log('Opponent loaded! Match can begin!');

        // Toggle display of current game arena
        $('#battle-arena-new').toggleClass('hidden');
        $('#battle-arena-current').toggleClass('hidden');

    }
}