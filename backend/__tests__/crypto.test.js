const string2Test = "This is my string";

const Md5Generator = require('../src/crypto/Md5Generator');
const ShaGenerator = require('../src/crypto/ShaGenerator');

it(`Should generate a md5 hash from ${string2Test}`, () => {
    const hash = new Md5Generator(string2Test);

    expect(hash.generate()).toBe("c2a9ce57e8df081b4baad80d81868bbb");
})


it(`Should generate a sha1 hash from ${string2Test}`, () => {
    const hash = new ShaGenerator(string2Test);

    expect(hash.generate()).toBe("37fb219bf98bee51d2fdc3ba6d866c97f06c8223");
})

