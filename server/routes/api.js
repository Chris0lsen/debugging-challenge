const express = require('express')

const router = express.Router()

const getOrderBy = (req) => {
  const sortBy = req.query.sortBy
  const sortAsc = req.query.sortAsc ? req.query.sortAsc === 'true' : true
  return sortBy ? `ORDER BY ${sortBy} ${sortAsc ? 'ASC' : 'DESC'}` : ''
}

router.get('/', (req, res) => {
  const start = parseInt(req.query.start, 10) || 0
  const size = parseInt(req.query.size, 10) || 10

  req.db.all(
    `SELECT * FROM activities ${getOrderBy(req)} LIMIT ${size} OFFSET ${start}`,
    (err, rows) => {
      res.json(rows)
    }
  )
})

router.get('/all', (req, res) => {
  req.db.all(`select * from activities ${getOrderBy(req)}`, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message })
    }
    return res.json(rows)
  })
})

module.exports = router
