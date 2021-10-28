const express = require("express")
const app = express()
const cors = require('cors')
const db = require("./database.js")

app.use(cors())
app.use(express.static('public'))

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const HTTP_PORT = 3000

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get("/api/user", (req, res, next) => {
    let sql = "select * from user"
    let params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "user":rows
        })
      });
});


app.get("/api/user/:id", (req, res, next) => {
    let sql = "select * from user where userId = ?"
    let params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "user":row
        })
      });
});


app.post("/api/user/", (req, res, next) => {
   let errors=[]
    if (!req.body.userId){
        errors.push("Inget ID");
    }
    let data = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    }
    let sql ='INSERT INTO user (userName, email, password) VALUES (?,?,?)'
    let params =[data.userName, data.email, data.password]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "user": data,
            "id" : this.lastID
        })
    });
})

app.put("/api/user/:id", (req, res, next) => {
    let data = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    }
    let sql ='UPDATE user SET userName = ?, email = ?, password = ? WHERE bokId = ?'
    let params =[data.userName, data.email, data.password, req.params.id]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "user": data,
            "id" : this.lastID
        })
    });
})

app.delete("/api/user/:id", (req, res, next) => {
    db.run(
        'DELETE FROM bok WHERE userId = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
    });
})

// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

