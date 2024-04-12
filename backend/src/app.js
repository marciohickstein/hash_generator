require('dotenv').config();
const cors = require('cors');

const Md5Generator = require('./crypto/Md5Generator');
const ShaGenerator = require('./crypto/ShaGenerator');

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
    const md5 = new Md5Generator(req.body.string);

    return res.json(generateHash(md5));
})

app.post('/sha1', (req, res) => {
    const sha = new ShaGenerator(req.body.string);

    return res.json(generateHash(sha));
})

module.exports = app;