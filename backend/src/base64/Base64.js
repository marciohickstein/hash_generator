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
        let result = null;

        try {
            result = btoa(this.string);
            this.error = '';
            this.hasError = false;
        } catch (error) {
            this.error = error;
            this.hasError = true;
        }

        return result;
    }

    decode() {
        let result = null;

        try {
            result = atob(this.string);
            this.error = '';
            this.hasError = false;
        } catch (error) {
            this.error = error;
            this.hasError = true;
        }

        return result;
    }

    getErrorMessage() {
        return this.error.message;
    }

    hasError() {
        return this.hasError();
    }
}

module.exports = Base64;