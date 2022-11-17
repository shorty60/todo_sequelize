const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const auth = require('./modules/auth')
const users = require('./modules/user')
const todos = require('./modules/todo')
const { authenticator } = require('../middlewares/auth')

router.use('/users', users)
router.use('/todos', authenticator, todos)
router.use('/',authenticator, home)

module.exports = router
