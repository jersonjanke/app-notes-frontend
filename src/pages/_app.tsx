import '../../styles/globals.css';
import { storeWrapper } from '../store';
import type { AppProps } from 'next/app';
import { gray } from 'utils/colors';
import { Container } from 'react-grid-system';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Component style={{ backgroundColor: gray }} {...pageProps} />
    </Container>
  );
}

export default storeWrapper.withRedux(MyApp);
