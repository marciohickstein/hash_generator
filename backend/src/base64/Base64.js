class Base64 {
    constructor(string) {
        this.string = string;
        this.hasError = false;
        this.error = '';
    }

    setString(string) {
        this.string = string;
    }

    getString() {
        return this.string;
    }

    encode() {
        return Buffer.from(this.string, 'utf8').toString('base64');
    }

    decode() {
        return Buffer.from(this.string, 'base64').toString('utf8');
    }
}

module.exports = Base64;