const net = require('net');
const { connect, isBlockedAddress } = require('../src/utils/network');

describe('isBlockedAddress', () => {
    it.each([
        '127.0.0.1', '10.1.2.3', '172.17.0.2', '192.168.1.1', '169.254.169.254',
        '100.64.0.1', '0.0.0.0', '255.255.255.255',
        '::1', '::', '::ffff:7f00:1', '::ffff:127.0.0.1', 'fe80::1', 'fd00::1', '64:ff9b::7f00:1',
        'not-an-ip',
    ])('blocks %s', (address) => {
        expect(isBlockedAddress(address)).toBe(true);
    });

    it.each(['8.8.8.8', '1.1.1.1', '2606:4700:4700::1111'])('allows %s', (address) => {
        expect(isBlockedAddress(address)).toBe(false);
    });
});

describe('connect', () => {
    let server;
    let port;

    beforeAll((done) => {
        server = net.createServer((socket) => socket.end()).listen(0, '127.0.0.1', () => {
            port = server.address().port;
            done();
        });
    });

    afterAll((done) => {
        server.close(done);
    });

    // Formas alternativas de loopback que passavam pela checagem antiga.
    it.each(['127.0.0.1', 'localhost', 'localhost.', '0x7f.0.0.1', '2130706433', '0177.0.0.1', '::ffff:7f00:1', '[::1]'])(
        'refuses %s',
        async (host) => {
            await expect(connect(host, port)).rejects.toMatchObject({
                success: false,
                message: expect.stringContaining('not allowed'),
            });
        },
    );

    it('rejects an invalid port before resolving', async () => {
        await expect(connect('example.com', '99999')).rejects.toMatchObject({
            success: false,
            message: expect.stringContaining('Invalid port'),
        });
    });

    it('reports an unresolvable host', async () => {
        await expect(connect('does-not-exist.invalid', 80)).rejects.toMatchObject({
            success: false,
            message: expect.stringContaining('Could not resolve'),
        });
    });
});
