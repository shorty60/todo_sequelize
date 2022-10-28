const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

const app = express()
const PORT = process.env.PORT || 3000

// vie engine
app.engine('hbs', exphbs({ defaltLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// middlewares
app.use(express.urlencoded({ extended: true })) // 解析request body
app.use(methodOverride('_method')) // 改寫HTTP method

// router
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/users/login', (req, res) => {
  res.render('login')
})

app.post('/users/login', (req, res) => {
  res.send('login')
})

app.get('/users/register', (req, res) => {
  res.render('register')
})

app.post('/users/register', (req, res) => {
  res.send('register')
})

app.get('/users/logout', (req, res) => {
  res.send('logout')
})

app.listen(PORT, () => {
  console.log(`Express is listening on http://localhost:${PORT}`)
})
