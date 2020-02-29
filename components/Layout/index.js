import { Component } from 'react';
import Head from 'next/head';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Container from './Container';
import Title from './Title';
import Main from './Main';
import Footer from './Footer';
import Header from './Header';

const theme = {
  red: '#ff0000',
  black: '#393939',
  grey: '#3a3a3a',
  lightgrey: '#e1e1e1',
  offWhite: '#ededed',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  smallBorderRadius: '6px'
};

const GlobalStyle = createGlobalStyle`
html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  a {
    text-decoration: none;
    color: ${theme.black}
  }
`;

class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle></GlobalStyle>
          <Container>
            <Head>
              <title>Resto</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header></Header>

            <Main>
              {/* <Title>
                Welcome to <a href="javascript:;">RESTO!</a>
              </Title> */}
              {children}
            </Main>

            <Footer>
              <a
                href="https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Powered by <img src="/zeit.svg" alt="ZEIT Logo" />
              </a>
            </Footer>
          </Container>
        </>
      </ThemeProvider>
    );
  }
}

export default Layout;
