const crypto = require('crypto');
const HashGenerator = require('./HashGenerator');

class Md5Generator extends HashGenerator {
    constructor(string) {
        super();
        this.type = 'md5';
        this.string = string;
    }

    generate() {
        if (!this.validate()) {
            return ;
        }

        return crypto.createHash('md5').update(this.string).digest('hex');        
    }
}

module.exports = Md5Generator;