require('dotenv').config();
const cors = require('cors');
const cryptoRouter = require('./routes/cryptoRouter');
const base64Router = require('./routes/base64Router');
const urlRouter = require('./routes/urlRouter');
const bodyParser = require('body-parser');

const express = require('express');

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
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