const defaultSans = [
  "system-ui",
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  "Roboto",
  '"Helvetica Neue"',
  "Arial",
  '"Noto Sans"',
  "sans-serif",
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Noto Color Emoji"',
];

const defaultSerif = [
  "Georgia",
  "Cambria",
  '"Times New Roman"',
  "Times",
  "serif",
];

module.exports = {
  purge: [
    './styles/*.{css,scss}',
    './{pages,components,context,actions,utils}/**/*.{js,css,scss}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#049FA0',
        dark: '#151f2d',
        silver: '#ededf1',
        'onyx': '#393D3F',
        'new-york-pink': '#CD8987',
        'dark-electric-blue': '#546A7B',
        'blue-gray': '#6C91BF',
        'cream': '#efe4cf'
      },
      fontSize: {
        "7xl": "4.5rem",
      },
      spacing: {
        14: "3.375rem",
      },
    }
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
}