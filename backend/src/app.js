require('dotenv').config();
const cors = require('cors');
const cryptoRouter = require('./routes/cryptoRouter');
const Base64 = require('./base64/Base64');
const Url = require('./url/Url');

const express = require('express');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/md5', cryptoRouter);
app.post('/sha1', cryptoRouter);
app.post('/sha256', cryptoRouter)
app.post('/sha512', cryptoRouter);

app.post('/encode', (req, res) => {
    const string = req.body.string;
    const base64 = new Base64(string);

    return res.json({
        string,
        encode: base64.encode()
    });
})

app.post('/decode', (req, res) => {
    const string = req.body.string;
    const base64 = new Base64(string);

    return res.json({
        string,
        decode: base64.decode()
    });
})


app.post('/encode_url', (req, res) => {
    const string = req.body.string;
    const encodedUrl = new Url().encodeUrl(string);

    return res.json({
        url: string,
        encodedUrl
    })
})

app.post('/decode_url', (req, res) => {
    const encodedUrl = req.body.string;
    const url = new Url().decodeUrl(encodedUrl);

    const response = {
        encodedUrl,
        url
    }

    return res.json(response);
})

module.exports = app;