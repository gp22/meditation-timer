module.exports = {
  content: ['./src/pages/**/*.js'],
  theme: {
    fontFamily: {
      body: [
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
    fontSize: {
      base: 'clamp(1.13rem, calc(1.13rem + 0.00vw), 1.13rem)',
      md: 'clamp(1.41rem, calc(1.33rem + 0.36vw), 1.59rem)',
      lg: 'clamp(1.76rem, calc(1.57rem + 0.96vw), 2.25rem)',
      xl: 'clamp(2.20rem, calc(1.81rem + 1.92vw), 3.18rem)',
      '2xl': 'clamp(2.75rem, calc(2.06rem + 3.42vw), 4.50rem)',
      '3xl': 'clamp(3.43rem, calc(2.29rem + 5.71vw), 6.36rem)'
    },
    extend: {},
  },
  plugins: [],
}
