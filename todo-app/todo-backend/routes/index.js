const express = require('express');
const router = express.Router();

const configs = require('../util/config')
const redis = require('../redis')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  const added_todos = await redis.getAsync("added_todos")
  if (added_todos == null) {
    await redis.setAsync("added_todos", 0)
    return res.json({ added_todos: 0 })
  }
  res.json({ added_todos })
})

module.exports = router;
