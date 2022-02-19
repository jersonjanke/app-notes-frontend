import '../../styles/globals.css';
import { storeWrapper } from '../store';
import type { AppProps } from 'next/app';
import { gray } from 'utils/colors';
import { Container } from 'react-grid-system';
import Header from 'components/Header';
import Footer from 'components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Container style={{ flex: '1 0 auto' }}>
        <Component style={{ backgroundColor: gray }} {...pageProps} />
      </Container>
      <Footer />
    </>
  );
}

export default storeWrapper.withRedux(MyApp);
