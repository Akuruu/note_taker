// require path and router items needed
const path = require('path');
const router = require('express').Router();

// need to add the router.get functionality for each of the hhtml pages
// notes page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(_dirname, "../public/notes.html"));
});

router.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, "../public/index.html"));
});

// export the routes
module.exports = router; 