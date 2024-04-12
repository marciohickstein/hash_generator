class HashGenerator {
    generate() {
        throw new Error(`It's only a interface!`);
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