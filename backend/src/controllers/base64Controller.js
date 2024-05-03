const Base64 = require('../base64/Base64');

const base64Controller = 
{
    encode: (req, res) => {
        const string = req.body.string;
        const base64 = new Base64(string);
        const result = base64.encode();

        return res.json({
            string,
            encode: result
        });
    },

    decode: (req, res) => {
        const string = req.body.string;
        const base64 = new Base64(string);
        const result = base64.decode();

        return res.json({
            string,
            encode: result
        }
);
    }
}

module.exports = base64Controller;