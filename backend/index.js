const express = require('express')
const app = express()
const cors = require('cors')
const corsOptions = {
  origin: ['http://localhost:5173'],
}
const port = 3000

app.use(cors(corsOptions))

app.get('/api', (req, res) => {
  res.json({ message: 'connected to backend successfully!' }) 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
