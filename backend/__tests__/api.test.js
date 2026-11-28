const app = require('../src/app');

let server;
let base;

beforeAll((done) => {
    server = app.listen(0, '127.0.0.1', () => {
        base = `http://127.0.0.1:${server.address().port}`;
        done();
    });
});

afterAll((done) => {
    server.close(done);
});

const post = async (path, body) => {
    const res = await fetch(`${base}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: typeof body === 'string' ? body : JSON.stringify(body),
    });
    return { status: res.status, body: await res.json() };
};

describe('hash', () => {
    const string = 'This is my string';

    it.each([
        ['md5', 'c2a9ce57e8df081b4baad80d81868bbb'],
        ['sha1', '37fb219bf98bee51d2fdc3ba6d866c97f06c8223'],
        ['sha256', '9da6c02379110815278b615f015f0b254fd3d5a691c9d8abf8141655982c046b'],
        ['sha512', '349cc35836ba85915ace9d7f895b712fe018452bb4b20ff257257e12adeb1e83ad780c6568a12d03f5b2cb1e3da23b8b7ced9012a188ef3855e0a8f3db211883'],
    ])('%s', async (algorithm, hash) => {
        expect(await post(`/${algorithm}`, { string })).toEqual({ status: 200, body: { string, algorithm, hash } });
    });

    it('does not accept other algorithms', async () => {
        const res = await fetch(`${base}/sha384`, { method: 'POST' });
        expect(res.status).toBe(404);
    });
});

describe('base64', () => {
    const string = 'My name is Crocodile Dundee!';
    const encoded = 'TXkgbmFtZSBpcyBDcm9jb2RpbGUgRHVuZGVlIQ==';

    it('encodes', async () => {
        expect((await post('/encode', { string })).body.encode).toBe(encoded);
    });

    it.each([[encoded, string], ['TWE', 'Ma'], ['TWE=\n', 'Ma'], ['-_8', '��']])('decodes %j', async (input, expected) => {
        expect((await post('/decode', { string: input })).body.decode).toBe(expected);
    });

    // O Buffer do Node devolveria lixo para essas entradas em vez de erro.
    it.each(['não é base64!!', 'abc$', 'A', 'AB=C'])('rejects %j', async (input) => {
        expect(await post('/decode', { string: input })).toEqual({
            status: 400,
            body: { error: true, message: 'Invalid Base64 string.' },
        });
    });
});

describe('input validation', () => {
    it.each(['/md5', '/encode', '/decode', '/connect'])('%s without a string returns 400', async (path) => {
        const { status, body } = await post(path, {});
        expect(status).toBe(400);
        expect(body.error).toBe(true);
    });

    it('malformed JSON returns 400, not 500', async () => {
        const { status, body } = await post('/md5', '{"string":');
        expect(status).toBe(400);
        expect(body.error).toBe(true);
    });
});

it('/externalip returns the visitor IP sent by the proxy, not the server IP', async () => {
    // O nginx acrescenta o IP real no fim; o que vem antes e o que o cliente mandou (forjavel).
    const res = await fetch(`${base}/externalip`, { headers: { 'X-Forwarded-For': '6.6.6.6, 203.0.113.7' } });
    expect(await res.json()).toEqual({ ip: '203.0.113.7' });
});
