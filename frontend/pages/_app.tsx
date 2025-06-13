import type { AppProps } from 'next/app';
import '../styles/globals.css'; // your global Tailwind or custom CSS

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* You can also wrap providers here like Redux, Auth, Theme, etc. */}
      <Component {...pageProps} />
    </>
  );
}
