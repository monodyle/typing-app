module.exports = {
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#24292E',
      lightgray: '#f5f7f7',
      // shade of grey
      snow: '#F9FAFC',
      dirtysnow: '#E5E9F2',
      carbon: '#C0CCDA',
      smoke: '#8492A6',
      granite: '#3C4758',

      // color
      orange: '#F6511D',
      purple: '#8338EC',
      blue: '#23C8D2',
      red: '#EA344F',
      'light-red': '#f7aeb9',
      green: '#72D54B',
      'light-green': '#e6ffed',
      'mid-green': '#acf2bd',
      yellow: '#F7AC2A'
    },
    fontFamily: {
      mono: ['"Roboto Mono"', '"SF Mono"', 'monospace'],
      sans: ['Inter', 'sans-serif'],
      serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif']
    },
    screens: {
      tablet: '768px',
      desktop: '1280px'
    },
    extend: {
      maxWidth: {
        'line-length': '80ch'
      }
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'disabled'],
    textColor: ['responsive', 'hover', 'focus', 'disabled'],
    borderColor: ['responsive', 'hover', 'focus', 'disabled']
  },
  plugins: []
}
