const express = require('express')
const activities = require('../../activities.json')

const router = express.Router()

router.get('/', (req, res) => {
  const start = parseInt(req.query.start, 10) || 0
  const size = parseInt(req.query.size, 10) || 10
  res.send(activities.slice(start, start + size))
})

module.exports = router
