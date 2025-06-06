import { createGlobalStyle } from 'styled-components';

const defaultBackgroundColor = '#1A1A2E';
const defaultTextColor = '#FFFFFF';
const defaultFontSize = '16px';
const defaultFontFamily = "'Inter', sans-serif";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

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
    font-family: ${defaultFontFamily};
  }

  /* Dark mode theme */
  body.dark-mode {
    background-color: ${defaultBackgroundColor};
    color: #ffffff;
  }

  /* Add more global styles here */
`;

export const theme = {
  // Define your color palette here
  colors: {
    primary: '#1F2937',
    secondary: '#03DAC6', // This will be replaced or unused
    accent: '#3B82F6',
    button: '#2a2f3b',
    background: defaultBackgroundColor,
    text: defaultTextColor,
    textSecondary: '#E0E0E0',
    disabled: '#4B5563',
    surface: '#1F2937', // Background for cards
    error: '#B00020',
  },
  // Define your font sizes here
  fontSizes: {
    small: '12px',
    medium: defaultFontSize, // 16px
    large: '20px',
    cardTitle: '16px',
    cardSubtitle: '14px',
    sectionTitle: '24px',
    pageTitle: '36px',
  },
  // Define your font weights here
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  // Define your spacing here
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
    xlarge: '48px',
  },
  // Define your breakpoints for responsive design here
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '992px',
  },
};
