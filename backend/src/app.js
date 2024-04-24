require('dotenv').config();
const cors = require('cors');
const cryptoRouter = require('./routes/cryptoRouter');
const base64Router = require('./routes/base64Router');
const Url = require('./url/Url');

const express = require('express');

const app = express();
app.use(cors());
app.use(express.json());

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