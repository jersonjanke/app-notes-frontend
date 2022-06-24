import axios from 'axios';
import Header from 'components/Header';
import Footer from 'components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { Container } from 'react-grid-system';
import { ToastContainer } from 'react-toastify';
import { storeWrapper } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { StoreData } from 'types/Login';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { getCookie } from 'cookies-next';
import { userUpdate } from 'store/actions/user';
import GlobalStyle from '../../styles/globalStyles';
import '../../styles/font.css';

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const user = useSelector((state: StoreData) => state.user);
  const ID = 'G-ZKJ93ZEE7P';

  useEffect(() => {
    const userData = getCookie('token');
    userData && setData(JSON.parse(userData as string));
    if (user?.token?.length) {
      axios.defaults.headers.common['Authorization'] = user.token;
    }
  }, [user]);

  useEffect(() => {
    if (data && !user?.token?.length) {
      dispatch(userUpdate(data));
    }
  }, [data, dispatch, user]);

  return (
    <>
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
      <GlobalStyle />
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
