require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')

//express app
const app = express()

//middleware
app.use(express.json())

//will fire everytime a request comes in
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})


//routes
app.use('/api/user', userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then((client)=>{
        //listen for request
        app.listen(process.env.PORT, ()=>{
            console.log('connected to db & listening on port 4000')
        })
    })
    .catch((error)=>{
        console.log(error)
    })


