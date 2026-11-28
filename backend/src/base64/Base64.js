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
        // Buffer ignora caracteres invalidos em silencio, entao valida antes.
        // Aceita base64 e base64url, com ou sem padding; tamanho % 4 == 1 nao existe.
        const clean = this.string.replace(/\s/g, '');
        if (!/^[A-Za-z0-9+/_-]*={0,2}$/.test(clean) || clean.replace(/=+$/, '').length % 4 === 1) {
            throw new Error('Invalid Base64 string.');
        }
        return Buffer.from(clean, 'base64').toString('utf8');
    }
}

module.exports = Base64;