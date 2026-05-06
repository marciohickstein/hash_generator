export const camelCase = (string) => {
    const array = string.split(' ');
    const arrayInCamelCase = array.map((w) => {
        const wordInCamelCase = w[0].toUpperCase() + w.slice(1).toLowerCase();

        return wordInCamelCase;
    })

    return arrayInCamelCase.join(' ');
}

export const httpRequest = async (path, string) => {
    try {
        const responseFetch = await fetch(`/${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ string })
        });

        const responseJson = await responseFetch.json();
        return responseJson;

    } catch (error) {
        return {
            error: true,
            message: error.message
        }
    }
}

export const httpGetRequest = async (path) => {
    try {
        const responseFetch = await fetch(`/${path}`);
        const responseJson = await responseFetch.json();
        return responseJson;

    } catch (error) {
        return {
            error: true,
            message: error.message
        }
    }
}