const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.json());


const submissions = [];


app.post('/submit', (req, res) => {
  const { title, author, category, content, tags } = req.body;
  const newSubmission = { title, author, category, content, tags: tags || '' };
  submissions.push(newSubmission);
  res.send('Your work has been submitted successfully!');
});

app.get('/explore', (req, res) => {
  res.json(submissions);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
