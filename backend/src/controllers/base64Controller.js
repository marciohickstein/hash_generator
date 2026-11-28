// Buffer ignora caracteres invalidos em silencio, entao valida antes.
// Aceita base64 e base64url, com ou sem padding; tamanho % 4 == 1 nao existe.
const decodeBase64 = (string) => {
    const clean = string.replace(/\s/g, '');
    if (!/^[A-Za-z0-9+/_-]*={0,2}$/.test(clean) || clean.replace(/=+$/, '').length % 4 === 1) {
        throw new Error('Invalid Base64 string.');
    }
    return Buffer.from(clean, 'base64').toString('utf8');
};

const base64Controller = {
    encode: (req, res) => {
        if (typeof req.body?.string !== 'string') {
            return res.status(400).json({ error: true, message: 'Expected body: { "string": "..." }' });
        }
        const string = req.body.string;
        const result = Buffer.from(string, 'utf8').toString('base64');
        return res.json({ string, encode: result });
    },

    decode: (req, res) => {
        if (typeof req.body?.string !== 'string') {
            return res.status(400).json({ error: true, message: 'Expected body: { "string": "..." }' });
        }
        const string = req.body.string;
        try {
            const result = decodeBase64(string);
            return res.json({ string, decode: result });
        } catch {
            return res.status(400).json({ error: true, message: 'Invalid Base64 string.' });
        }
    },
}

module.exports = base64Controller;