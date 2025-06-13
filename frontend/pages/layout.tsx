import Head from 'next/head';
import '../styles/globals.css';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Mentor Link</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
