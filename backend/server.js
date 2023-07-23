require('dotenv').config()
console.log(process.env)

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')

//express app
const app = express()

//middleware
app.use(express.json())

//will fire everytime a new request comes in
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})


//routes
app.use('/api/user', userRoutes)

//connect to db
mongoose.connect('mongodb+srv://user:user@modstop.vofxbj0.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true, 
    useUnifiedTopology: true,
})
    .then((client)=>{
        //listen for request
        app.listen(process.env.PORT, ()=>{
            console.log('connected to db & listening on port 4000')
        })
    })
    .catch((error)=>{
        console.log(error)
    })


