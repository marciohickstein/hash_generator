const crypto = require('crypto');

class HashGenerator {
    constructor(string, type) {
        this.type = type;
        this.string = string;
    }

    generate() {
        if (!this.validate()) {
            return ;
        }

        return crypto.createHash(this.type).update(this.string).digest('hex');        
    }

    validate() {
        return (typeof this.string === 'string');
    }

    getString() {
        return this.string;
    }

    getType() {
        return this.type;
    }
}

module.exports = HashGenerator;