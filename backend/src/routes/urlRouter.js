const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.post('/encode_url', urlController.encodeUrl);
router.post('/decode_url', urlController.decodeUrl);

module.exports = router;