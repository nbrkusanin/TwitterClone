module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      
    },

    fill: theme => ({
      'green': theme('colors.green.500'),
      'white': theme('colors.white'),
    })
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
