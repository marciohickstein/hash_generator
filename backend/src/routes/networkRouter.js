const router = require('express').Router();
const networkController = require('../controllers/networkController.js')

router.post('/connect', networkController.testConnection);

module.exports = router;