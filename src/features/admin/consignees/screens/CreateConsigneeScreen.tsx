import React, { useState } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Text, TextInput, Button, HelperText, ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useCreateConsignee } from "../hooks";
import { COLORS } from "@src/constants/Colors";

type ConsigneeStackParamList = {
   ConsigneeList: undefined;
   CreateConsignee: undefined;
};

type NavigationProp = NativeStackNavigationProp<ConsigneeStackParamList>;

interface FormErrors {
   name?: string;
   phone?: string;
   email?: string;
   warehouseAddress?: string;
}

const CreateConsigneeScreen: React.FC = () => {
   const navigation = useNavigation<NavigationProp>();

   const [formData, setFormData] = useState({
      name: "",
      phone: "",
      email: "",
      warehouseAddress: "",
   });

   const [errors, setErrors] = useState<FormErrors>({});

   const { mutate: createConsignee, isPending } = useCreateConsignee();

   const validateForm = (): boolean => {
      const newErrors: FormErrors = {};

      if (!formData.name.trim()) {
         newErrors.name = "Le nom est requis";
      }

      if (!formData.phone.trim()) {
         newErrors.phone = "Le numéro de téléphone est requis";
      } else if (!/^\+?[\d\s-]{8,}$/.test(formData.phone.replace(/\s/g, ""))) {
         newErrors.phone = "Numéro de téléphone invalide";
      }

      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
         newErrors.email = "Email invalide";
      }

      if (!formData.warehouseAddress.trim()) {
         newErrors.warehouseAddress = "L'adresse de l'entrepôt est requise";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = () => {
      if (!validateForm()) return;

      createConsignee(formData, {
         onSuccess: () => {
            navigation.goBack();
         },
      });
   };

   const updateField = (field: keyof typeof formData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear error when user types
      if (errors[field]) {
         setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
   };

   return (
      <SafeAreaView style={styles.container}>
         <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardView}
         >
            <View style={styles.header}>
               <Ionicons
                  name="arrow-back"
                  size={24}
                  color={COLORS.DarkGrey}
                  onPress={() => navigation.goBack()}
               />
               <Text style={styles.headerTitle}>Nouveau destinataire</Text>
               <View style={{ width: 24 }} />
            </View>

            <ScrollView
               style={styles.scrollView}
               showsVerticalScrollIndicator={false}
               keyboardShouldPersistTaps="handled"
            >
               <Text style={styles.subtitle}>
                  Remplissez les informations du destinataire à Bamako
               </Text>

               <View style={styles.form}>
                  <View style={styles.inputContainer}>
                     <Text style={styles.label}>
                        Nom complet <Text style={styles.required}>*</Text>
                     </Text>
                     <TextInput
                        mode="outlined"
                        value={formData.name}
                        onChangeText={(value) => updateField("name", value)}
                        placeholder="Nom et prénom du destinataire"
                        style={styles.input}
                        error={!!errors.name}
                        outlineColor={COLORS.border}
                        activeOutlineColor={COLORS.Crimson}
                        left={<TextInput.Icon icon="account" />}
                     />
                     {errors.name && <HelperText type="error">{errors.name}</HelperText>}
                  </View>

                  <View style={styles.inputContainer}>
                     <Text style={styles.label}>
                        Téléphone <Text style={styles.required}>*</Text>
                     </Text>
                     <TextInput
                        mode="outlined"
                        value={formData.phone}
                        onChangeText={(value) => updateField("phone", value)}
                        placeholder="+223 XX XX XX XX"
                        style={styles.input}
                        error={!!errors.phone}
                        keyboardType="phone-pad"
                        outlineColor={COLORS.border}
                        activeOutlineColor={COLORS.Crimson}
                        left={<TextInput.Icon icon="phone" />}
                     />
                     {errors.phone && <HelperText type="error">{errors.phone}</HelperText>}
                  </View>

                  <View style={styles.inputContainer}>
                     <Text style={styles.label}>Email (optionnel)</Text>
                     <TextInput
                        mode="outlined"
                        value={formData.email}
                        onChangeText={(value) => updateField("email", value)}
                        placeholder="email@exemple.com"
                        style={styles.input}
                        error={!!errors.email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        outlineColor={COLORS.border}
                        activeOutlineColor={COLORS.Crimson}
                        left={<TextInput.Icon icon="email" />}
                     />
                     {errors.email && <HelperText type="error">{errors.email}</HelperText>}
                  </View>

                  <View style={styles.inputContainer}>
                     <Text style={styles.label}>
                        Adresse de l'entrepôt <Text style={styles.required}>*</Text>
                     </Text>
                     <TextInput
                        mode="outlined"
                        value={formData.warehouseAddress}
                        onChangeText={(value) => updateField("warehouseAddress", value)}
                        placeholder="Adresse complète de l'entrepôt"
                        style={[styles.input, styles.textArea]}
                        error={!!errors.warehouseAddress}
                        multiline
                        numberOfLines={3}
                        outlineColor={COLORS.border}
                        activeOutlineColor={COLORS.Crimson}
                        left={<TextInput.Icon icon="map-marker" />}
                     />
                     {errors.warehouseAddress && (
                        <HelperText type="error">{errors.warehouseAddress}</HelperText>
                     )}
                  </View>
               </View>

               <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={styles.submitButton}
                  contentStyle={styles.submitButtonContent}
                  loading={isPending}
                  disabled={isPending}
               >
                  {isPending ? "Création en cours..." : "Créer le destinataire"}
               </Button>
            </ScrollView>
         </KeyboardAvoidingView>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.lightBackground,
   },
   keyboardView: {
      flex: 1,
   },
   header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 16,
      backgroundColor: COLORS.white,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
   },
   headerTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: COLORS.DarkGrey,
   },
   scrollView: {
      flex: 1,
   },
   subtitle: {
      fontSize: 14,
      color: COLORS.DimGray,
      marginHorizontal: 16,
      marginTop: 16,
      marginBottom: 8,
   },
   form: {
      padding: 16,
   },
   inputContainer: {
      marginBottom: 16,
   },
   label: {
      fontSize: 14,
      fontWeight: "600",
      color: COLORS.DarkGrey,
      marginBottom: 8,
   },
   required: {
      color: COLORS.danger,
   },
   input: {
      backgroundColor: COLORS.white,
   },
   textArea: {
      height: 80,
      textAlignVertical: "top",
   },
   submitButton: {
      marginHorizontal: 16,
      marginBottom: 32,
      backgroundColor: COLORS.Crimson,
      borderRadius: 12,
   },
   submitButtonContent: {
      paddingVertical: 8,
   },
});

export default CreateConsigneeScreen;
