const { Socket } = require('net');
const { connect } = require('../utils/network');

const networkController = {
    testConnection: async (req, res) => {
        let hostPort = req.body.string;
        const [host, port] = hostPort.split(':');

        try {
            const response = await connect(host, port);
    
            return res.json(response);
        } catch (error) {
            return res.json(error);
        }
    }
}

module.exports = networkController;