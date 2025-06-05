## src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const defaultBackgroundColor = '#282c34';
const defaultTextColor = '#ffffff';
const defaultFontSize = '16px';
const defaultFontFamily = 'sans-serif';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${defaultBackgroundColor};
    color: ${defaultTextColor};
    font-size: ${defaultFontSize};
    font-family: ${defaultFontFamily};
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  button {
    cursor: pointer;
  }

  /* Dark mode theme */
  body.dark-mode {
    background-color: #121212;
    color: #ffffff;
  }

  /* Add more global styles here */
`;

export const theme = {
  // Define your color palette here
  colors: {
    primary: '#6200EE',
    secondary: '#03DAC6',
    background: defaultBackgroundColor,
    text: defaultTextColor,
    surface: '#3700B3',
    error: '#B00020',
  },
  // Define your font sizes here
  fontSizes: {
    small: '12px',
    medium: defaultFontSize,
    large: '20px',
  },
  // Define your font weights here
  fontWeights: {
    normal: 400,
    bold: 700,
  },
  // Define your spacing here
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  // Define your breakpoints for responsive design here
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '992px',
  },
};
