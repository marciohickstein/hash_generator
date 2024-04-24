const Url = require('../url/Url');

const urlController = {
    encodeUrl: ('/encode_url', (req, res) => {
        const string = req.body.string;
        const encodedUrl = new Url().encodeUrl(string);
    
        return res.json({
            string,
            encodedUrl
        })
    }),
    
    decodeUrl: ('/decode_url', (req, res) => {
        const encodedUrl = req.body.encodedUrl;
        const url = new Url().decodeUrl(encodedUrl);
    
        return res.json({
            encodedUrl,
            url
        })
    })
}

module.exports = urlController;