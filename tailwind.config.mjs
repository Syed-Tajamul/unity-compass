/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Official Unity Compass Brand Tokens
        'primary-navy': '#0C487A',
        'deep-navy': '#0A2540',
        'fed-navy': '#07192C',
        'brand-red': '#FF3130',
        'brand-red-hover': '#E02827',
        'main-text': '#0F172A',
        'muted-text': '#64748B',
        'neutral-slate': '#475569',
        'light-bg': '#F8FAFC',
        'subtle-surface': '#F1F5F9',
        'brand-border': '#E2E8F0',

        // Contragenix-Style Reference Palette
        'cg-blue': '#0B2553',
        'cg-royal': '#3355A5',
        'cg-orange': '#EE8522',
        'cg-orange-hover': '#D97312',
        'cg-peach': '#FDF0E6',
        'cg-light-blue': '#F0F6FD',
        'cg-soft-surface': '#F8FAFD',
        'cg-border': '#E8EEF5',
        
        // Backward-compatibility token mapping
        brand: {
          navy: '#0C487A',
          deep: '#0A2540',
          dark: '#07192C',
          slate: '#324A6D',
          red: '#FF3130',
          'red-hover': '#E02827',
          'red-light': '#FEE2E2',
          muted: '#64748B',
          surface: '#F8FAFC',
          border: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Outfit', 'system-ui', 'sans-serif'],
        display: ['Outfit', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'elevated': '0 10px 25px -5px rgba(12, 72, 122, 0.08), 0 8px 10px -6px rgba(12, 72, 122, 0.04)',
        'card': '0 4px 14px 0 rgba(10, 37, 64, 0.05), 0 1px 3px 0 rgba(10, 37, 64, 0.03)',
        'card-hover': '0 20px 35px -10px rgba(12, 72, 122, 0.12), 0 8px 16px -6px rgba(12, 72, 122, 0.06)',
        'glow-red': '0 8px 24px -4px rgba(255, 49, 48, 0.35)',
        'glow-navy': '0 10px 30px -5px rgba(12, 72, 122, 0.35)',
        'spotlight': '0 0 50px -10px rgba(12, 72, 122, 0.25)',
      },
      borderRadius: {
        'card': '0.875rem',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}
