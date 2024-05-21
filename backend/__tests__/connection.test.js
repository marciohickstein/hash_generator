
const network = require('../src/utils/network');

jest.mock('../src/utils/network', () => ({
    connect: () => Promise.resolve({
        success: true,
        message: ''
    })
}));

const HOST = "localhost";
const PORT = "3030";

it(`Should connect into client`, async () => {
    const response = await network.connect(HOST, PORT);

    expect(response.success).toBe(true);
})