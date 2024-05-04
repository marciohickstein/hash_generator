require('dotenv').config();
const cors = require('cors');
const cryptoRouter = require('./routes/cryptoRouter');
const base64Router = require('./routes/base64Router');
const urlRouter = require('./routes/urlRouter');

const express = require('express');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());

app.post('/md5', cryptoRouter);
app.post('/sha1', cryptoRouter);
app.post('/sha256', cryptoRouter)
app.post('/sha512', cryptoRouter);

app.post('/encode', base64Router);
app.post('/decode', base64Router);

app.post('/encode_url', urlRouter);
app.post('/decode_url', urlRouter);

app.use((error, req, res, next) => {
    res.status(500).json({
        error: true,
        message: error.message,
        method: req.method,
        path: req.url,
        body: req.body,
        params: req.params,
    })
})

module.exports = app;