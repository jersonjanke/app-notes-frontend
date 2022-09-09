import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100;300;500;600;700&display=swap"
        />
      </Head>
      <body>
        <div id="fb-root"></div>
        <script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v14.0&appId=5542817972449076&autoLogAppEvents=1"
          nonce="5FOndvWK"
        ></script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
