require('dotenv').config();
const cors = require('cors');
const cryptoRouter = require('./routes/cryptoRouter');
const base64Router = require('./routes/base64Router');
const Url = require('./url/Url');

const express = require('express');

const app = express();
app.use(cors());
app.use(express.json());

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

app.post('/md5', cryptoRouter);
app.post('/sha1', cryptoRouter);
app.post('/sha256', cryptoRouter)
app.post('/sha512', cryptoRouter);

app.post('/encode', base64Router);
app.post('/decode', base64Router);

app.post('/encode_url', (req, res) => {
    const string = req.body.string;
    const encodedUrl = new Url().encodeUrl(string);

    return res.json({
        string,
        encodedUrl
    })
})

app.post('/decode_url', (req, res) => {
    const encodedUrl = req.body.encodedUrl;
    const url = new Url().decodeUrl(encodedUrl);

    return res.json({
        encodedUrl,
        url
    })
})


module.exports = app;