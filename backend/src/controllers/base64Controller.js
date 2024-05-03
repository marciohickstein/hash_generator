const Base64 = require('../base64/Base64');

const base64Controller = 
{
    encode: (req, res) => {
        const string = req.body.string;
        const base64 = new Base64(string);
        const result = base64.encode();
        let response;

        if (base64.hasError) {
            response = {
                error: true,
                message: base64.getErrorMessage()
            }
        } else {
            response = {
                string,
                encode: result
            }
        }

        return res.json(response);
    },

    decode: (req, res) => {
        const string = req.body.string;
        const base64 = new Base64(string);
        const result = base64.decode();
        let response;

        if (base64.hasError) {
            response = {
                error: true,
                message: base64.getErrorMessage()
            }
        } else {
            response = {
                string,
                encode: result
            }
        }

        return res.json(response);
    }
}

module.exports = base64Controller;