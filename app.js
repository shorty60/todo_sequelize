if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const methodOverride = require('method-override')

const usePassport = require('./config/passport')
const flash = require('connect-flash')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3000

// vie engine
app.engine('hbs', exphbs({ defaltLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// middlewares
app.use(express.urlencoded({ extended: true })) // 解析request body
app.use(methodOverride('_method')) // 改寫HTTP method
app.use(express.static('public')) // 靜態檔案

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

usePassport(app) // 使用passport驗證

app.use(flash())
// 取得flash message
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.register_errs = req.flash('register_errs')
  res.locals.deleted_msg = req.flash('deleted_msg')
  next()
})
// router
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is listening on http://localhost:${PORT}`)
})
