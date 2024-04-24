const HashGenerator = require('../crypto/HashGenerator');

const generateHash = (HashGenerator) => {
    try {
        const hash = HashGenerator.generate();

        return {
            string: HashGenerator.getString(),
            algorithm: HashGenerator.getAlgorithm(),
            hash,
        };
    } catch (error) {

        return {
            error: true,
            message: error.message
        };
    }
}

const cryptoController = {
    generateMd5Hash: (req, res) => {
        const md5 = new HashGenerator(req.body.string, 'md5');

        return res.json(generateHash(md5));
    },
    generateSha1Hash: (req, res) => {
        const hash = new HashGenerator(req.body.string, 'sha1');

        return res.json(generateHash(hash));
    },
    generateSha256Hash: (req, res) => {
        const hash = new HashGenerator(req.body.string, 'sha256');

        return res.json(generateHash(hash));
    },
    generateSha512Hash: (req, res) => {
        const hash = new HashGenerator(req.body.string, 'sha512');

        return res.json(generateHash(hash));
    }
}

module.exports = cryptoController;