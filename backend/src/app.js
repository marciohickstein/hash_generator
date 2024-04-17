require('dotenv').config();
const cors = require('cors');

const HashGenerator = require('./crypto/HashGenerator');

const express = require('express');

const app = express();
app.use(cors());
app.use(express.json());

const generateHash = (HashGenerator) => {
    try {
        const hash = HashGenerator.generate();

        return {
            type: HashGenerator.getType(),
            string: HashGenerator.getString(),
            hash,
        };
    } catch (error) {
        
        return {
            error: true,
            message: error.message
        };
    }
}

app.post('/md5', (req, res) => {
    const md5 = new HashGenerator(req.body.string, 'md5');

    return res.json(generateHash(md5));
})

app.post('/sha1', (req, res) => {
    const hash = new HashGenerator(req.body.string, 'sha1');

    return res.json(generateHash(hash));
})

app.post('/sha256', (req, res) => {
    const hash = new HashGenerator(req.body.string, 'sha256');

    return res.json(generateHash(hash));
})

app.post('/sha512', (req, res) => {
    const hash = new HashGenerator(req.body.string, 'sha512');

    return res.json(generateHash(hash));
})

module.exports = app;