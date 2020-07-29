const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')

function databaseMiddleware () {
    let db = new sqlite3.Database(':memory:')
    const data = fs.readFileSync('activities.sql')
        .toString()
        .split(';')    
    db.serialize(()=> {
        db.run(data[0])
        db.run(data[1])
    })
   
    return (req, res, next) => {
        req.db = db
        next()
    }  
}


  module.exports = databaseMiddleware