export const camelCase = (string) => {
    const array = string.split(' ');
    const arrayInCamelCase = array.map((w) => {
        const wordInCamelCase = w[0].toUpperCase() + w.slice(1).toLowerCase();

        return wordInCamelCase;
    })

    return arrayInCamelCase.join(' ');
}

