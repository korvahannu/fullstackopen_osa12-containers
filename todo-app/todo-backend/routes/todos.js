const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis');


/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  let count = await redis.getAsync("added_todos");
  count++;
  await redis.setAsync("added_todos", count);

  res.send(todo);
});

router.get('/statistics', async (req, res) => {

  const result = await redis.getAsync("added_todos");
  res.send(result);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.id = id;
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

singleRouter.put('/', async (req, res) => {
  const id = req.id;
  const body = req.body;
  const result = await Todo.findByIdAndUpdate(id, body)
  res.send(result);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
