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

it('returns the visitor IP sent by the proxy, not the server IP', async () => {
    // O nginx acrescenta o IP real no fim; o que vem antes e o que o cliente mandou (forjavel).
    const res = await fetch(`${base}/externalip`, { headers: { 'X-Forwarded-For': '6.6.6.6, 203.0.113.7' } });
    expect(await res.json()).toEqual({ ip: '203.0.113.7' });
});
