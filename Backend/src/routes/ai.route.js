const express = require('express');
const aiController =  require('../controllers/ai.controller');
const router = express.Router();

// Support both GET (with query params) and POST (with body)
router.get('/get-review', aiController.getReview);
router.post('/get-review', aiController.getReview);

module.exports = router;
