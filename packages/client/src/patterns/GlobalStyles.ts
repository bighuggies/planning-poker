import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,*::after,*::before {
    box-sizing: border-box;
  }

  :root {
    font-size: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
  }
`;
