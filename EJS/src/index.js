require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan')
const methodOverride = require('method-override')
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session')
const path = require('path')
const route = require('./routes')
const db = require('../config/db')

// Database
db.connect()

// Morgan
app.use(morgan('combined'))

// Express Body-parser: Handle data types such as JSON, Raw, Text, URL, etc.
app.use(express.urlencoded({ extended: true })) 
app.use(express.json())

// Method override
app.use(methodOverride('_method'))

// Session
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Make session data available to all views (Mostly for Header + Footer)
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Path
app.set('views', path.join(__dirname, 'views'))

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Change Front-end's files' type to ejs
app.set('view engine', 'ejs')

// Use express-ejs-layouts middleware
app.use(expressLayouts);

// Specify the default layout
app.set('layout', 'layouts/main');

// Route
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})