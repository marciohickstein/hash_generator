require('dotenv').config();
const cors = require('cors');
const cryptoRouter = require('./routes/cryptoRouter');
const base64Router = require('./routes/base64Router');
const urlRouter = require('./routes/urlRouter');

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

app.post('/encode_url', urlRouter);
app.post('/decode_url', urlRouter);

module.exports = app;