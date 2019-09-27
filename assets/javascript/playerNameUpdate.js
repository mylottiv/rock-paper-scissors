function playerNameUpdate(name, type) {

    // Sets player name on player card
    $(`#${type}-name`).text(name)

    // Toggles player card display to existing-user
    $(`#${type}-card`).toggleClass('float-card');

    // If local player is being updated
    if (type === 'local') {
    
        // Toggle out of new-user template
        $('#existing-user').toggleClass('hidden');
        $('#new-user').toggleClass('hidden');
    
    }

}