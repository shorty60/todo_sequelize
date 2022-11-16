const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const db = require('./models') // 會去抓index.js檔案的設定
const app = express()
const PORT = process.env.PORT || 3000
const Todo = db.Todo
const User = db.User
// vie engine
app.engine('hbs', exphbs({ defaltLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// middlewares
app.use(express.urlencoded({ extended: true })) // 解析request body
app.use(methodOverride('_method')) // 改寫HTTP method

// router
app.get('/', (req, res) => {
  return Todo.findAll({ raw: true, nest: true })
    .then(todos => {
      return res.render('index', { todos })
    })
    .catch(err => {
      return res.status(422).json(err)
    })
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

app.get('/todos/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const todo = await Todo.findByPk(id)
    return res.render('detail', { todo: JSON.stringify(todo) })
  } catch (err) {
    next(err)
  }
})

app.post('/users/register', async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body
    await User.create({ name, email, password })
    return res.redirect('/')
  } catch (err) {
    next(err)
  }
})

app.get('/users/logout', (req, res) => {
  res.send('logout')
})

app.listen(PORT, () => {
  console.log(`Express is listening on http://localhost:${PORT}`)
})
