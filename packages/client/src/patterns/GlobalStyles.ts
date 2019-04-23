import { createGlobalStyle } from 'styled-components';

import { breakpoints } from './breakpoints';
import { palette } from './palette';

export const GlobalStyles = createGlobalStyle`
  *, *::after, *::before {
    box-sizing: border-box;
  }
  
  :root {
    color: ${palette.gray(20)};
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.5;

    @media(min-width: ${breakpoints.small}) {
      font-size: 20px;
    }
  }

  body {
    margin: 0;
    padding: 0;
    background-color: ${palette.gray(97)};
  }

  button {
    border: none;
    border-radius: 4px;
    background: ${palette.colors.yankeesBlue};
    font-size: inherit;
    color: ${palette.gray(90)};
    height: 48px;
    padding: 0 1rem;
    cursor: pointer;
  }

  input[type="text"] {
    font-size: inherit;
    color: inherit;
    height: 48px;
    padding: 0 0.25rem;
    border: 1px solid ${palette.gray(70)};
    border-radius: 4px;
  }
`;
