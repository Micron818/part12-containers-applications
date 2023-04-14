const express = require('express')
const { Todo } = require('../mongo')
const { setAsync, getAsync } = require('../redis')
const router = express.Router()

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  })

  const addedTodos = (await getAsync('added_todos')) || 0
  await setAsync('added_todos', parseInt(addedTodos) + 1)
  res.send(todo)
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  try {
    res.status(201).json(req.todo)
  } catch (error) {
    res.sendStatus(400).json(error)
  }
})

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  try {
    req.todo.set(req.body)
    const todo = await req.todo.save()
    res.status(200).json(todo)
  } catch (error) {
    res.status(400).json(error.message)
  }
})

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router
