const { Socket } = require('net');

const TIMEOUT = 5000;
const DEBUG = false;

const mountReturn = (success, message) => {
    return {
        success,
        message
    };
}

const connect = (host, port) => {
    return new Promise((resolve, reject) => {
        let msg = '';
        const socket = new Socket();

        socket.setTimeout(TIMEOUT);

        socket.on('connect', () => {
            msg = `Successfully connected on ${host}:${port}`;
            socket.destroy();
            if (DEBUG) {
                console.log(msg);
            }
            resolve(mountReturn(true, msg));
        });

        socket.on('timeout', () => {
            msg = `Expired timeout(${TIMEOUT}) on ${host}:${port}. \nTry again later.`;
            console.error(msg);
            socket.destroy();
            if (DEBUG) {
                console.log(msg);
            }
            reject(mountReturn(false, msg));
        });

        socket.on('error', (error) => {
            const msg = `Error to connect on ${host}:${port}! ${error.message ? " Message: " + error.message : ''}`;
            socket.destroy();
            if (DEBUG) {
                console.log(msg);
            }
            reject(mountReturn(false, msg));
        });

        socket.on('close', (hadError) => {
            if (DEBUG) {
                if (hadError) {
                    console.error(`Socket closed due to errors`);
                } else {
                    console.log(`Socket closed gracefully`);
                }
            }
        });

        socket.connect(port, host);
    })
}

module.exports = {
    connect
}