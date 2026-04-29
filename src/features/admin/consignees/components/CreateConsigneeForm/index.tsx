import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { FormErrors } from "../../hooks/useCreateConsigneeForm";
import { FormField } from "./components/FormField";
import { SubmitButton } from "./components/SubmitButton";

interface FormData {
   name: string;
   phone: string;
   email: string;
   warehouseAddress: string;
}

interface CreateConsigneeFormProps {
   formData: FormData;
   errors: FormErrors;
   isPending: boolean;
   onFieldChange: (field: keyof FormData, value: string) => void;
   onSubmit: () => void;
}

export const CreateConsigneeForm: React.FC<CreateConsigneeFormProps> = ({
   formData,
   errors,
   isPending,
   onFieldChange,
   onSubmit,
}) => {
   const { colors } = useAppTheme();

   return (
      <View style={styles.container}>
         <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
            Remplissez les informations du destinataire à Bamako
         </Text>

         <View style={styles.form}>
            <FormField
               label="Nom complet"
               required
               value={formData.name}
               onChangeText={(value) => onFieldChange("name", value)}
               placeholder="Nom et prénom du destinataire"
               error={errors.name}
               icon="account"
            />
            <FormField
               label="Téléphone"
               required
               value={formData.phone}
               onChangeText={(value) => onFieldChange("phone", value)}
               placeholder="+223 XX XX XX XX"
               error={errors.phone}
               keyboardType="phone-pad"
               icon="phone"
            />
            <FormField
               label="Email (optionnel)"
               value={formData.email}
               onChangeText={(value) => onFieldChange("email", value)}
               placeholder="email@exemple.com"
               error={errors.email}
               keyboardType="email-address"
               autoCapitalize="none"
               icon="email"
            />
            <FormField
               label="Adresse de l'entrepôt"
               required
               value={formData.warehouseAddress}
               onChangeText={(value) => onFieldChange("warehouseAddress", value)}
               placeholder="Adresse complète de l'entrepôt"
               error={errors.warehouseAddress}
               multiline
               numberOfLines={3}
               icon="map-marker"
               inputStyle={styles.textArea}
            />
         </View>

         <SubmitButton isPending={isPending} onPress={onSubmit} />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   subtitle: {
      fontSize: 14,
      marginHorizontal: 16,
      marginTop: 16,
      marginBottom: 8,
   },
   form: {
      padding: 16,
   },
   textArea: {
      height: 80,
      textAlignVertical: "top",
   },
});
