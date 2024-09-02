//IMPORTS
const router = require('express').Router();
const { v4 } = require('uuid');

const { getNotes, saveNotes } = require('../db');

//API Routes
router.get('/notes', async (requestObj, responseObj) => {
    const notes = await getNotes();

    responseObj.json(notes);
});

// Receiving form data to create a note and sends the user back to the homepage
router.post('/notes', async (requestObj, responseObj) => {
    const id = v4();

    const notes = await getNotes();
    const newNote = {
        id: id,
        title: requestObj.body.title,
        text: requestObj.body.text
    };

    notes.push(newNote);

    await saveNotes(notes);

    responseObj.json(newNote);
});

// A Delete Rotuer
router.delete('/notes/:id', async (requestObj, responseObj) => {

    const notes = await getNotes()
    const noteId = requestObj.params.id;
    const noteDelete = notes.find(note => note.id === noteId);

    if (noteDelete) {

        const updateNotes = notes.filter(note => note.id !== noteId);

        await saveNotes(updateNotes);

        responseObj.json();
    }
});



module.exports = router;