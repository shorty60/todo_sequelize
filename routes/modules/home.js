const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

router.get('/', async (req, res, next) => {
  try {
    const todos = await Todo.findAll({ raw: true, nest: true })
    return res.render('index', { todos })
  } catch (err) {
    return res.status(422).json(err)
  }
})

module.exports = router
