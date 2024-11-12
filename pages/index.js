// pages/index.js
import Link from "next/link";
import QrReader from "./components/QRreader";
import "./api/firebaseClient";
import LightingControl from "./comControl";
import { useMemo } from "react";
import dynamic from "next/dynamic";
export default function Home() {
  const Map = useMemo(
    () =>
      dynamic(() => import("./components/geomap"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return (
    <div>
      <Link href="signin">Sign in</Link>
      <Map />
    </div>
  );
}
