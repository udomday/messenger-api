const express = require('express')
const router = require('./routes/index')
const cors = require('cors');
const ErrorHandlingMiddleware = require('./middleware/ErrorHandlingMiddleware');
const PORT = process.env.PORT || 8080

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(ErrorHandlingMiddleware)

app.listen(PORT, ()=> console.log(`server on port ${PORT}`))

