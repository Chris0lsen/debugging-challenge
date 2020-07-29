const express = require('express')
const path = require('path')
const apiRoutes = require('./routes/api')
const databaseMiddleware = require('./database')

const createServer = () => {
  const app = express()
  app.use('/build', express.static('client/build'))
  app.use('/static', express.static('client/static'))

  app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
  })
  app.use(databaseMiddleware())
  app.use('/api', apiRoutes)

  return app
}

module.exports = createServer
