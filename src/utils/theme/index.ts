import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  sm: '40rem', // 640px
  md: '48em', // 768
  lg: '62em', // 992
  xl: '80em', // 1280
  '2xl': '85.375em', // 1366
  '3xl': '90em', // 1440
  '4xl': '96em', // 1536
  '5xl': '120em' // 1920
})

export const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        fontSize: 'md',
        fontFamily: '"Montserrat", sans-serif',
        lineHeight: 'tall',
        bg: '#F2F2F7'
      }
    })
  },
  breakpoints,
  fonts: {
    heading: '"Montserrat", sans-serif',
    body: '"Montserrat", sans-serif'
  },
  fontSizes: {
    xx: '.55rem',
    tiny: '.68rem',
    '7xl': '5rem',
    '8xl': '6rem'
  },
  colors: {
    brand: {
      bg: {
        50: 'rgba(0, 0, 0, 0.3);',
        100: '#F8FFFB',
        200: '#FCFCFC'
      },
      green: {
        50: '#caf0d9',
        100: ' rgba(0, 191, 77, 0.5)',
        200: ' rgba(0, 191, 77, 1)'
      }
    },
    brandGreen: {
      // 500: '#00BF4D',
      500: '#02993E',
      600: '#02993E'
    }
  },
  space: {
    14: '3.5rem',
    60: '15rem',
    66: '17.5rem',
    70: '18rem',
    80: '20rem',
    82: '21rem',
    85: '23rem',
    90: '25rem',
    95: '26rem',
    108: '27rem',
    109: '28rem',
    110: '30rem',
    115: '32rem',
    120: '35rem',
    122: '37rem',
    125: '45rem',
    127: '48rem',
    130: '55rem',
    135: '60rem',
    137: '65rem',
    140: '70rem',
    145: '76rem'
  },
  sizes: {
    14: '3.5rem',
    60: '15rem',
    66: '17.5rem',
    70: '18rem',
    80: '20rem',
    82: '21rem',
    85: '23rem',
    90: '25rem',
    95: '26rem',
    108: '27rem',
    109: '28rem',
    110: '30rem',
    115: '32rem',
    117: '33rem',
    120: '35rem',
    122: '37rem',
    124: '40rem',
    125: '45rem',
    127: '48rem',
    130: '55rem',
    135: '60rem',
    137: '65rem',
    140: '70rem',
    145: '76rem'
  },
  shadows: {
    1000: '0 10px 20px 0 rgba(97, 111, 57, 0.5)',
    2000: '10px 10px 20px 0 rgba(0, 0, 0, 0.1);'
  }
})
