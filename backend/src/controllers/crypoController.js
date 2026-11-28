const crypto = require('crypto');

const cryptoController = {
    generateHash: (req, res) => {
        if (typeof req.body?.string !== 'string') {
            return res.status(400).json({ error: true, message: 'Expected body: { "string": "..." }' });
        }
        const { string } = req.body;
        const { algorithm } = req.params;
        const hash = crypto.createHash(algorithm).update(string).digest('hex');
        return res.json({ string, algorithm, hash });
    },
}

module.exports = cryptoController;
