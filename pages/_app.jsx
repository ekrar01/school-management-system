import Header from '../components/Layout/Header';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main style={{ padding: '40px 0' }}>
        <Component {...pageProps} />
      </main>
    </>
  );
}