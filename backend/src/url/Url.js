class Url {
    constructor() {
    }

    encodeUrl(url) {
        return encodeURIComponent(url);
    }

    decodeUrl(encodedUrl) {
        return decodeURIComponent(encodedUrl);
    }
}

module.exports = Url;