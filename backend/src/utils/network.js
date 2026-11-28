const { Socket, BlockList, isIP } = require('net');
const dns = require('dns').promises;

const TIMEOUT = 5000;

const mountReturn = (success, message) => ({ success, message });

// Faixas que nao podem ser alvo do teste de porta (protecao contra SSRF).
// A checagem e feita no IP resolvido, nao no texto digitado, entao formas
// como "localhost.", "0x7f.0.0.1", "2130706433" ou um DNS publico apontando
// pra 127.0.0.1 tambem sao bloqueadas. O BlockList do Node compara IPv4 e
// IPv4 mapeado em IPv6 (::ffff:a.b.c.d) nos dois sentidos, entao as regras
// IPv4 ja cobrem os mapeados; uma regra ::ffff:0:0/96 bloquearia todo IPv4.
const blockList = new BlockList();
[
    ['0.0.0.0', 8],        // "esta" rede
    ['10.0.0.0', 8],       // privada (RFC 1918)
    ['100.64.0.0', 10],    // CGNAT
    ['127.0.0.0', 8],      // loopback
    ['169.254.0.0', 16],   // link-local / metadata de cloud
    ['172.16.0.0', 12],    // privada (RFC 1918), inclui redes do Docker
    ['192.0.0.0', 24],     // IETF
    ['192.0.2.0', 24],     // documentacao
    ['192.168.0.0', 16],   // privada (RFC 1918)
    ['198.18.0.0', 15],    // benchmark
    ['198.51.100.0', 24],  // documentacao
    ['203.0.113.0', 24],   // documentacao
    ['224.0.0.0', 4],      // multicast
    ['240.0.0.0', 4],      // reservada + broadcast
].forEach(([net, prefix]) => blockList.addSubnet(net, prefix, 'ipv4'));
[
    ['::', 128],           // nao especificado
    ['::1', 128],          // loopback
    ['64:ff9b::', 96],     // NAT64 (embute IPv4)
    ['100::', 64],         // descarte
    ['2001:db8::', 32],    // documentacao
    ['2002::', 16],        // 6to4 (embute IPv4)
    ['fc00::', 7],         // unique local
    ['fe80::', 10],        // link-local
    ['ff00::', 8],         // multicast
].forEach(([net, prefix]) => blockList.addSubnet(net, prefix, 'ipv6'));

const isBlockedAddress = (address) => {
    const family = isIP(address);
    if (family === 0) return true;
    return blockList.check(address, family === 4 ? 'ipv4' : 'ipv6');
};

// Resolve o host e devolve um IP liberado. Se qualquer endereco resolvido
// estiver bloqueado, recusa tudo, pra nao depender de qual IP o DNS devolve.
const resolveAllowedAddress = async (host) => {
    const h = host.replace(/^\[|\]$/g, '');

    let addresses;
    try {
        addresses = await dns.lookup(h, { all: true, verbatim: true });
    } catch {
        throw mountReturn(false, `Could not resolve host "${host}".`);
    }

    if (addresses.length === 0 || addresses.some(({ address }) => isBlockedAddress(address))) {
        throw mountReturn(false, `Connection to host "${host}" is not allowed.`);
    }

    return addresses[0].address;
};

const connect = async (host, port) => {
    const portNum = Number(port);
    if (!Number.isInteger(portNum) || portNum < 1 || portNum > 65535) {
        throw mountReturn(false, `Invalid port "${port}". Must be a number between 1 and 65535.`);
    }

    // Conecta no IP ja validado, nao no hostname: assim um segundo lookup
    // de DNS (DNS rebinding) nao consegue trocar o destino.
    const address = await resolveAllowedAddress(host);

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

        socket.connect(portNum, address);
    });
}

module.exports = {
    connect,
    isBlockedAddress,
}
