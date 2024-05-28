const { Socket } = require('net');
const { connect, getLan, getExternalIp } = require('../utils/network');

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
    },
    getLan: (req, res) => {
        const response = getLan();
        
        return res.json(response);
    },

    getExternalIp: async (req, res) => {
        const response = await getExternalIp();
        
        return res.json(response);
    }
    
}

module.exports = networkController;