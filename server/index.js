const createApp = require('./server')

const PORT = 3000

createApp().listen(PORT)
console.log(`Server running on port ${PORT}`)
