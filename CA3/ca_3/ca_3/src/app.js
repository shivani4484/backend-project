const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const carWash = require('./notes.js');

const publicDirectoryPath = path.join(__dirname, '../paths');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Bookshelf ',
    name: 'Chitransh'
  });
});

app.post('/Read', (req, res) => {
  const { BookName, Genres, AuthorName, Rating } = req.body;
  carWash.ReadBookshelf(BookName, Genres, AuthorName, Rating); 
  const Borrowers = carWash.listBorrowers();
  res.render('Read', { Borrowers: Borrowers });
});


app.get('/cancel', (req, res) => {
  res.render('cancel', {
    title: 'Cancel Borrower'
  });
});

// Handle the form submission (POST request)
app.post('/cancel', (req, res) => {
  const { BookName } = req.body;
  // Call the cancelBookshelf function with the BookName received from the form
  carWash.cancelBookshelf(BookName);
  // Redirect the user to the homepage or another appropriate page
  res.redirect('/');
});

app.get('/allAppointments', (req, res) => {
  const Borrowers = carWash.listBorrowers();
  res.render('allAppointments', { Borrowers });
});


app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Chitransh'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text',
    title: 'Help',
    name: 'Chitransh'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Chitransh',
    errorMessage: 'Page not found'
  });
});

// Start the server
app.listen(2600, () => {
  console.log('Server is up on port 2600.');
});
