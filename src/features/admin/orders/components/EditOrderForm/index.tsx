import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button, Text } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import AuthInputField from "@src/components/AuthInput/AuthInput";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useStyles } from "./EditOrderForm.styles";

interface Category { _id: string; name: string; }

interface EditOrderFormProps {
  shippingMode: "air" | "sea";
  onShippingModeChange: (mode: "air" | "sea") => void;
  pickerValue: string | null;
  onPickerValueChange: (value: string) => void;
  date: Date | null;
  onDatePress: () => void;
  open: boolean;
  onDismissDate: () => void;
  onConfirmDate: (params: any) => void;
  categories?: Category[];
}

export const EditOrderForm: React.FC<EditOrderFormProps> = ({
  shippingMode, onShippingModeChange, pickerValue, onPickerValueChange,
  date, onDatePress, open, onDismissDate, onConfirmDate, categories,
}) => {
  const { colors } = useAppTheme();
  const styles = useStyles();

  return (
    <View style={styles.formContainer}>
      <View style={styles.shippingModeContainer}>
        <Text>Mode d'expédition:</Text>
        <Picker selectedValue={shippingMode} onValueChange={(itemValue) => onShippingModeChange(itemValue as "air" | "sea")}>
          <Picker.Item label="Air" value="air" />
          <Picker.Item label="Sea" value="sea" />
        </Picker>
      </View>
      {shippingMode === "air" && (
        <AuthInputField label="Poids du Colis" autoCapitalize="none" containerStyle={styles.containerStyle} name="packageWeight" />
      )}
      {shippingMode === "sea" && (
        <>
          <AuthInputField label="Volume du Colis (CBM)" autoCapitalize="none" containerStyle={styles.containerStyle} name="packageCBM" />
          <AuthInputField label="Numero du conteneur" autoCapitalize="none" containerStyle={styles.containerStyle} name="contenairNumber" />
          <AuthInputField label="Prix unitaire" autoCapitalize="none" containerStyle={styles.containerStyle} name="unitPrice" keyboardType="numeric" />
          <AuthInputField label="Prix Total" autoCapitalize="none" containerStyle={styles.containerStyle} name="priceTotal" keyboardType="numeric" />
        </>
      )}
      <AuthInputField label="Nom du Client" containerStyle={styles.containerStyle} name="clientName" />
      <AuthInputField label="Numero de Telephone du Client" containerStyle={styles.containerStyle} name="clientPhone" keyboardType="numeric" maxLength={8} phone={true} />
      <AuthInputField label="nombre de colis" autoCapitalize="none" keyboardType="numeric" containerStyle={styles.containerStyle} name="quantity" />
      <View style={{ borderColor: colors.border, borderWidth: 1 }}>
        <Picker mode="dropdown" placeholder="Choisir Categorie" style={styles.pickerStyle} selectedValue={pickerValue} onValueChange={(e) => onPickerValueChange(e as string)}>
          {categories?.map((c) => (
            <Picker.Item key={c._id} label={c.name} value={c._id} />
          ))}
        </Picker>
      </View>
      <Button style={styles.dateButton} onPress={onDatePress} uppercase={false} mode="outlined">
        Choisir la date de departure
      </Button>
      <DatePickerModal locale="en" mode="single" visible={open} onDismiss={onDismissDate} date={date as any} onConfirm={onConfirmDate} saveLabel="Save" label="Select Date" animationType="slide" presentationStyle="overFullScreen" />
      <Text style={styles.dateText}>
        {date ? `Date de depart : ${date.toLocaleDateString()}` : "Pas de date de depart selectionné"}
      </Text>
    </View>
  );
};
