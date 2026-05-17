/**
 * LoginScreen - Main login screen
 * Following SRP: Screen is a thin wrapper (< 100 lines)
 * Composition only - delegates to components and hooks
 */

import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Notification } from "@src/components/Notification/Notification";
import { Screen } from "@src/shared/ui/Screen";
import { Button } from "@src/shared/ui/Button";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { RootStackScreenProps } from "@src/app/navigation/type";

import { useLoginScreen } from "./hooks/useLoginScreen";
import { styles } from "./LoginScreen.styles";
import { LoginHeader } from "../components/LoginHeader";
import { PhoneInput } from "../components/PhoneInput";
import { CountryPicker } from "../components/CountryPicker";
import { SubmitButton } from "../components/SubmitButton";
import { SecurityNote } from "../components/SecurityNote";
import { LoginFooter } from "../components/LoginFooter";

export const LoginScreen: React.FC<RootStackScreenProps<"Login">> = () => {
  const { colors } = useAppTheme();
  const {
    phone, setPhone, selectedCountry, showCountryPicker, error, handleSubmit,
    isLoading, countries, showSuccess,
    cardBg, cardBorder,
    handleDismissSuccess,
    handleSelectCountry,
    handleCountrySelect,
    handleClearPhone,
    handleDemoPress,
    handleTermsPress,
    handlePrivacyPress,
  } = useLoginScreen();

  return (
    <Screen safeArea scrollable={false} style={[styles.container, { backgroundColor: colors.background.default }]}>
      <Notification message="Code de verification envoye avec succes" type="success" visible={showSuccess} onDismissSnackBar={handleDismissSuccess} Icon={MaterialCommunityIcons} />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <LoginHeader title="Bienvenue" subtitle="Connectez-vous pour suivre vos envois" />
          <Animated.View entering={FadeInDown.delay(150).duration(500).springify()} style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <PhoneInput value={phone} onChangeText={setPhone} selectedCountry={selectedCountry} onSelectCountry={handleSelectCountry} error={error} showCountryPicker={showCountryPicker} onClear={handleClearPhone} onSubmit={handleSubmit} />
            <CountryPicker visible={showCountryPicker} countries={countries} selectedCountry={selectedCountry} onSelect={handleCountrySelect} />
            <SubmitButton onPress={handleSubmit} isLoading={isLoading} />
            <Button title="Explorer en mode démo" onPress={handleDemoPress} variant="outline" size="large" fullWidth icon="eye-outline" style={styles.demoButton} />
            <Text style={[styles.demoNote, { color: colors.text.secondary }]}>
              Pas encore client ? Le mode démo vous montre le suivi sans créer de compte.
            </Text>
          </Animated.View>
          <SecurityNote />
          <LoginFooter onTermsPress={handleTermsPress} onPrivacyPress={handlePrivacyPress} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default LoginScreen;
