const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const app = express()
const todoRoute = require('./routes/todoRouter')

connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('connected to mongoDB');
    } catch (error) {
        console.error(error);
    }
}
connect()

app.use(cors())
app.use(express.json())
app.use('/', todoRoute)

app.listen(process.env.PORT || 5000, () => {
    console.log("server is working");
})