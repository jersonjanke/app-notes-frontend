import '../../styles/globals.css';
import { storeWrapper } from '../store';
import type { AppProps } from 'next/app';
import { Container } from 'react-grid-system';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Container className="container">
        <Component {...pageProps} />
      </Container>
      <Footer />
      <ToastContainer autoClose={500} hideProgressBar={true} />
    </>
  );
}

export default storeWrapper.withRedux(MyApp);
