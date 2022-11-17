const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const todo = await Todo.findByPk(id)
    return res.render('detail', { todo: JSON.stringify(todo) })
  } catch (err) {
    next(err)
  }
})

module.exports = router
