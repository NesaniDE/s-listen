import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-purple': '#7A3FFF',
        'dark-purple': '#4B1FA8',
        'warm-yellow': '#FFD54A',
        'gold': '#F5B700',
        'bg-main': '#12091F',
        'bg-card': '#1B1230',
        'text-primary': '#F8F6FF',
        'text-muted': '#C7B5FF',
      },
      fontFamily: {
        heading: ['Unbounded', 'sans-serif'],
        body: ['Sora', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'purple-glow': 'radial-gradient(ellipse at top, #4B1FA8 0%, #12091F 70%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'glow-purple': '0 0 40px rgba(122, 63, 255, 0.3)',
        'glow-yellow': '0 0 30px rgba(255, 213, 74, 0.25)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(122, 63, 255, 0.2)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
export default config
