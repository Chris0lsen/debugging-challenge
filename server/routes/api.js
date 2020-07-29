const express = require('express')
const db = require('../database')
const activities = require('../../activities.json')

const router = express.Router()

router.get('/', (req, res) => {
  const start = parseInt(req.query.start, 10) || 0
  const size = parseInt(req.query.size, 10) || 10
  req.db.all(`SELECT * FROM activities LIMIT ${size} OFFSET ${start}`, (err, rows) => {
    res.send(rows)
  })
})

router.get('/all', (req, res) => {
  req.db.all('select * from activities', [], (err, rows) => {
    if (err) {
      return res.status(400).json({error: err.message})
    }
    return res.json(rows)
  })
})

module.exports = router
