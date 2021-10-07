import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

function ScanPage() {

    const [scanResult, setScanResult] = useState(undefined);

    const startScan = async () => {
        const permission = await BarcodeScanner.checkPermission({ force: true });
        if (! permission) return;

        BarcodeScanner.hideBackground(); 

        const result = await BarcodeScanner.startScan(); 
        if (result.hasContent) {
            setScanResult(result.content);
        }
    };

    useEffect(() => {
        startScan();

        return () => {
            BarcodeScanner.showBackground();
            BarcodeScanner.stopScan();
        };
    }, []);

    if (scanResult && scanResult.indexOf(process.env.REACT_APP_URL) >= 0) {
        BarcodeScanner.showBackground();
        BarcodeScanner.stopScan();

        return <Redirect to={ scanResult.replace(process.env.REACT_APP_URL, '') } />
    }

    return <div />;
}

export default ScanPage;