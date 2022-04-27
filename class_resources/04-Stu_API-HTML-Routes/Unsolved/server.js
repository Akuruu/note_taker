// Import express
const express = require('express');
// Import 'terms.json' file
const terms = require('./terms.json');
const PORT = 3001;

// Initialize app variable
const app = express();
// GET request that will return the content of our `terms.json` file

app.get('/', (req,res) => {
  res.json(terms);
});


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
