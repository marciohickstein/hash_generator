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

const validateString = (req, res) => {
    if (typeof req.body?.string !== 'string') {
        res.status(400).json({ error: true, message: 'Expected body: { "string": "..." }' });
        return false;
    }
    return true;
};

const cryptoController = {
    generateMd5Hash: (req, res) => {
        if (!validateString(req, res)) return;
        return res.json(generateHash(new HashGenerator(req.body.string, 'md5')));
    },
    generateSha1Hash: (req, res) => {
        if (!validateString(req, res)) return;
        return res.json(generateHash(new HashGenerator(req.body.string, 'sha1')));
    },
    generateSha256Hash: (req, res) => {
        if (!validateString(req, res)) return;
        return res.json(generateHash(new HashGenerator(req.body.string, 'sha256')));
    },
    generateSha512Hash: (req, res) => {
        if (!validateString(req, res)) return;
        return res.json(generateHash(new HashGenerator(req.body.string, 'sha512')));
    },
}

module.exports = cryptoController;