const crypto = require('crypto');
const HashGenerator = require('./HashGenerator');

class ShaGenerator extends HashGenerator {
    constructor(string) {
        super();
        this.type = 'sha1';
        this.string = string;
    }

    generate() {
        if (!this.validate()) {
            return ;
        }

        return crypto.createHash('sha1').update(this.string).digest('hex');        
    }
}

module.exports = ShaGenerator;