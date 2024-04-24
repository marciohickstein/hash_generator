const express = require('express');
const router = express.Router();
const base64Controller = require('../controllers/base64Controller.js');

router.post('/encode', base64Controller.encode);
router.post('/decode', base64Controller.decode);

module.exports = router;