const express = require('express');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const path = require('path');
const database = require('./db/db.json')

const app = express(); 
const PORT = process.env.PORT || 3001;

// Here we tell Express where our folder is for static assets
app.use(express.static('public'));

// Here we set up express to properly read and parse form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home page route
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/')));

// This is the route for get notes.
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
})

// This is the route for get api notes.
app.get('/api/notes', (req, res) => {
  res.json(database)
})

// This is the route for post notes.
app.post('/api/notes', (req, res) => {
  console.log(req.body)
  postNotes(req)
  res.status(200).json(database)
})

// This writes the notes to the database.
const postNotes = req => {
  const {title, text} = req.body
  const newNote = {
    title,
    text,
    noteId: uuidv4()
  }
  const notes = JSON.parse(fs.readFile(database))
  notes.push(newNote)
  fs.writeFile(database, JSON.stringify(notes))
  return database
}

// Catch-all route -- must be last in the list of routes
app.get("*", (req, res) => 
  res.sendFile(path.join(__dirname, '/public/404.html'))
)

// Here we tell Express to start listening for request
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);