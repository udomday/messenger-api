const express = require('express')
const router = require('./routes/index')
const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use('/api', router)

app.listen(PORT, ()=> console.log(`server on port ${PORT}`))

