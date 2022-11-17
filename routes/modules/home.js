const assert = require('assert')
const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

router.get('/', async (req, res, next) => {
  try {
    const UserId = req.user.id
    const todos = await Todo.findAll({
      where: { UserId },
      raw: true,
      nest: true,
    })
    return res.render('index', { todos })
  } catch (err) {
    return res.status(422).json(err)
  }
})

module.exports = router
