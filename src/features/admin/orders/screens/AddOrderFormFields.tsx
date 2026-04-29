import { Picker } from "@react-native-picker/picker";
import { Button, Text } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import AuthInputField from "@src/components/AuthInput/AuthInput";
import SubmitBtn from "@src/components/SubmitBtn/SubmitBtn";
import { View } from "react-native";
import { useStyles } from "./AddOrder.styles";
import { AddOrderShippingFields } from "./AddOrderShippingFields";

interface Props {
  shippingMode: "air" | "sea";
  handleShippingModeChange: (mode: "air" | "sea") => void;
  pickerValue: string | null;
  categories?: { _id: string; name: string }[];
  setPickerValue: (v: string | null) => void;
  setCategory: (v: string) => void;
  date?: Date;
  open: boolean;
  setOpen: (v: boolean) => void;
  onDismissSingle: () => void;
  onConfirmSingle: (params: { date: Date }) => void;
  isPending: boolean;
}

export const AddOrderFormFields: React.FC<Props> = ({
  shippingMode,
  handleShippingModeChange,
  pickerValue,
  categories,
  setPickerValue,
  setCategory,
  date,
  open,
  setOpen,
  onDismissSingle,
  onConfirmSingle,
  isPending,
}) => {
  const styles = useStyles();
  return (
    <View style={styles.formContainer}>
      <View style={styles.shippingModeContainer}>
        <Text>Mode d&apos;expédition:</Text>
        <Picker selectedValue={shippingMode} onValueChange={handleShippingModeChange}>
          <Picker.Item label="Air" value="air" />
          <Picker.Item label="Sea" value="sea" />
        </Picker>
      </View>
      <AddOrderShippingFields shippingMode={shippingMode} />
      <AuthInputField label="Nom du Client" containerStyle={styles.containerStyle} name="clientName" />
      <AuthInputField label="Numero de Telephone du Client" containerStyle={styles.containerStyle} name="clientPhone" keyboardType="numeric" maxLength={8} phone={true} />
      <AuthInputField label="nombre de colis" autoCapitalize="none" keyboardType="numeric" containerStyle={styles.containerStyle} name="quantity" />
      <View style={styles.categoryPickerContainer}>
        <Picker mode="dropdown" placeholder="Choisir Categorie" style={styles.pickerStyle} selectedValue={pickerValue} onValueChange={(e) => { setPickerValue(e); setCategory(e!); }}>
          {categories?.map((c) => <Picker.Item key={c._id} label={c.name} value={c._id} />)}
        </Picker>
      </View>
      <Button style={styles.dateButton} onPress={() => setOpen(true)} uppercase={false} mode="outlined">
        Choisir la date de departure
      </Button>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <DatePickerModal locale="en" mode="single" visible={open} onDismiss={onDismissSingle} date={date} onConfirm={onConfirmSingle as any} saveLabel="Save" label="Select Date" animationType="slide" presentationStyle="overFullScreen" />
      <Text style={styles.dateText}>{date ? `Date de depart : ${date.toLocaleDateString()}` : "Pas de date de depart selectionnée"}</Text>
      <SubmitBtn title="Add" busy={isPending} />
    </View>
  );
};
