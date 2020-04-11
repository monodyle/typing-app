const purgecss = [
  "@fullhuman/hostcss-purgecss",
  {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    defaultExtractor: content =>
      content.match(/[\w-/:]+(?<!:)/g) || [],
  }
]

module.exports = {
  plugins: [
    "postcss-import",
    'tailwindcss',
    ["postcss-preset-env", { stage: 1 }],
    ...(process.env.NODE_ENV === "production" ? [purgecss] : [])
  ],
}
