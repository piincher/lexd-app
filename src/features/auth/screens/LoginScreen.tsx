/**
 * LoginScreen — Main login screen
 * Hallmark · macrostructure: Letter · tone: warm-utilitarian · designed-as-app
 *
 * Composition: thin wrapper delegating to focused sub-components.
 * Visual rhythm: centered brand mark → unified phone field → solid CTA →
 * subtle divider → demo link → trust signal → terms footer.
 */

import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  Pressable,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Notification } from "@src/components/Notification/Notification";
import { Screen } from "@src/shared/ui/Screen";
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
    phone,
    setPhone,
    selectedCountry,
    showCountryPicker,
    error,
    handleSubmit,
    isLoading,
    countries,
    showSuccess,
    handleDismissSuccess,
    handleSelectCountry,
    handleCountrySelect,
    handleClearPhone,
    handleDemoPress,
    handleTermsPress,
    handlePrivacyPress,
  } = useLoginScreen();

  return (
    <Screen
      safeArea
      scrollable={false}
      style={[styles.container, { backgroundColor: colors.background.default }]}
    >
      <Notification
        message="Code de verification envoye avec succes"
        type="success"
        visible={showSuccess}
        onDismissSnackBar={handleDismissSuccess}
        Icon={MaterialCommunityIcons}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <LoginHeader
            title="Bienvenue"
            subtitle="Connectez-vous pour suivre vos envois"
          />

          <Animated.View
            entering={FadeInUp.delay(150).duration(500).springify()}
            style={styles.form}
          >
            <PhoneInput
              value={phone}
              onChangeText={setPhone}
              selectedCountry={selectedCountry}
              onSelectCountry={handleSelectCountry}
              error={error}
              showCountryPicker={showCountryPicker}
              onClear={handleClearPhone}
              onSubmit={handleSubmit}
            />

            <CountryPicker
              visible={showCountryPicker}
              countries={countries}
              selectedCountry={selectedCountry}
              onSelect={handleCountrySelect}
            />

            <SubmitButton onPress={handleSubmit} isLoading={isLoading} />

            {/* Divider */}
            <View style={styles.divider}>
              <View
                style={[styles.dividerLine, { backgroundColor: colors.border }]}
              />
              <Text
                style={[styles.dividerText, { color: colors.text.disabled }]}
              >
                ou
              </Text>
              <View
                style={[styles.dividerLine, { backgroundColor: colors.border }]}
              />
            </View>

            {/* Demo link */}
            <Pressable
              onPress={handleDemoPress}
              style={styles.demoLink}
              hitSlop={{ top: 8, bottom: 8, left: 16, right: 16 }}
            >
              <Text
                style={[
                  styles.demoLinkText,
                  { color: colors.text.secondary },
                ]}
              >
                Pas encore client ?{" "}
                <Text style={{ color: colors.primary.main }}>
                  Explorer sans compte
                </Text>
              </Text>
            </Pressable>
          </Animated.View>

          <SecurityNote />
          <LoginFooter
            onTermsPress={handleTermsPress}
            onPrivacyPress={handlePrivacyPress}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default LoginScreen;
