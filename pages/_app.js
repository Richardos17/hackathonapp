import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./api/auth/authContext";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
