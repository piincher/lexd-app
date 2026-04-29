import React from "react";
import { Button } from "react-native-paper";
import { styles } from "./GoodsPdfExportButton.styles";

interface GoodsPdfExportButtonProps {
  onExport: () => void;
  disabled: boolean;
  loading: boolean;
}

export const GoodsPdfExportButton: React.FC<GoodsPdfExportButtonProps> = ({
  onExport,
  disabled,
  loading,
}) => {
  return (
    <Button
      mode="contained"
      onPress={onExport}
      disabled={disabled}
      loading={loading}
      style={styles.exportBtn}
      icon="file-pdf-box"
    >
      Générer le PDF
    </Button>
  );
};
