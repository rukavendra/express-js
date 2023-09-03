const express = require('express')

const app = express()

app.get("/",(req,res)=>{
    res.send("Hello from server")
    res.end()
})

app.listen(7000, ()=> console.log(`App listening on port!`))