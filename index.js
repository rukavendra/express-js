const express = require('express')
const fs = require('fs')
// const users =  require("./MOCK_DATA.json")
const mongoose = require("mongoose")
// const { timeStamp } = require('console')

const app = express()


// connection 
mongoose.connect('mongodb://127.0.0.1:27017/app-1') // returns a promise
.then(()=>console.log("connection success"))
.catch(err=>console.log(err))


//schema 
const  userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    jobTitle:{
        type: String,
    },
    gender:{
        type: String,
    },
},{timestamps:  true})


// Model

const User = mongoose.model('user',userSchema)

// Rest api with mocked data

app.get("/api/users", async (req,res)=>{
    const users = await User.find({})
    return res.json(users)
})

app.get('/users', async (req,res)=>{
    const users = await User.find({})
    const html =`
    <ul>
       ${users.map((user)=>`<li>${user.firstName}</li>`).join('')}
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
.get(async (req,res)=>{
    const user = await User.findById(req.params.id)
    // console.log(user)
    // const required_user = user.find(item=>item.id===user_id)
    if (!user) return res.status(400).json({ error: "User Not Found"})
    return res.status(200).json(user)})
.patch( async (req,res)=>{
    const user= await User.findByIdAndUpdate(req.params.id,{lastName: "yadav"}) 
    return res.status(201).json({status : "success"})
})
.delete(async (req,res)=>{
    // const id =  Number(req.params.id)
    // const updatedData = users.filter(item=>item.id!==id)
    // console.log(updatedData)
    // fs.writeFile("./MOCK_DATA.json",JSON.stringify(updatedData),(err,data)=>{
    //     return res.send(`${id} =>Deleted from dataBase`)
    // })
    
    const user= await User.findByIdAndDelete(req.params.id) 
    return res.status(201).json({status : "success"})

    })

// app.post('/api/users',(req,res)=>{
//     const body = req.body
//     if(!body || !body.first_name || !body.last_name || !body.email || !body.job_title || !body.gender){
//         return res.status(400).json({msg: "all field required"})
//     }
//     users.push({...body, id: users.length+1})
//     fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        
//         return res.status(201).json({status: `Success`, id: users.length })})
//     })
    // console.log(body)

    app.post('/api/users',async (req,res)=>{
        const body = req.body
         if(!body || !body.first_name || !body.last_name || !body.email || !body.job_title || !body.gender){
           return res.status(400).json({msg: "all field required"})
    }
        const result = await User.create({
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            gender: body.gender,
            jobTitle: body.job_title
        })
        console.log(result)
        return res.status(201).json({
            status: "success"
        })
    })

app.listen(4000, ()=> console.log(`App listening.!`))