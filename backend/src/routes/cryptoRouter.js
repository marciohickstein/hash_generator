const router = require('express').Router();
const cryptoController = require('../controllers/crypoController');

router.post('/:algorithm(md5|sha1|sha256|sha512)', cryptoController.generateHash);

module.exports = router;
