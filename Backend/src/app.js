const express = require('express');
const aiRoutes = require('./routes/ai.route.js')
const cors = require('cors')


const app = express();

// CORS configuration for Vercel deployment
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:4173',
  // Add your Vercel frontend URL after deployment
  'https://code-lens-ai-frontend.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


// Middleware to parse JSON body
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/ai', aiRoutes);

module.exports = app;