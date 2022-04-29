// Require path and router items needed
const path = require('path');
const router = require('express').Router();

// Notes page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});
// Index page
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Export the router
module.exports = router; 