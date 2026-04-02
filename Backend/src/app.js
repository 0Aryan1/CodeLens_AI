const express = require('express');
const aiRoutes = require('./routes/ai.route')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: function (origin, callback) {
   
    // Allow all Vercel preview deployments (*.vercel.app)
    if (origin && origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));


// Middleware to parse JSON body
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/ai', aiRoutes)

module.exports = app