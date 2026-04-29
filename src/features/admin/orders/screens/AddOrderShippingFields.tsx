import AuthInputField from "@src/components/AuthInput/AuthInput";
import { useStyles } from "./AddOrder.styles";

interface Props {
  shippingMode: "air" | "sea";
}

export const AddOrderShippingFields: React.FC<Props> = ({ shippingMode }) => {
  const styles = useStyles();
  if (shippingMode === "air") {
    return <AuthInputField label="Poids du Colis" autoCapitalize="none" containerStyle={styles.containerStyle} name="packageWeight" />;
  }
  if (shippingMode === "sea") {
    return (
      <>
        <AuthInputField label="Numero du conteneur" autoCapitalize="none" containerStyle={styles.containerStyle} name="contenairNumber" />
        <AuthInputField label="Volume du Colis (CBM)" autoCapitalize="none" containerStyle={styles.containerStyle} name="packageCBM" />
        <AuthInputField label="Prix unitaire" autoCapitalize="none" containerStyle={styles.containerStyle} name="unitPrice" keyboardType="numeric" />
        <AuthInputField label="Prix Total" autoCapitalize="none" containerStyle={styles.containerStyle} name="priceTotal" keyboardType="numeric" />
      </>
    );
  }
  return null;
};
