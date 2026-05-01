const Base64 = require('../base64/Base64');

const base64Controller = {
    encode: (req, res) => {
        if (typeof req.body?.string !== 'string') {
            return res.status(400).json({ error: true, message: 'Expected body: { "string": "..." }' });
        }
        const string = req.body.string;
        const result = new Base64(string).encode();
        return res.json({ string, encode: result });
    },

    decode: (req, res) => {
        if (typeof req.body?.string !== 'string') {
            return res.status(400).json({ error: true, message: 'Expected body: { "string": "..." }' });
        }
        const string = req.body.string;
        try {
            const result = new Base64(string).decode();
            return res.json({ string, decode: result });
        } catch {
            return res.status(400).json({ error: true, message: 'Invalid Base64 string.' });
        }
    },
}

module.exports = base64Controller;