module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '124': '30rem',
      }
    },

    fill: theme => ({
      'green': theme('colors.green.500'),
      'green-200': theme('colors.green.200'),
      'gray': theme('colors.gray.500'),
      'red': theme('colors.red.300'),
      'white': theme('colors.white'),
    })
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
