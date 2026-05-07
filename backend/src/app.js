require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');

const cryptoRouter = require('./routes/cryptoRouter');
const base64Router = require('./routes/base64Router');
const urlRouter = require('./routes/urlRouter');
const networkRouter = require('./routes/networkRouter.js');
const express = require('express');

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:8888', 'http://127.0.0.1:8888'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));

app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-XSS-Protection', '0');
    next();
});

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.post('/md5', cryptoRouter);
app.post('/sha1', cryptoRouter);
app.post('/sha256', cryptoRouter)
app.post('/sha512', cryptoRouter);

app.post('/encode', base64Router);
app.post('/decode', base64Router);

app.post('/encode_url', urlRouter);
app.post('/decode_url', urlRouter);

app.use(networkRouter);

app.get('/ping', (req, res) => {
    return res.json({
        timestamp: Date.now()
    });
})

app.use((error, req, res, next) => {
    const isDev = process.env.NODE_ENV !== 'production';
    res.status(500).json({
        error: true,
        message: isDev ? error.message : 'Internal server error',
    });
})

module.exports = app;