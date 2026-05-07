const { Socket } = require('net');
const os = require('os');

const TIMEOUT = 5000;
const EXTERNAL_IP_CACHE_TTL = 60_000;

const mountReturn = (success, message) => ({ success, message });

// RFC 1918 + loopback + link-local ranges blocked to prevent SSRF
const IPV4_PRIVATE = /^(10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|127\.|0\.|169\.254\.)/;

const isBlockedHost = (host) => {
    const h = host.replace(/^\[|\]$/g, '').toLowerCase();

    // Hostnames
    if (/^(localhost|.*\.local)$/.test(h)) return true;

    // IPv4 private ranges
    if (IPV4_PRIVATE.test(h)) return true;

    // IPv6 loopback and unspecified
    if (h === '::1' || h === '::') return true;

    // IPv6 link-local (fe80::/10 = fe80–febf)
    if (/^fe[89ab][0-9a-f]:/.test(h)) return true;

    // IPv6 unique local (fc00::/7 = fc** and fd**)
    if (/^f[cd][0-9a-f]{2}:/.test(h)) return true;

    // IPv4-mapped IPv6 (::ffff:<ipv4>)
    if (h.startsWith('::ffff:') && IPV4_PRIVATE.test(h.slice(7))) return true;

    return false;
};

let externalIpCache = null;
let externalIpCachedAt = 0;

const getLan = () => os.networkInterfaces();

const getExternalIp = async () => {
    const now = Date.now();
    if (externalIpCache && now - externalIpCachedAt < EXTERNAL_IP_CACHE_TTL) {
        return externalIpCache;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);

    try {
        const response = await fetch('https://ipinfo.io/ip', { signal: controller.signal });
        const ip = await response.text();
        externalIpCache = { ip: ip.trim() };
        externalIpCachedAt = now;
        return externalIpCache;
    } finally {
        clearTimeout(timer);
    }
}

const connect = (host, port) => {
    if (isBlockedHost(host)) {
        return Promise.reject(mountReturn(false, `Connection to host "${host}" is not allowed.`));
    }

    const portNum = Number(port);
    if (!Number.isInteger(portNum) || portNum < 1 || portNum > 65535) {
        return Promise.reject(mountReturn(false, `Invalid port "${port}". Must be a number between 1 and 65535.`));
    }

    return new Promise((resolve, reject) => {
        let msg = '';
        const socket = new Socket();

        socket.setTimeout(TIMEOUT);

        socket.on('connect', () => {
            msg = `Successfully connected on ${host}:${portNum}`;
            socket.destroy();
            resolve(mountReturn(true, msg));
        });

        socket.on('timeout', () => {
            msg = `Expired timeout(${TIMEOUT}ms) on ${host}:${portNum}. Try again later.`;
            socket.destroy();
            reject(mountReturn(false, msg));
        });

        socket.on('error', (error) => {
            msg = `Error connecting to ${host}:${portNum}. ${error.message || ''}`;
            socket.destroy();
            reject(mountReturn(false, msg));
        });

        socket.connect(portNum, host);
    });
}

module.exports = {
    connect,
    getLan,
    getExternalIp,
}

