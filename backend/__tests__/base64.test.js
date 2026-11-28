const Base64 = require('../src/base64/Base64');

const string = `My name is Crocodile Dundee!`;
const stringEncoded = `TXkgbmFtZSBpcyBDcm9jb2RpbGUgRHVuZGVlIQ==`

test(`Should encode in base 64`, () => {
    const base64 = new Base64(string);
    const result = base64.encode();

    expect(result).toBe(stringEncoded);
})

test(`Should decode in base 64`, () => {
    const base64 = new Base64(stringEncoded);
    const result = base64.decode();

    expect(result).toBe(string);
})

test.each(['não é base64!!', 'abc$', 'A', 'AB=C'])('Should reject invalid base 64 %s', (input) => {
    expect(() => new Base64(input).decode()).toThrow('Invalid Base64 string.');
})

test.each([['TWE', 'Ma'], ['TWE=\n', 'Ma'], ['-_8', '\ufffd\ufffd']])('Should accept %j', (input, expected) => {
    expect(new Base64(input).decode()).toBe(expected);
})
