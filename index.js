const express = require("express")
const { port, env } = require("./config")
const cors = require("cors")
const cookies = require("cookie-parser")

//Importando routers
const auth = require("./routes/auth") //TODO:REVISAR LO DEL AUTH
const teams = require("./routes/teams")
const users = require("./routes/users")

const app = express()

//middlewares
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:["http://localhost:3000"]
}))

app.use(cookies())

const {connect} = require("./config/db")
connect()

// Utilizando las rutas
auth(app)
teams(app)
users(app)

app.get("/",(req,res)=>{
    return res.json({hello:"world"})
})

app.listen(port,()=>{
    //console.log("Mode:",env)
    console.log("Listening on port "+port)
})