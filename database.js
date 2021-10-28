const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "user.db"


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE user (
            userId INTEGER PRIMARY KEY,
            userName TEXT,
            email TEXT,
            password TEXT
            )`,(err) => {
        if (err) {
            // Table already created
        }else{
            // Table just created, creating some rows
            let insert = 'INSERT INTO user (userName, email, password) VALUES (?,?,?)'
            db.run(insert, ["Farrukh","abc@gmail.com","12345"])
        }
    })  
    }
})


module.exports = db

