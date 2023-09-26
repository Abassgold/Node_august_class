 const express =require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const URI = process.env.URI
const userRouter = require("./Routes/user.routes")
const cors =require('cors') 
const mongoose = require('mongoose')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use("/user", userRouter)

mongoose.connect(URI).then(() => {
     console.log("Database connected"); 
    app.listen(PORT)
    })
    .catch((err) => console.log(err, "database not connected"))

