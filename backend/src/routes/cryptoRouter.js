const router = require('express').Router();
const cryptoController = require('../controllers/crypoController');

router.post('/md5', cryptoController.generateMd5Hash);

router.post('/sha1', cryptoController.generateSha1Hash)

router.post('/sha256', cryptoController.generateSha256Hash);

router.post('/sha512', cryptoController.generateSha512Hash);

module.exports = router;