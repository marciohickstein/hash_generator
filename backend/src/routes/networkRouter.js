const router = require('express').Router();
const networkController = require('../controllers/networkController.js')

router.post('/connect', networkController.testConnection);
router.get('/lan', networkController.getLan);
router.get('/externalip', networkController.getExternalIp);

module.exports = router;