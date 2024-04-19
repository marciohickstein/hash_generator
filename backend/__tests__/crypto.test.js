const HashGenerator = require('../src/crypto/HashGenerator');

let hash;
const string2Test = "This is my string";

beforeAll(() => {
    hash = new HashGenerator(string2Test);
})

it(`Should generate a md5 hash from ${string2Test}`, () => {
    hash.setAlgorithm('md5');
    expect(hash.generate()).toBe("c2a9ce57e8df081b4baad80d81868bbb");
})

it(`Should generate a sha1 hash from ${string2Test}`, () => {
    hash.setAlgorithm('sha1');
    expect(hash.generate()).toBe("37fb219bf98bee51d2fdc3ba6d866c97f06c8223");
})

it(`Should generate a sha256 hash from ${string2Test}`, () => {
    hash.setAlgorithm('sha256');
    expect(hash.generate()).toBe("9da6c02379110815278b615f015f0b254fd3d5a691c9d8abf8141655982c046b");
})

it(`Should generate a sha1 hash from ${string2Test}`, () => {
    hash.setAlgorithm('sha512');
    expect(hash.generate()).toBe("349cc35836ba85915ace9d7f895b712fe018452bb4b20ff257257e12adeb1e83ad780c6568a12d03f5b2cb1e3da23b8b7ced9012a188ef3855e0a8f3db211883");
})

afterAll(() => {
    hash = null;
})