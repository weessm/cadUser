const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./src/routes')
require('dotenv').config()
const PORT = process.env.PORT || 8081

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use('/', router)

app.listen(PORT, () => {
    console.log(`Running on port: ${PORT} (づ￣ 3￣)づ`)
})