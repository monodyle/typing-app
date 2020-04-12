module.exports = {
  plugins: [
    'tailwindcss',
    'postcss-import',
    ...(process.env.NODE_ENV === 'production'
      ? [
          [
            '@fullhuman/postcss-purgecss',
            {
              content: ['./src/**/*.{js,jsx,ts,tsx}'],
              defaultExtractor: content =>
                content.match(/[\w-/:]+(?<!:)/g) || []
            }
          ]
        ]
      : []),
    'postcss-preset-env'
  ]
}
