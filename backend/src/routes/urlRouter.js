const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

app.post('/encode_url', urlController.encodeUrl());
app.post('/decode_url', urlController.decodeUrl());

module.exports = router;