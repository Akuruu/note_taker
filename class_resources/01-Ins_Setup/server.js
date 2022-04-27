const express = require('express');
const path = require('path');
// need to call the server method
const app = express();

// must be uppercase
const PORT = 3001;

// middleware - just a function
app.use(express.static('public'));

app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

app.get('/send', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/sendFile.html'))
);

app.get('/routes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/routes.html'))
);


// telling express to open up a socket connection on this PORT
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
