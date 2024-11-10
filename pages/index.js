// pages/index.js
import Link from "next/link";
import QrReader from "./components/QRreader";
import './api/firebaseClient';
import LightingControl from "./comControl";
export default function Home() {
  return (
    <div>
      <Link href="signin">Sign in</Link>
      <LightingControl/>
    
    </div>
  );
}
