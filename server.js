const express = require('express');
// const fs = require('fs');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Initializes the app and creates a port
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up body parsing. static and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Starts the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));