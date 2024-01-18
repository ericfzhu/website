const plugin = require('tailwindcss/plugin')

module.exports = {
    content: [
        './src/pages/**/*.{html,js,ts,jsx,tsx}',
        './src/components/**/*.{html,js,ts,jsx,tsx,json}',
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
                    '0 1px 1px rgba(255, 255, 255, 1)',
                    '0 1px 1px rgba(255, 255, 255, 1)',
                ],
                glowaccent: [
                    '0 1px 10px rgba(112, 163, 242, 1)',
                    '0 1px 10px rgba(112, 163, 242, 1)',
                ],
            },
            fontFamily: {
                notoSerifSC: ['var(--noto-serif-sc)'],
                notoSansSC: ['var(--noto-sans-sc)'],
                notoSerifDisplay: ['var(--noto-serif-display)'],
                indieFlower: ['var(--indieFlower)'],
                glassAntiqua: ['var(--glassAntiqua)'],
                inter: ['var(--inter)'],
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
