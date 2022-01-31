import '../../styles/globals.css'
import { storeWrapper } from '../store'
import type { AppProps } from 'next/app'
import { gray } from 'utils/colors'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component style={{ backgroundColor: gray }} {...pageProps} />
}

export default storeWrapper.withRedux(MyApp)
