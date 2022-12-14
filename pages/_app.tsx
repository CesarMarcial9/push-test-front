import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import OneSignalReact from 'react-onesignal';

function MyApp({ Component, pageProps }: AppProps) {
   
  return (
    <>
      <Head>
        <title>Push notifications testing</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
