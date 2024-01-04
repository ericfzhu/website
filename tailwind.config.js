const plugin = require('tailwindcss/plugin')

module.exports = {
    content: [
        './src/pages/**/*.{html,js,ts,jsx,tsx}',
        './src/components/**/*.{html,js,ts,jsx,tsx}',
        'public/',
    ],
    theme: {
        extend: {
            cursor: {
                'mac-cursor': `url('/assets/cursor.svg'), default`,
            },
            colors: {
                accent: '#70A3F2',
                secondary: '#666666',
            },
            dropShadow: {
                glow: [
                    '0 2px 20px rgba(98, 162, 100, 1)',
                    '0 2px 20px rgba(98, 162, 100, 1)',
                ],
                glowwhite: [
                    '0 2px 20px rgba(255, 255, 255, 1)',
                    '0 2px 20px rgba(255, 255, 255, 1)',
                ],
            },
        },
        fontFamily: {
            sans: ['Helvetica Neue', 'sans-serif'],
        },
    },
    extend: {},
    plugins: [
        require('@tailwindcss/container-queries'),
        require('@codaworks/react-glow/tailwind'),
        // plugin(function ({ addUtilities }) {
        //     addUtilities({
        //         '.no-scrollbar::-webkit-scrollbar': {
        //             display: 'none',
        //         },
        //         '.no-scrollbar': {
        //             '-ms-overflow-style': 'none',
        //             'scrollbar-width': 'none',
        //         },
        //     })
        // }),
    ],
}
