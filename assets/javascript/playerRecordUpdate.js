function playerRecordUpdate(record, playerType, recordType) {

    let leader = (recordType === 'current') 
        ? 'Current record' 
        : 'All-time record';
    let matches = (recordType === 'all-time')
        ? `<br>Matches: W:${record.matches.wins} L:${record.matches.losses}` 
        : '';
    $(`#${playerType}-${recordType}-record`).text(
        `${leader}: W:${record.wins} T:${record.ties} L:${record.losses} ${matches}`)

}