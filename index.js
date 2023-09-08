const express = require('express')
const { connectionDB } = require("./connection")
const userRoutes = require('./routes/users')
const { logReqRes } = require('./middlewares')


const app = express()


// connection 
connectionDB('mongodb://127.0.0.1:27017/app-1').then(()=>console.log('Connection Establish'))

// app.use(express.urlencoded({ extended: false }));
app.use('/api/users',userRoutes)
app.use(logReqRes("log.txt"))

app.listen(4000, ()=> console.log(`App listening.!`))