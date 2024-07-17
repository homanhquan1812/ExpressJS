const express = require('express')
const morgan = require('morgan')
const Handlebars = require("express-handlebars")
const app = express()
const path = require('path')
const methodOverride = require('method-override')

const route = require('./routes')
const db = require('./config/db')

app.use(express.urlencoded({ extended: true })) 
app.use(express.json())
app.use(methodOverride('_method'))

/*
app.use(middleware)

  function middleware (req, res, next)
  {
    if (['cheapticket', 'expensiveticket'].includes(req.query.ticket))
    {
      return next()
    }
    else
    {
      res.status(403).json({
        message: 'Access denied'
      })
    }
  }
*/
  
// Connect to Database
db.connect()

// Static file
app.use(express.static(path.join(__dirname, 'public')))

// HTTP Logger
app.use(morgan('combined'))

// Template engine
app.engine('hbs', Handlebars.engine({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b
  }
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources\\views'))

app.get('/', function (req, res) {
  res.render('home');
})

// Routes
route(app);

app.listen(3000)