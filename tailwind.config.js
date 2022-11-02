/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{html,js,ts,jsx,tsx}',
        './components/**/*.{html,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
        fontFamily: {
            sans: ['Helvetica Neue', 'sans-serif'],
        },
    },
    plugins: [],
}
