import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

html,
body,
h1,
h2,
h3,
h4,
h5,
h6 {
  padding: 0;
  margin: 0;
  letter-spacing: 0.5px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

body {
  display: flex;
  flex-direction: column;
}

#__next {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

a {
  color: inherit;
  text-decoration: none;
  font-size: 12px;
  cursor: pointer;
  font-weight: 600;
}

* {
  box-sizing: border-box;
  font-family: 'Catamaran', sans-serif;
}
`;

export default GlobalStyle;
