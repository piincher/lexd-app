import { useState, useCallback } from 'react';
import { Alert } from 'react-native';

interface UseGoodsScannerProps {
  onClientSelect: (client: { phoneNumber: string; name: string }) => void;
}

interface ScannedClient {
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
}

export const useGoodsScanner = ({ onClientSelect }: UseGoodsScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<ScannedClient | null>(null);
  const [showScanner, setShowScanner] = useState(false);

  const handleBarCodeScanned = useCallback(({ data }: { data: string }) => {
    setIsScanning(false);
    setShowScanner(false);
    
    try {
      const parsed = JSON.parse(data);
      if (parsed.phoneNumber) {
        setScannedData(parsed);
        onClientSelect({
          phoneNumber: parsed.phoneNumber,
          name: parsed.firstName && parsed.lastName 
            ? `${parsed.firstName} ${parsed.lastName}`
            : parsed.phoneNumber,
        });
      } else {
        Alert.alert('Erreur', 'QR code invalide - numéro de téléphone manquant');
      }
    } catch {
      Alert.alert('Erreur', 'QR code invalide');
    }
  }, [onClientSelect]);

  const startScanning = useCallback(() => {
    setShowScanner(true);
    setIsScanning(true);
  }, []);

  const stopScanning = useCallback(() => {
    setShowScanner(false);
    setIsScanning(false);
  }, []);

  return {
    isScanning,
    scannedData,
    showScanner,
    handleBarCodeScanned,
    startScanning,
    stopScanning,
  };
};
