require('dotenv').config()
console.log(process.env)

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const cors = require('cors')

//express app
const app = express()

//middleware
app.use(express.json())

//cors
//const allowedOrigins = ['https://frontend-modstop.onrender.com/', "http://localhost:3000/"];
const isProduction = process.env.NODE_ENV === 'production';

const allowedOrigins = isProduction ? ['https://frontend-modstop.onrender.com/'] : true;


const corsOptions = {
  origin: allowedOrigins,
//   (origin, callback) => {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//will fire everytime a new request comes in
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


