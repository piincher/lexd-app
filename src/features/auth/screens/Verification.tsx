/**
 * Verification Screen — Premium Revamp
 * Clean OTP input with countdown timer and animated feedback
 */

import React, { useEffect, useState, useRef, useCallback } from "react";
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
   Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";

import { Fonts } from "@src/constants/Fonts";
import { RootStackScreenProps } from "@src/navigations/type";
import { useAppTheme } from "@src/providers";
import { Notification } from "@src/components/Notification/Notification";
import { useVerification } from "../hooks/useVerification";
import { useLogin } from "../hooks/useLogin";

const OTP_LENGTH = 6;

const Verification = ({ route, navigation }: RootStackScreenProps<"Verification">) => {
   const { colors, isDark } = useAppTheme();
   const phoneNumber = route.params.phoneNumber;

   const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
   const [activeIndex, setActiveIndex] = useState(0);
   const [countdown, setCountdown] = useState(30);
   const [canResend, setCanResend] = useState(false);
   const [visible, setVisible] = useState(false);

   const inputRefs = useRef<(TextInput | null)[]>([]);
   const { mutate: verify, isPending } = useVerification();
   const { mutate: resendOtp } = useLogin();

   // Focus active input
   useEffect(() => {
      inputRefs.current[activeIndex]?.focus();
   }, [activeIndex]);

   // Countdown timer
   useEffect(() => {
      if (canResend) return;
      const interval = setInterval(() => {
         setCountdown((prev) => {
            if (prev <= 1) {
               setCanResend(true);
               clearInterval(interval);
               return 0;
            }
            return prev - 1;
         });
      }, 1000);
      return () => clearInterval(interval);
   }, [canResend]);

   const handleOtpChange = useCallback((value: string, index: number) => {
      if (value.length > 1) {
         // Handle paste
         const pasted = value.replace(/[^0-9]/g, "").slice(0, OTP_LENGTH);
         if (pasted.length === OTP_LENGTH) {
            const newOtp = pasted.split("");
            setOtp(newOtp);
            setActiveIndex(OTP_LENGTH - 1);
            Keyboard.dismiss();
            return;
         }
      }

      const digit = value.replace(/[^0-9]/g, "").slice(-1);
      const newOtp = [...otp];
      newOtp[index] = digit;
      setOtp(newOtp);

      if (digit && index < OTP_LENGTH - 1) {
         setActiveIndex(index + 1);
      }
   }, [otp]);

   const handleKeyPress = useCallback((key: string, index: number) => {
      if (key === "Backspace") {
         const newOtp = [...otp];
         if (!newOtp[index] && index > 0) {
            setActiveIndex(index - 1);
            newOtp[index - 1] = "";
         } else {
            newOtp[index] = "";
         }
         setOtp(newOtp);
      }
   }, [otp]);

   const handleConfirm = useCallback(() => {
      const code = otp.join("");
      if (code.length !== OTP_LENGTH) return;
      verify({ phone: phoneNumber, otp: code });
   }, [otp, phoneNumber, verify]);

   const handleResend = useCallback(() => {
      if (!canResend) return;
      setCountdown(30);
      setCanResend(false);
      setOtp(new Array(OTP_LENGTH).fill(""));
      setActiveIndex(0);
      setVisible(true);
      resendOtp(phoneNumber);
      setTimeout(() => setVisible(false), 2000);
   }, [canResend, phoneNumber, resendOtp]);

   const isComplete = otp.every((d) => d !== "");
   const maskedPhone = phoneNumber
      ? `+${phoneNumber.slice(0, 3)} ** ** ${phoneNumber.slice(-2)}`
      : "";

   const cardBg = isDark ? "rgba(255,255,255,0.06)" : "#FFFFFF";
   const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";

   return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
         <Notification
            message="Code renvoye avec succes"
            type="success"
            visible={visible}
            onDismissSnackBar={() => setVisible(false)}
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
               {/* ── Back Button ── */}
               <Animated.View entering={FadeIn.duration(300)}>
                  <Pressable
                     onPress={() => navigation.goBack()}
                     style={[styles.backBtn, { backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "#F3F4F6" }]}
                  >
                     <MaterialCommunityIcons name="arrow-left" size={22} color={colors.text.primary} />
                  </Pressable>
               </Animated.View>

               {/* ── Icon + Title ── */}
               <Animated.View entering={FadeInDown.delay(100).duration(500).springify()} style={styles.heroSection}>
                  <LinearGradient
                     colors={["rgba(34,197,94,0.12)", "rgba(34,197,94,0.04)"]}
                     style={styles.heroIconCircle}
                  >
                     <MaterialCommunityIcons name="message-lock-outline" size={36} color="#22C55E" />
                  </LinearGradient>

                  <Text style={[styles.heroTitle, { color: colors.text.primary }]}>
                     Verification
                  </Text>
                  <Text style={[styles.heroSubtitle, { color: colors.text.secondary }]}>
                     Entrez le code a 6 chiffres envoye au
                  </Text>
                  <View style={styles.phoneHighlight}>
                     <MaterialCommunityIcons name="phone-outline" size={14} color="#22C55E" />
                     <Text style={[styles.phoneText, { color: colors.text.primary }]}>
                        {maskedPhone}
                     </Text>
                  </View>
               </Animated.View>

               {/* ── OTP Input Card ── */}
               <Animated.View
                  entering={FadeInDown.delay(200).duration(500).springify()}
                  style={[styles.otpCard, { backgroundColor: cardBg, borderColor: cardBorder }]}
               >
                  <View style={styles.otpRow}>
                     {Array.from({ length: OTP_LENGTH }).map((_, index) => {
                        const isActive = index === activeIndex;
                        const isFilled = otp[index] !== "";

                        return (
                           <View
                              key={index}
                              style={[
                                 styles.otpInputWrapper,
                                 {
                                    borderColor: isActive
                                       ? "#22C55E"
                                       : isFilled
                                          ? isDark ? "rgba(34,197,94,0.4)" : "rgba(34,197,94,0.3)"
                                          : isDark ? "rgba(255,255,255,0.1)" : "#E5E7EB",
                                    backgroundColor: isActive
                                       ? isDark ? "rgba(34,197,94,0.08)" : "rgba(34,197,94,0.04)"
                                       : isDark ? "rgba(255,255,255,0.04)" : "#F9FAFB",
                                 },
                              ]}
                           >
                              <TextInput
                                 ref={(ref) => { inputRefs.current[index] = ref; }}
                                 style={[styles.otpInput, { color: colors.text.primary }]}
                                 value={otp[index]}
                                 onChangeText={(val) => handleOtpChange(val, index)}
                                 onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                                 keyboardType="number-pad"
                                 maxLength={index === 0 ? OTP_LENGTH : 1}
                                 selectTextOnFocus
                              />
                              {isActive && !isFilled && (
                                 <View style={styles.cursor} />
                              )}
                           </View>
                        );
                     })}
                  </View>

                  {/* Confirm Button */}
                  <Pressable
                     onPress={handleConfirm}
                     disabled={!isComplete || isPending}
                     style={({ pressed }) => [
                        styles.confirmBtn,
                        (!isComplete || isPending) && styles.confirmBtnDisabled,
                        pressed && isComplete && !isPending && styles.confirmBtnPressed,
                     ]}
                  >
                     <LinearGradient
                        colors={isComplete && !isPending ? ["#22C55E", "#16A34A"] : ["#9CA3AF", "#9CA3AF"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.confirmGradient}
                     >
                        {isPending ? (
                           <ActivityIndicator size="small" color="#FFF" />
                        ) : (
                           <>
                              <Text style={styles.confirmText}>Valider</Text>
                              <MaterialCommunityIcons name="check" size={20} color="#FFF" />
                           </>
                        )}
                     </LinearGradient>
                  </Pressable>

                  {/* Resend Section */}
                  <View style={styles.resendSection}>
                     <Text style={[styles.resendLabel, { color: colors.text.secondary }]}>
                        Vous n'avez pas recu le code ?
                     </Text>
                     <View style={styles.resendRow}>
                        {countdown > 0 && (
                           <View style={styles.countdownBadge}>
                              <MaterialCommunityIcons name="timer-outline" size={14} color={colors.text.secondary} />
                              <Text style={[styles.countdownText, { color: colors.text.secondary }]}>
                                 {countdown}s
                              </Text>
                           </View>
                        )}
                        <Pressable
                           onPress={handleResend}
                           disabled={!canResend}
                           style={({ pressed }) => [
                              styles.resendBtn,
                              canResend && { backgroundColor: "rgba(34,197,94,0.1)" },
                              pressed && canResend && { opacity: 0.7 },
                           ]}
                        >
                           <MaterialCommunityIcons
                              name="refresh"
                              size={16}
                              color={canResend ? "#22C55E" : colors.text.disabled}
                           />
                           <Text
                              style={[
                                 styles.resendBtnText,
                                 { color: canResend ? "#22C55E" : colors.text.disabled },
                              ]}
                           >
                              Renvoyer
                           </Text>
                        </Pressable>
                     </View>
                  </View>
               </Animated.View>

               {/* ── Footer ── */}
               <Animated.View entering={FadeIn.delay(400).duration(400)} style={styles.footer}>
                  <Text style={[styles.footerText, { color: colors.text.disabled }]}>
                     made with ❤️ by nuvotech.tech, paris-nanjing +8617865673053
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
      paddingHorizontal: 16,
   },

   /* ── Back Button ── */
   backBtn: {
      width: 42,
      height: 42,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 12,
   },

   /* ── Hero Section ── */
   heroSection: {
      alignItems: "center",
      marginTop: 24,
      paddingHorizontal: 20,
   },
   heroIconCircle: {
      width: 80,
      height: 80,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
   },
   heroTitle: {
      fontSize: 26,
      fontFamily: Fonts.bold,
      letterSpacing: -0.3,
      marginBottom: 6,
   },
   heroSubtitle: {
      fontSize: 14,
      fontFamily: Fonts.regular,
      textAlign: "center",
      lineHeight: 20,
   },
   phoneHighlight: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 8,
      backgroundColor: "rgba(34,197,94,0.08)",
      paddingHorizontal: 14,
      paddingVertical: 7,
      borderRadius: 20,
   },
   phoneText: {
      fontSize: 14,
      fontFamily: Fonts.bold,
      letterSpacing: 1,
   },

   /* ── OTP Card ── */
   otpCard: {
      borderRadius: 24,
      borderWidth: 1,
      padding: 24,
      marginTop: 28,
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
   otpRow: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 14,
   },
   otpInputWrapper: {
      width: 60,
      height: 64,
      borderRadius: 16,
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
   },
   otpInput: {
      fontSize: 24,
      fontFamily: Fonts.bold,
      textAlign: "center",
      width: "100%",
      height: "100%",
      paddingVertical: 0,
   },
   cursor: {
      position: "absolute",
      bottom: 14,
      width: 20,
      height: 2,
      backgroundColor: "#22C55E",
      borderRadius: 1,
   },

   /* ── Confirm Button ── */
   confirmBtn: {
      marginTop: 24,
      borderRadius: 16,
      overflow: "hidden",
   },
   confirmBtnDisabled: {
      opacity: 0.6,
   },
   confirmBtnPressed: {
      opacity: 0.9,
      transform: [{ scale: 0.98 }],
   },
   confirmGradient: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingVertical: 16,
   },
   confirmText: {
      fontSize: 16,
      fontFamily: Fonts.bold,
      color: "#FFF",
      letterSpacing: 0.3,
   },

   /* ── Resend ── */
   resendSection: {
      alignItems: "center",
      marginTop: 24,
   },
   resendLabel: {
      fontSize: 13,
      fontFamily: Fonts.regular,
      marginBottom: 10,
   },
   resendRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
   },
   countdownBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      backgroundColor: "rgba(0,0,0,0.04)",
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 12,
   },
   countdownText: {
      fontSize: 13,
      fontFamily: Fonts.bold,
   },
   resendBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 12,
   },
   resendBtnText: {
      fontSize: 13,
      fontFamily: Fonts.bold,
   },

   /* ── Footer ── */
   footer: {
      alignItems: "center",
      marginTop: "auto",
      paddingVertical: 24,
   },
   footerText: {
      fontSize: 11,
      fontFamily: Fonts.regular,
      textAlign: "center",
   },
});

export default Verification;
