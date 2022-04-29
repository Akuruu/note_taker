// require the router and db items needed
const router = require('express').Router();
const db = require('../db/store');


// GET request
router.get('/notes', (req, res) => {
    db
    .getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err))
});

// POST request
router.post('/notes', (req, res) => {
    db 
    .newNote(req.body)
    .then((note) => res.json(note))
    .catch(err => res.status(500).json(err))
});

// DELETE a note
router.delete('/notes/:id', (req, res) => {
    db
    .deleteNote(req.params.id)
    .then(() => res.json({ ok:true}))
    .catch(err =>res.status(500).json(err))
});

//export the router
module.exports = router;