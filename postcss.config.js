module.exports = {
  plugins: {
    // For Tailwind v4 the PostCSS plugin is provided by @tailwindcss/postcss
    // This avoids the "trying to use `tailwindcss` directly as a PostCSS plugin" error.
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}