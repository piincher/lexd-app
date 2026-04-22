/**
 * LoginScreen - Main login screen
 * Following SRP: Screen is a thin wrapper (< 100 lines)
 * Composition only - delegates to components and hooks
 */

import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Linking, Platform, ScrollView, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { Notification } from "@src/components/Notification/Notification";
import { Screen } from "@src/shared/ui/Screen";
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { RootStackScreenProps } from "@src/navigations/type";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useLoginForm } from "../hooks/useLoginForm";
import { LoginHeader } from "../components/LoginHeader";
import { PhoneInput } from "../components/PhoneInput";
import { CountryPicker } from "../components/CountryPicker";
import { SubmitButton } from "../components/SubmitButton";
import { SecurityNote } from "../components/SecurityNote";
import { LoginFooter } from "../components/LoginFooter";

export const LoginScreen: React.FC<RootStackScreenProps<"Login">> = ({ navigation }) => {
  const { colors, isDark } = useAppTheme();
  const [showSuccess, setShowSuccess] = useState(false);
  const { phone, setPhone, selectedCountry, setSelectedCountry, showCountryPicker, setShowCountryPicker, error, handleSubmit, isLoading, isSuccess, fullPhone, countries } = useLoginForm();

  useEffect(() => {
    if (isSuccess && fullPhone) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        navigation.navigate("Verification", { phoneNumber: fullPhone });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, fullPhone, navigation]);

  const cardBg = isDark ? "rgba(255,255,255,0.06)" : "#FFFFFF";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";

  return (
    <Screen safeArea scrollable={false} style={[styles.container, { backgroundColor: colors.background.default }]}>
      <Notification message="Code de verification envoye avec succes" type="success" visible={showSuccess} onDismissSnackBar={() => setShowSuccess(false)} Icon={MaterialCommunityIcons} />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <LoginHeader title="Bienvenue" subtitle="Connectez-vous pour suivre vos envois" />
          <Animated.View entering={FadeInDown.delay(150).duration(500).springify()} style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <PhoneInput value={phone} onChangeText={setPhone} selectedCountry={selectedCountry} onSelectCountry={() => setShowCountryPicker(true)} error={error} showCountryPicker={showCountryPicker} onClear={() => setPhone("")} onSubmit={handleSubmit} />
            <CountryPicker visible={showCountryPicker} countries={countries} selectedCountry={selectedCountry} onSelect={(c) => { setSelectedCountry(c); setShowCountryPicker(false); }} />
            <SubmitButton onPress={handleSubmit} isLoading={isLoading} />
          </Animated.View>
          <SecurityNote />
          <LoginFooter
            onTermsPress={() => Linking.openURL("https://www.chinalinkexpress.com/fr/terms")}
            onPrivacyPress={() => Linking.openURL("https://www.chinalinkexpress.com/fr/privacy")}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  card: { marginHorizontal: 16, marginTop: -16, borderRadius: 24, borderWidth: 1, padding: 20 },
});

export default LoginScreen;
