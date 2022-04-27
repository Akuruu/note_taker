const express = require('express');
// Helper function to sort our data in ascending and descending order
const { sortData } = require('./sortData');
const termData = require('./terms.json');

const PORT = 3001;

const app = express();

const sortHelper = (type) =>
  termData.sort(sortData('term', 'relevance', `${type}`));

// TODO: Add a comment describing the functionality of this route
 // selecting all the terms
app.get('/api/terms/', (req, res) => {
  // TODO: Add a comment describing the req.query object

  const hasQuery = Object.keys(req.query).length > 0;
// sorts results in descending order
  if (hasQuery && req.query.sort === 'dsc') {
    return res.json(sortHelper('dsc'));
  }
// sorts results in ascending order
  if (hasQuery && req.query.sort === 'asc') {
    return res.json(sortHelper('asc'));
  }

  // If there is no query parameter, return terms
  return res.json(termData);
});

// TODO: Add a comment describing what this route will return

app.get('/api/term/:term', (req, res) => {
  // TODO: Add a comment describing the content of req.params in this instance

  const requestedTerm = req.params.term.toLowerCase();
// checking to see if requested term matches the database
  for (let i = 0; i < termData.length; i++) {
    if (requestedTerm === termData[i].term.toLowerCase()) {
      return res.json(termData[i]);
    }
  }

  // Return a message if the term doesn't exist in our DB
  return res.json('No term found');
});

// TODO: Add a comment describing what this route will return

app.get('/api/terms/:category', (req, res) => {
  const requestedCategory = req.params.category.toLowerCase();
  //going through the array of terms
  const result = [];
  for (let i = 0; i < termData.length; i++) {
    // checking to see if the requested category matches whats in the database
    const currentTermCategory = termData[i].category;
    if (requestedCategory === currentTermCategory) {

      result.push(termData[i]);
    }
  }
  return res.json(result);
});

// TODO: Add a comment describing what this route will return

app.get('/api/categories', (req, res) => {
  // map makes a new array with just the categories
  const categories = termData.map((term) => term.category);
// 
  const result = categories.filter((cat, i) => categories.indexOf(cat) === i);

  return res.json(result);
});

app.listen(PORT, () =>
  console.info(`Example app listening at http://localhost:${PORT} 🚀`)
);
