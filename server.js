require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const tasksRouter = require('./routes/tasks')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json())
app.use('/tasks',tasksRouter)

mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log('Mongodb connected'))
    .catch((err)=>console.log('connection failed:',err))

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})


