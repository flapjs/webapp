/* eslint-env node */
const path = require('path');

module.exports = {
    'env': {
        'browser': true,
        'es2020': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:import/react',
        'plugin:import/recommended',
    ],
    'settings': {
        'react': {
            'version': 'detect'
        },
        /** For import aliases (eslint-plugin-import-resolver-alias) */
        'import/resolver': {
            alias: {
                map: [
                    /** Add any aliases that need to be resolved by eslint here. Refer to webpack and jest config as well. */
                    // NOTE: This does not resolve for stylelint.
                    ['@flapjs', path.resolve(__dirname, 'src')]
                ]
            }
        },
    },
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 11,
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        'import',
        'react-hooks',
    ],
    'rules': {
        'indent': [
            'error',
            4,
            { 'SwitchCase': 1 }
        ],
        // We turn this off, since git already converts all linebreaks to unix style.
        'linebreak-style': [
            'off',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        /** Our custom-defined rules... */

        // Allman brace style (braces on new lines) is more readable.
        'brace-style': [
            'error',
            'allman',
            { 'allowSingleLine': true }
        ],
        // We want an empty line at the end. Just convention.
        'eol-last': [
            'error',
            'always'
        ],
        /*
         * This disables removing unused parameters from functions.
         * The reason is because knowing what parameters are expected
         * in a function can be a useful self-documenting feature.
         */
        'no-unused-vars': [
            'error',
            {
                'vars': 'all',
                'args': 'none'
            }
        ],
        // Enforces all imports to have file extensions.
        'import/extensions': ['error', 'ignorePackages'],
        // This makes sure that dynamic imports are properly configured for webpack.
        'import/dynamic-import-chunkname': 'error',
        // Only allow JSX usage in these file types.
        'react/jsx-filename-extension': [
            'error',
            {
                'extensions': ['jsx', 'spec.js', 'stories.js']
            }
        ],
        /** React Hooks */
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn'
    },
    'overrides': [
        {
            'files': [ '*.spec.js' ],
            'env': {
                'jest': true
            }
        },
        {
            'files': ['*.stories.js'],
            'env': {
                'node': true
            }
        }
    ]
};
