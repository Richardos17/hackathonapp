import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
      <Component {...pageProps} />
  );
}
