require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');

const cryptoRouter = require('./routes/cryptoRouter');
const base64Router = require('./routes/base64Router');
const urlRouter = require('./routes/urlRouter');

const express = require('express');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(morgan('dev'));

app.post('/md5', cryptoRouter);
app.post('/sha1', cryptoRouter);
app.post('/sha256', cryptoRouter)
app.post('/sha512', cryptoRouter);

app.post('/encode', base64Router);
app.post('/decode', base64Router);

app.post('/encode_url', urlRouter);
app.post('/decode_url', urlRouter);

app.use((error, req, res, next) => {
    console.log('error middleware');
    res.status(500).json({
        error: true,
        message: error.message
    })
})

module.exports = app;