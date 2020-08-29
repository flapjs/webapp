/* eslint-env node */

module.exports = api => {
    return {
        plugins: [
            ...(api.env('development') ? [
                // Development-only plugins
                // 'react-refresh/babel'
            ]
            : [
                // Production-only plugins
            ])
        ],
        presets: [
            [ '@babel/preset-env', { targets: { esmodules: true } } ],
            '@babel/preset-react'
        ]
    };
}
