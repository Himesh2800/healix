/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#6366f1', // Indigo 500
                    dark: '#4f46e5',    // Indigo 600
                    light: '#818cf8',   // Indigo 400
                },
                secondary: {
                    DEFAULT: '#ec4899', // Pink 500
                    dark: '#db2777',    // Pink 600
                    light: '#f472b6',   // Pink 400
                },
                accent: {
                    DEFAULT: '#14b8a6', // Teal 500
                    dark: '#0d9488',    // Teal 600
                    light: '#2dd4bf',   // Teal 400
                },
                dark: {
                    DEFAULT: '#020617', // Slate 950
                    lighter: '#0f172a', // Slate 900
                    card: '#1e293b',    // Slate 800
                },
                light: {
                    DEFAULT: '#f8fafc', // Slate 50
                    darker: '#e2e8f0',  // Slate 200
                },
                surface: {
                    DEFAULT: '#ffffff',
                    dark: '#1e293b',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}
