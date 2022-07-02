import Header from 'components/Header';
import Footer from 'components/Footer';
import type { AppProps } from 'next/app';
import { Container } from 'react-grid-system';
import { ToastContainer } from 'react-toastify';
import { storeWrapper } from '../store';
import Script from 'next/script';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from '../../styles/globalStyles';
import { useSelector } from 'react-redux';
import { StoreData } from 'types/Login';

function MyApp({ Component, pageProps }: AppProps) {
  const ID = 'G-ZKJ93ZEE7P';
  const user = useSelector((state: StoreData) => state.user);

  return (
    <>
      <Header showSettings={!!user?.token} />
      <GlobalStyle />
      <Container style={{ width: '100%', flex: ' 1 0 auto' }}>
        <Component {...pageProps} />
      </Container>
      <Footer />
      <>
        <ToastContainer autoClose={500} hideProgressBar={true} />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${ID}');
        `}
        </Script>
      </>
    </>
  );
}

export default storeWrapper.withRedux(MyApp);
