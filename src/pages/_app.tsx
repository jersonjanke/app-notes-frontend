import '../../styles/globals.css';
import axios from 'axios';
import Header from 'components/Header';
import Footer from 'components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { Container } from 'react-grid-system';
import { ToastContainer } from 'react-toastify';
import { storeWrapper } from '../store';
import { useSelector } from 'react-redux';
import { StoreData } from 'types/Login';
import { useEffect } from 'react';
import { Head } from 'next/document';

function MyApp({ Component, pageProps }: AppProps) {
  const user = useSelector((state: StoreData) => state.user);

  useEffect(() => {
    if (user?.token?.length) {
      axios.defaults.headers.common['Authorization'] = user.token;
    }
  }, [user]);

  return (
    <>
      <Head>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-ZKJ93ZEE7P`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZKJ93ZEE7P', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
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
