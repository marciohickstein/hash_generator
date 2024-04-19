const router = require('express').Router();
const cryptoController = require('../controllers/crypoController');

app.post('/md5', cryptoController.generateMd5Hash);

app.post('/sha1', cryptoController.generateSha1Hash)

app.post('/sha256', cryptoController.generateSha256Hash);

app.post('/sha512', cryptoController.generateSha512Hash);

module.exports = router;