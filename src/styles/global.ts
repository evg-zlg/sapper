import { createGlobalStyle } from 'styled-components';
import { baseTheme } from './theme';

const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: ${baseTheme.colors.bgPrimery};
  color: ${baseTheme.colors.darkPrimary};
}
`;

export { GlobalStyles };
