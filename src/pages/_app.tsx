import '../../styles/globals.css';
import { storeWrapper } from '../store';
import type { AppProps } from 'next/app';
import { Container } from 'react-grid-system';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { StoreData, User } from 'types/Login';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const user = useSelector((state: StoreData) => state.user);

  useEffect(() => {
    if (user?.token) {
      axios.defaults.headers.common['Authorization'] = user.token;
    }
  }, [user]);

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
