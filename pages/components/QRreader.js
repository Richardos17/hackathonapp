import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

const QrReader = () => {
  const [qrCode, setQrCode] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    const videoElement = videoRef.current;

    const startScanner = () => {
      codeReader
        .decodeFromVideoDevice(null, videoElement, (result, error) => {
          if (result) {
            setQrCode(result.getText());
          }
          if (error) {
          //  console.error(error);
          }
        })
        .catch((err) => console.error(err));
    };

    if (videoElement) {
      startScanner();
    }

    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <div>
      <h2>QR Code Scanner</h2>
      <video ref={videoRef} style={{ width: '50%' }} />
      {qrCode && <p>QR Code Result: {qrCode}</p>}
    </div>
  );
};

export default QrReader;
