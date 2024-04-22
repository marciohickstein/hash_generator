const url = `https://us-east-1.console.aws.amazon.com/billing/home?region=us-east-1#/bills`;
const encodedUrl =  `https%3A%2F%2Fus-east-1.console.aws.amazon.com%2Fbilling%2Fhome%3Fregion%3Dus-east-1%23%2Fbills`;
const Url = require('../src/url/Url');

test('Should return a encoded URL', () => {
    const result = new Url().encodeUrl(url);
    expect(result).toEqual(encodedUrl);
});

test('Should return a decoded URL', () => {
    const result = new Url().decodeUrl(encodedUrl);
    expect(result).toEqual(url);
});


