/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
                // Primary Colors
                'fitness-green': {
                  100: '#E1F7EC', // Lightest green for backgrounds/highlights
                  300: '#55D6A8',
                  500: '#16C47F', // Primary green - actions, active states
                  700: '#0D8C56', // Darker green for hover/stronger emphasis
                  900: '#085938', //Darkest green for text when on light surfaces
                },
                'fitness-yellow': {
                   100: '#FFF8E6',
                  300: '#FFE58F',
                  500: '#FFD65A', // Primary yellow - warnings, less critical
                  700: '#E6BE34',
                  900: '#80671A', //Darkest Yellow for text when on light surfaces
                },
                'fitness-orange': {
                  100: '#FFF0E0',
                  300: '#FFB85C',
                  500: '#FF9D23',  // Primary orange - important notices, energy
                  700: '#E68300',
                  900: '#804200', //Darkest orange for text when on light surfaces
                },
                 'fitness-red': {
                  100: '#FEE7E5',
                  300: '#FC7164',
                   500: '#F93827', // Primary red - errors, critical alerts
                   700: '#C62C20',
                   900: '#731B15', //Darkest red for text when on light surfaces
                },
                'fitness-gray': { //Good for backgrounds and borders to contrast
                    100: '#f7f7f7',
                     200: '#f0f0f0',
                    300: '#e0e0e0',
                     400: '#d1d1d1',
                   500: '#b8b8b8',
                   600: '#9e9e9e',
                   700: '#6b6b6b',
                   800: '#434343',
                   900: '#212121'
                 },
                 'fitness-white': '#FFFFFF',
                'fitness-black': '#000000',
      }
    },
  },
  plugins: [],
}