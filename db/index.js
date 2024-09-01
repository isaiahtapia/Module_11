const fs = require('fs').promises;

async function getNotes() {
    const rawData = await fs.readFile('./db/db.json', 'utf8');

    // Return the array of notes from notes.json
    return JSON.parse(rawData)
}

async function saveNotes(updatedNotesArray) {
    // Overwrite/Replace the notes.json array
    await fs.writeFile('./db/db.json', JSON.stringify(updatedNotesArray, null, 2));

    console.log('your notes that json file was updated!')

}

module.exports = {
    getNotes: getNotes,
    saveNotes: saveNotes,
}