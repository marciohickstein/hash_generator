const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
    js.configs.recommended,
    {
        languageOptions: {
            sourceType: 'commonjs',
            globals: { ...globals.node, ...globals.jest },
        },
        rules: {
            // Middleware de erro do Express precisa dos 4 argumentos, mesmo sem usar o next.
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        },
    },
];
