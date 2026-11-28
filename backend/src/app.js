const morgan = require('morgan');

const cryptoRouter = require('./routes/cryptoRouter');
const base64Router = require('./routes/base64Router');
const networkRouter = require('./routes/networkRouter.js');
const express = require('express');

// API JSON sem cookie/sessao, entao nao ha o que proteger com token CSRF.
const app = express(); // nosemgrep: javascript.express.security.audit.express-check-csurf-middleware-usage.express-check-csurf-middleware-usage

// Um proxy na frente (nginx): req.ip passa a ser o IP real do visitante.
app.set('trust proxy', 1);

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

app.use(cryptoRouter);
app.use(base64Router);
app.use(networkRouter);

app.get('/ping', (req, res) => {
    return res.json({
        timestamp: Date.now()
    });
})

// Erros do body-parser (JSON invalido, corpo grande demais) trazem status 4xx.
app.use((error, req, res, _next) => {
    const status = error.status >= 400 && error.status < 500 ? error.status : 500;
    const isDev = process.env.NODE_ENV !== 'production';
    res.status(status).json({
        error: true,
        message: status < 500 || isDev ? error.message : 'Internal server error',
    });
})

module.exports = app;
