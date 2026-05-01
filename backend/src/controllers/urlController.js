const Url = require('../url/Url');

const urlController = {
    encodeUrl: (req, res) => {
        if (typeof req.body?.string !== 'string') {
            return res.status(400).json({ error: true, message: 'Expected body: { "string": "..." }' });
        }
        const string = req.body.string;
        const encodedUrl = new Url().encodeUrl(string);
        return res.json({ string, encodedUrl });
    },

    decodeUrl: (req, res) => {
        if (typeof req.body?.string !== 'string') {
            return res.status(400).json({ error: true, message: 'Expected body: { "string": "..." }' });
        }
        const encodedUrl = req.body.string;
        try {
            const url = new Url().decodeUrl(encodedUrl);
            return res.json({ encodedUrl, url });
        } catch {
            return res.status(400).json({ error: true, message: 'Invalid URL-encoded string.' });
        }
    },
}

module.exports = urlController;