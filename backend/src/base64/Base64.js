class Base64 {
    constructor(string) {
        this.string = string;
    }

    setString(string) {
        this.string = string;
    }

    getString() {
        return this.string;
    }
    
    encode() {
        return btoa(this.string);
    }

    decode() {
        return atob(this.string);
    }
}

module.exports = Base64;