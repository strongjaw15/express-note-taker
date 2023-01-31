const express = require('express');
const { v4: uuidv4 } = require('uuid')
const path = require('path');

const app = express(); 
const PORT = process.env.PORT || 3001;

// Here we tell Express where our folder is for static assets
app.use(express.static('public'));

// Here we set up express to properly read and parse form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route Listeners Go Here

// Home page route
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/')));

// Route with a wildcard 
app.get("/api/product/:id", (req, res) => {
  // we access the value of the wildcard via req.params
  // we might use that wildcard to lookup a database record
  // we send back whatever is appropriate
})

// This is the route for notes.html
app.get('/api/notes', (req, res) => {res.sendFile(path.join(__dirname, '/public/notes.html'))})

//  /api/product?sortby=name&sortdir=asc
app.get("/api/product", (req, res) => {
  // use req.query to get any possible url params that were submitted
})

app.post('/api/review', (req, res) => {
  // any data that is submitted will be available in req.body

  res.status(200).json({ result: "success"} )
})

app.put("/api/product/:id", (req, res) => {
  // any data that is submitted will be available in req.body

  res.status(400).json({ result: "error", msg: "Gimme a real id" })
})

app.delete("/api/product/:id", (req, res) => {
  // any data that is submitted will be available in req.body
})

// Catch-all route -- must be last in the list of routes
app.get("*", (req, res) => res.sendFile(path.join(__dirname, '/public/404.html')))


// Here we tell Express to start listening for request
app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);