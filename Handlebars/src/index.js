require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan')
const Handlebars = require('express-handlebars')
const methodOverride = require('method-override')
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
app.set('views', path.join(__dirname, 'resources/views'))

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Change Front-end's files' type to hbs
app.engine('hbs', Handlebars.engine({
	extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b,
    eq: (a, b) => a == b
  }
}))

app.set('view engine', 'hbs')

// Route
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})