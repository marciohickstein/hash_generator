const crypto = require('crypto');

class HashGenerator {
    constructor(string, algorithm = 'md5') {
        this.string = string;
        this.algorithm = algorithm;
    }

    generate() {
        if (!this.validate()) {
            return ;
        }

        return crypto.createHash(this.algorithm).update(this.string).digest('hex');        
    }

    validate() {
        return (typeof this.string === 'string');
    }

    getString() {
        return this.string;
    }

    setString(string) {
        this.string = string;
    }

    getAlgorithm() {
        return this.algorithm;
    }

    setAlgorithm(algorithm) {
        this.algorithm = algorithm;
    }
}

module.exports = HashGenerator;