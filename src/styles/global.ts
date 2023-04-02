import { createGlobalStyle } from 'styled-components';
import { baseTheme } from './theme';

const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
}
body {
  background-color: ${baseTheme.colors.bgBody};
  color: ${baseTheme.colors.darkPrimary};
  height: 100%;
  min-width: 320px;
}

#root {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  /* overflow: hidden; */
  overflow-y: auto;
  
  > main {
    flex: 1 1 auto;
  }
}
`;

export { GlobalStyles };
