const express = require('express')
const fs = require('fs')
const users =  require("./MOCK_DATA.json")

const app = express()


// Rest api with mocked data

app.get("/api/users",(req,res)=>{
    return res.json(users)
})

app.get('/users',(req,res)=>{
    const html =`
    <ul>
       ${users.map((user)=>`<li>${user.first_name}</li>`).join('')}
    </ul>`
    res.send(html)
})

// Dynamic content
// app.get('/api/users/:id',(req,res)=>{
//     // const user_id= parseInt(req.params.id)
//     // const required_user = users.filter(item=>item.id===user_id)

//     const user_id= Number(req.params.id)
//     const required_user = users.find(item=>item.id===user_id)


//     // const html =`
//     // <ul>
//     //    ${required_user.map((user)=>`<li>${user.first_name}</li>`).join('')}
//     // </ul>`
//     return res.json(required_user)
// })

//Middleware
app.use(express.urlencoded({ extended: false}))


// Dynamic content && grouping of req

app.route('/api/users/:id')
.get((req,res)=>{
    const user_id= Number(req.params.id)
    const required_user = users.find(item=>item.id===user_id)
    return res.json(required_user)})
.patch((req,res)=>{
    return res.json({status: "Pending"})})
.delete((req,res)=>{
    return res.json({status: "Pending"})})

app.post('/api/users',(req,res)=>{
    const body = req.body
    users.push({...body, id: users.length+1})
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        
        return res.json({status: `Success`, id: users.length })})
    })
    // console.log(body)

app.listen(4000, ()=> console.log(`App listening.!`))