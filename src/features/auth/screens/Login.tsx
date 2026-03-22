/**
 * Login Screen — Premium Revamp
 * Clean, modern phone login with country code selector
 */

import React, { useEffect, useState, useCallback } from "react";
import {
   View,
   Text,
   TextInput,
   Pressable,
   StyleSheet,
   KeyboardAvoidingView,
   Platform,
   ScrollView,
   ActivityIndicator,
   Image,
   Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";

import { IMAGES } from "@src/constants/Images";
import { Fonts } from "@src/constants/Fonts";
import { RootStackScreenProps } from "@src/navigations/type";
import { useAppTheme } from "@src/providers";
import { initMixpanel } from "@src/config/Analytic";
import { Notification } from "@src/components/Notification/Notification";
import SocialMedia from "@src/components/SocialMedia/SocialMedia";
import { useLogin, useLoginApple } from "../hooks/useLogin";
import { useSignupStore } from "../hooks/useSignInData";

const { width } = Dimensions.get("window");

const COUNTRY_CODES = [
   { code: "223", flag: "🇲🇱", country: "Mali" },
   { code: "225", flag: "🇨🇮", country: "Côte d'Ivoire" },
];

const Login = ({ navigation }: RootStackScreenProps<"Login">) => {
   const { colors, isDark } = useAppTheme();
   const [phone, setPhone] = useState("");
   const [fullPhone, setFullPhone] = useState("");
   const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
   const [showCountryPicker, setShowCountryPicker] = useState(false);
   const [visible, setVisible] = useState(false);
   const [error, setError] = useState("");

   const { mutate, isSuccess, isPending } = useLogin();
   const { mutate: appleLogin, isPending: applePending } = useLoginApple();
   const mixpanel = initMixpanel();
   const SignUpData = useSignupStore((state) => state.updateCode);

   useEffect(() => {
      SignUpData(selectedCountry.code);
   }, [selectedCountry]);

   const handleSubmit = useCallback(() => {
      setError("");
      const trimmed = phone.trim();
      if (!trimmed) {
         setError("Numero de telephone requis");
         return;
      }
      if (trimmed.length < 8) {
         setError("Le numero doit contenir 8 chiffres");
         return;
      }

      mixpanel.track("Login", { phone: trimmed });
      const full = selectedCountry.code + trimmed;

      if (full === "22376696177" || full === "22317865673") {
         appleLogin({ phone: full });
         return;
      }

      setFullPhone(full);
      mutate(full);
   }, [phone, selectedCountry, mutate, appleLogin, mixpanel]);

   useEffect(() => {
      if (isSuccess) {
         setVisible(true);
         setTimeout(() => {
            setVisible(false);
            navigation.navigate("Verification", { phoneNumber: fullPhone });
         }, 1000);
      }
   }, [isSuccess]);

   const isBusy = isPending || applePending;
   const cardBg = isDark ? "rgba(255,255,255,0.06)" : "#FFFFFF";
   const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
   const inputBg = isDark ? "rgba(255,255,255,0.06)" : "#F9FAFB";
   const inputBorder = error
      ? "#EF4444"
      : isDark
         ? "rgba(255,255,255,0.1)"
         : "#E5E7EB";

   return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
         <Notification
            message="Code de verification envoye avec succes"
            type="success"
            visible={visible}
            onDismissSnackBar={() => setVisible(false)}
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
               {/* ── Header Section ── */}
               <Animated.View entering={FadeInDown.duration(500).springify()} style={styles.headerSection}>
                  <LinearGradient
                     colors={isDark
                        ? ['#15803D', '#166534', '#14532D']
                        : ['#22C55E', '#16A34A', '#15803D']
                     }
                     start={{ x: 0, y: 0 }}
                     end={{ x: 1, y: 1 }}
                     style={styles.headerGradient}
                  >
                     {/* Decorative elements */}
                     <View style={styles.decorCircle1} />
                     <View style={styles.decorCircle2} />
                     <View style={styles.decorCircle3} />

                     <Image
                        source={IMAGES.flat_logo}
                        style={styles.logo}
                        resizeMode="contain"
                     />
                     <Text style={styles.heroTitle}>Bienvenue</Text>
                     <Text style={styles.heroSubtitle}>
                        Connectez-vous pour suivre vos envois
                     </Text>
                  </LinearGradient>
               </Animated.View>

               {/* ── Login Form Card ── */}
               <Animated.View
                  entering={FadeInDown.delay(150).duration(500).springify()}
                  style={[styles.formCard, { backgroundColor: cardBg, borderColor: cardBorder }]}
               >
                  <View style={styles.formHeader}>
                     <View style={styles.formIconCircle}>
                        <MaterialCommunityIcons name="phone-outline" size={20} color="#22C55E" />
                     </View>
                     <View>
                        <Text style={[styles.formTitle, { color: colors.text.primary }]}>
                           Numero de telephone
                        </Text>
                        <Text style={[styles.formSubtitle, { color: colors.text.secondary }]}>
                           Entrez le numero sur l'etiquette d'expedition
                        </Text>
                     </View>
                  </View>

                  {/* Country Code + Phone Input */}
                  <View style={styles.inputRow}>
                     {/* Country Code Selector */}
                     <Pressable
                        onPress={() => setShowCountryPicker(!showCountryPicker)}
                        style={[
                           styles.countryCodeBtn,
                           { backgroundColor: inputBg, borderColor: inputBorder },
                        ]}
                     >
                        <Text style={styles.countryFlag}>{selectedCountry.flag}</Text>
                        <Text style={[styles.countryCode, { color: colors.text.primary }]}>
                           +{selectedCountry.code}
                        </Text>
                        <MaterialCommunityIcons
                           name={showCountryPicker ? "chevron-up" : "chevron-down"}
                           size={16}
                           color={colors.text.secondary}
                        />
                     </Pressable>

                     {/* Phone Input */}
                     <View style={[styles.phoneInputWrapper, { backgroundColor: inputBg, borderColor: inputBorder }]}>
                        <TextInput
                           style={[styles.phoneInput, { color: colors.text.primary }]}
                           placeholder="XX XX XX XX"
                           placeholderTextColor={colors.text.disabled}
                           value={phone}
                           onChangeText={(text) => {
                              setPhone(text.replace(/[^0-9]/g, ""));
                              if (error) setError("");
                           }}
                           keyboardType="number-pad"
                           maxLength={8}
                           returnKeyType="done"
                           onSubmitEditing={handleSubmit}
                        />
                        {phone.length > 0 && (
                           <Pressable onPress={() => setPhone("")} hitSlop={8}>
                              <MaterialCommunityIcons name="close-circle" size={18} color={colors.text.disabled} />
                           </Pressable>
                        )}
                     </View>
                  </View>

                  {/* Country Picker Dropdown */}
                  {showCountryPicker && (
                     <Animated.View entering={FadeIn.duration(200)} style={[styles.countryDropdown, { backgroundColor: inputBg, borderColor: cardBorder }]}>
                        {COUNTRY_CODES.map((country) => (
                           <Pressable
                              key={country.code}
                              style={[
                                 styles.countryOption,
                                 selectedCountry.code === country.code && {
                                    backgroundColor: isDark ? "rgba(34,197,94,0.15)" : "rgba(34,197,94,0.08)",
                                 },
                              ]}
                              onPress={() => {
                                 setSelectedCountry(country);
                                 setShowCountryPicker(false);
                              }}
                           >
                              <Text style={styles.countryOptionFlag}>{country.flag}</Text>
                              <Text style={[styles.countryOptionName, { color: colors.text.primary }]}>
                                 {country.country}
                              </Text>
                              <Text style={[styles.countryOptionCode, { color: colors.text.secondary }]}>
                                 +{country.code}
                              </Text>
                              {selectedCountry.code === country.code && (
                                 <MaterialCommunityIcons name="check" size={18} color="#22C55E" />
                              )}
                           </Pressable>
                        ))}
                     </Animated.View>
                  )}

                  {/* Error Message */}
                  {error ? (
                     <View style={styles.errorRow}>
                        <MaterialCommunityIcons name="alert-circle-outline" size={14} color="#EF4444" />
                        <Text style={styles.errorText}>{error}</Text>
                     </View>
                  ) : null}

                  {/* Submit Button */}
                  <Pressable
                     onPress={handleSubmit}
                     disabled={isBusy}
                     style={({ pressed }) => [
                        styles.submitBtn,
                        isBusy && styles.submitBtnDisabled,
                        pressed && !isBusy && styles.submitBtnPressed,
                     ]}
                  >
                     <LinearGradient
                        colors={isBusy ? ["#9CA3AF", "#9CA3AF"] : ["#22C55E", "#16A34A"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.submitGradient}
                     >
                        {isBusy ? (
                           <ActivityIndicator size="small" color="#FFF" />
                        ) : (
                           <>
                              <Text style={styles.submitText}>Continuer</Text>
                              <MaterialCommunityIcons name="arrow-right" size={20} color="#FFF" />
                           </>
                        )}
                     </LinearGradient>
                  </Pressable>
               </Animated.View>

               {/* ── Security Note ── */}
               <Animated.View
                  entering={FadeInDown.delay(250).duration(400).springify()}
                  style={styles.securityNote}
               >
                  <MaterialCommunityIcons name="shield-check-outline" size={16} color={colors.text.disabled} />
                  <Text style={[styles.securityText, { color: colors.text.disabled }]}>
                     Un code de verification sera envoye par SMS
                  </Text>
               </Animated.View>

               {/* ── Footer ── */}
               <Animated.View entering={FadeIn.delay(400).duration(500)} style={styles.footer}>
                  <SocialMedia color={colors.text.disabled} _handlePressButtonAsync={() => {}} />
                  <Text style={[styles.brandText, { color: colors.primary.main }]}>
                     CHINALINK EXPRESS
                  </Text>
               </Animated.View>
            </ScrollView>
         </KeyboardAvoidingView>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   flex: {
      flex: 1,
   },
   scrollContent: {
      flexGrow: 1,
   },

   /* ── Header ── */
   headerSection: {
      overflow: "hidden",
   },
   headerGradient: {
      paddingTop: 40,
      paddingBottom: 36,
      paddingHorizontal: 24,
      alignItems: "center",
      borderBottomLeftRadius: 32,
      borderBottomRightRadius: 32,
      overflow: "hidden",
   },
   decorCircle1: {
      position: "absolute",
      top: -40,
      right: -40,
      width: 140,
      height: 140,
      borderRadius: 70,
      backgroundColor: "rgba(255,255,255,0.07)",
   },
   decorCircle2: {
      position: "absolute",
      bottom: -30,
      left: -30,
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: "rgba(255,255,255,0.05)",
   },
   decorCircle3: {
      position: "absolute",
      top: 20,
      left: 40,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: "rgba(255,255,255,0.04)",
   },
   logo: {
      width: 160,
      height: 44,
      marginBottom: 20,
      tintColor: "#FFF",
   },
   heroTitle: {
      fontSize: 28,
      fontFamily: Fonts.bold,
      color: "#FFF",
      letterSpacing: -0.5,
      marginBottom: 6,
   },
   heroSubtitle: {
      fontSize: 14,
      fontFamily: Fonts.regular,
      color: "rgba(255,255,255,0.8)",
      textAlign: "center",
   },

   /* ── Form Card ── */
   formCard: {
      marginHorizontal: 16,
      marginTop: -16,
      borderRadius: 24,
      borderWidth: 1,
      padding: 20,
      ...Platform.select({
         ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 16,
         },
         android: { elevation: 4 },
      }),
   },
   formHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 20,
   },
   formIconCircle: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: "rgba(34,197,94,0.1)",
      justifyContent: "center",
      alignItems: "center",
   },
   formTitle: {
      fontSize: 16,
      fontFamily: Fonts.bold,
   },
   formSubtitle: {
      fontSize: 12,
      fontFamily: Fonts.regular,
      marginTop: 2,
   },

   /* ── Input Row ── */
   inputRow: {
      flexDirection: "row",
      gap: 10,
   },
   countryCodeBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 12,
      height: 52,
      borderRadius: 14,
      borderWidth: 1.5,
   },
   countryFlag: {
      fontSize: 20,
   },
   countryCode: {
      fontSize: 15,
      fontFamily: Fonts.bold,
   },
   phoneInputWrapper: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      height: 52,
      borderRadius: 14,
      borderWidth: 1.5,
      paddingHorizontal: 14,
   },
   phoneInput: {
      flex: 1,
      fontSize: 18,
      fontFamily: Fonts.bold,
      letterSpacing: 2,
      paddingVertical: 0,
   },

   /* ── Country Dropdown ── */
   countryDropdown: {
      marginTop: 8,
      borderRadius: 14,
      borderWidth: 1,
      overflow: "hidden",
   },
   countryOption: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 14,
      paddingVertical: 13,
   },
   countryOptionFlag: {
      fontSize: 22,
   },
   countryOptionName: {
      flex: 1,
      fontSize: 14,
      fontFamily: Fonts.medium,
   },
   countryOptionCode: {
      fontSize: 13,
      fontFamily: Fonts.medium,
   },

   /* ── Error ── */
   errorRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 10,
   },
   errorText: {
      fontSize: 12,
      fontFamily: Fonts.medium,
      color: "#EF4444",
   },

   /* ── Submit Button ── */
   submitBtn: {
      marginTop: 20,
      borderRadius: 16,
      overflow: "hidden",
   },
   submitBtnDisabled: {
      opacity: 0.7,
   },
   submitBtnPressed: {
      opacity: 0.9,
      transform: [{ scale: 0.98 }],
   },
   submitGradient: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingVertical: 16,
   },
   submitText: {
      fontSize: 16,
      fontFamily: Fonts.bold,
      color: "#FFF",
      letterSpacing: 0.3,
   },

   /* ── Security Note ── */
   securityNote: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      marginTop: 20,
      paddingHorizontal: 20,
   },
   securityText: {
      fontSize: 12,
      fontFamily: Fonts.regular,
   },

   /* ── Footer ── */
   footer: {
      alignItems: "center",
      marginTop: 32,
      paddingBottom: 24,
   },
   brandText: {
      fontSize: 16,
      fontFamily: Fonts.bold,
      letterSpacing: 2,
      marginTop: -16,
   },
});

export default Login;
