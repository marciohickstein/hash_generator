const { connect, getLan, getExternalIp } = require('../utils/network');

const networkController = {
    testConnection: async (req, res) => {
        const hostPort = req.body.string;

        if (typeof hostPort !== 'string' || !hostPort.includes(':')) {
            return res.status(400).json({ error: true, message: 'Expected body: { "string": "host:port" }' });
        }

        const colonIndex = hostPort.lastIndexOf(':');
        const host = hostPort.slice(0, colonIndex);
        const port = hostPort.slice(colonIndex + 1);

        if (!host) {
            return res.status(400).json({ error: true, message: 'Host cannot be empty.' });
        }

        try {
            const response = await connect(host, port);
            return res.json(response);
        } catch (error) {
            return res.status(400).json(error);
        }
    },

    getLan: (req, res) => {
        return res.json(getLan());
    },

    getExternalIp: async (req, res, next) => {
        try {
            const response = await getExternalIp();
            return res.json(response);
        } catch (error) {
            next(error);
        }
    },
}

module.exports = networkController;