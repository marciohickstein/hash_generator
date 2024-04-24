const Base64 = require('../base64/Base64');

const base64Controller = 
{
    encode: (req, res) => {
        const string = req.body.string;
        const base64 = new Base64(string);
    
        return res.json({
            string,
            encode: base64.encode()
        });
    },

    decode: (req, res) => {
        const string = req.body.string;
        const base64 = new Base64(string);
    
        return res.json({
            string,
            decode: base64.decode()
        });
    }
}

module.exports = base64Controller;