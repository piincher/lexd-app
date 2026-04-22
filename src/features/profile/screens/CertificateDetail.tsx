import React, { useCallback, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { MaterialIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import type { RootStackScreenProps } from "@src/navigations/type";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getCertificateDownloadUrl } from "../api/certificateApi";

const GOLD = "#F4D03F";
const GOLD_DARK = "#d4a843";
const CARD_BG = "rgba(255,255,255,0.12)";
const CARD_BORDER = "rgba(212,168,67,0.3)";
const WHITE_60 = "rgba(255,255,255,0.6)";
const WHITE_80 = "rgba(255,255,255,0.8)";

export default function CertificateDetailScreen({
  navigation,
  route,
}: RootStackScreenProps<"CertificateDetail">) {
  const { certificateId, verificationCode, issuedAt, certificateUrl, certificateMongoId } =
    route.params;
  const [isDownloading, setIsDownloading] = useState(false);
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        safeArea: {
          flex: 1,
          backgroundColor: "#1a237e",
        },
        backButton: {
          position: "absolute",
          top: 56,
          left: 16,
          zIndex: 10,
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: "rgba(255,255,255,0.15)",
          alignItems: "center",
          justifyContent: "center",
        },
        scrollView: {
          flex: 1,
        },
        scrollContent: {
          paddingHorizontal: 20,
          paddingTop: 60,
          paddingBottom: 40,
        },
        trophyContainer: {
          alignItems: "center",
          marginBottom: 16,
        },
        trophyGlow: {
          width: 130,
          height: 130,
          borderRadius: 65,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 2,
          borderColor: CARD_BORDER,
        },
        title: {
          fontSize: 28,
          fontFamily: Fonts.bold,
          color: GOLD,
          textAlign: "center",
          marginBottom: 4,
        },
        subtitle: {
          fontSize: 16,
          fontFamily: Fonts.meduim,
          color: colors.text.inverse,
          textAlign: "center",
          marginBottom: 28,
          letterSpacing: 1,
        },
        infoCard: {
          backgroundColor: CARD_BG,
          borderRadius: 20,
          padding: 20,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: CARD_BORDER,
        },
        infoRow: {
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 12,
        },
        infoIconWrapper: {
          width: 40,
          height: 40,
          borderRadius: 12,
          backgroundColor: "rgba(212,168,67,0.12)",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 14,
        },
        infoTextWrapper: {
          flex: 1,
        },
        infoLabel: {
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: WHITE_60,
          marginBottom: 4,
        },
        infoValue: {
          fontSize: 15,
          fontFamily: Fonts.meduim,
          color: colors.text.inverse,
        },
        codeRow: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
        verificationCode: {
          fontSize: 20,
          fontFamily: Fonts.bold,
          color: GOLD,
          letterSpacing: 3,
        },
        copyButton: {
          width: 36,
          height: 36,
          borderRadius: 10,
          backgroundColor: "rgba(212,168,67,0.15)",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: CARD_BORDER,
        },
        cardDivider: {
          height: 1,
          backgroundColor: "rgba(255,255,255,0.08)",
        },
        badgeContainer: {
          flexDirection: "row",
          alignItems: "center",
          marginTop: 2,
        },
        statusBadge: {
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          paddingHorizontal: 12,
          paddingVertical: 5,
          borderRadius: 20,
        },
        statusText: {
          fontSize: 12,
          fontFamily: Fonts.bold,
          color: colors.text.inverse,
          letterSpacing: 1,
        },
        verificationCard: {
          backgroundColor: CARD_BG,
          borderRadius: 20,
          padding: 20,
          marginBottom: 24,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.1)",
        },
        verificationHeader: {
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginBottom: 16,
        },
        verificationTitle: {
          fontSize: 14,
          fontFamily: Fonts.meduim,
          color: colors.text.inverse,
          flex: 1,
        },
        urlContainer: {
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: 12,
          paddingHorizontal: 14,
          paddingVertical: 12,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.1)",
        },
        urlText: {
          flex: 1,
          fontSize: 13,
          fontFamily: Fonts.meduim,
          color: WHITE_80,
          letterSpacing: 0.3,
        },
        urlHint: {
          fontSize: 11,
          fontFamily: Fonts.regular,
          color: WHITE_60,
          textAlign: "center",
          marginTop: 10,
        },
        actionsContainer: {
          gap: 12,
          marginBottom: 24,
        },
        downloadButton: {
          borderRadius: 16,
          overflow: "hidden",
        },
        downloadButtonDisabled: {
          opacity: 0.6,
        },
        downloadGradient: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          paddingVertical: 16,
          borderRadius: 16,
        },
        downloadText: {
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: "#1a237e",
        },
        downloadTextDisabled: {
          color: WHITE_60,
        },
        shareButton: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          paddingVertical: 16,
          borderRadius: 16,
          borderWidth: 1.5,
          borderColor: CARD_BORDER,
          backgroundColor: "rgba(212,168,67,0.08)",
        },
        shareText: {
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: GOLD,
        },
        footer: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          paddingHorizontal: 20,
          marginBottom: 20,
        },
        footerText: {
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: WHITE_60,
          textAlign: "center",
          lineHeight: 18,
          flex: 1,
        },
      }),
    [colors]
  );

  const formattedDate = new Date(issuedAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const verificationUrl = `chinalinkexpress.com/verify/${verificationCode}`;

  const handleCopyCode = useCallback(async () => {
    await Clipboard.setStringAsync(verificationCode);
    Alert.alert("Copié", "Code de vérification copié dans le presse-papiers !");
  }, [verificationCode]);

  const handleCopyUrl = useCallback(async () => {
    await Clipboard.setStringAsync(verificationUrl);
    Alert.alert("Copié", "Lien de vérification copié dans le presse-papiers !");
  }, [verificationUrl]);

  const handleDownload = useCallback(async () => {
    try {
      setIsDownloading(true);
      if (certificateMongoId) {
        const url = await getCertificateDownloadUrl(certificateMongoId);
        await Linking.openURL(url);
        return;
      }
      // Fallback to direct URL if no mongo ID available
      if (certificateUrl) {
        await Linking.openURL(certificateUrl);
      }
    } catch (error) {
      // Fallback to direct URL on error
      if (certificateUrl) {
        Linking.openURL(certificateUrl);
      } else {
        Alert.alert("Erreur", "Impossible de télécharger le certificat.");
      }
    } finally {
      setIsDownloading(false);
    }
  }, [certificateMongoId, certificateUrl]);

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        message: `Je suis un expéditeur certifié ChinaLink Express ! Vérifiez mon certificat : https://${verificationUrl}`,
      });
    } catch (_error) {
      // User cancelled or share failed silently
    }
  }, [verificationUrl]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <LinearGradient
        colors={["#1a237e", "#4a148c", "#880e4f"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <MaterialIcons name="arrow-back" size={26} color={colors.text.inverse} />
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Trophy Icon with Spring Animation */}
        <MotiView
          from={{ scale: 0, opacity: 0, translateY: -30 }}
          animate={{ scale: 1, opacity: 1, translateY: 0 }}
          transition={{ type: "spring", damping: 12, stiffness: 100, delay: 100 }}
          style={styles.trophyContainer}
        >
          <LinearGradient
            colors={["rgba(244,208,63,0.25)", "rgba(212,168,67,0.1)"]}
            style={styles.trophyGlow}
          >
            <MaterialIcons name="emoji-events" size={72} color={GOLD} />
          </LinearGradient>
        </MotiView>

        {/* Title */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 120, delay: 250 }}
        >
          <Text style={styles.title}>Expéditeur Certifié</Text>
          <Text style={styles.subtitle}>ChinaLink Express</Text>
        </MotiView>

        {/* Certificate Info Card */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 100, delay: 400 }}
          style={styles.infoCard}
        >
          {/* Certificate Number */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconWrapper}>
              <MaterialIcons name="confirmation-number" size={20} color={GOLD_DARK} />
            </View>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoLabel}>Numéro de certificat</Text>
              <Text style={styles.infoValue}>{certificateId}</Text>
            </View>
          </View>

          <View style={styles.cardDivider} />

          {/* Verification Code */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconWrapper}>
              <MaterialIcons name="verified" size={20} color={GOLD_DARK} />
            </View>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoLabel}>Code de vérification</Text>
              <View style={styles.codeRow}>
                <Text style={styles.verificationCode}>{verificationCode}</Text>
                <TouchableOpacity
                  onPress={handleCopyCode}
                  activeOpacity={0.7}
                  style={styles.copyButton}
                >
                  <MaterialIcons name="content-copy" size={18} color={GOLD_DARK} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.cardDivider} />

          {/* Issue Date */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconWrapper}>
              <MaterialIcons name="calendar-today" size={20} color={GOLD_DARK} />
            </View>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoLabel}>Date de délivrance</Text>
              <Text style={styles.infoValue}>{formattedDate}</Text>
            </View>
          </View>

          <View style={styles.cardDivider} />

          {/* Status Badge */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconWrapper}>
              <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
            </View>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoLabel}>Statut</Text>
              <View style={styles.badgeContainer}>
                <LinearGradient
                  colors={["#2E7D32", "#4CAF50"]}
                  style={styles.statusBadge}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <MaterialIcons name="check" size={14} color={colors.text.inverse} />
                  <Text style={styles.statusText}>ACTIF</Text>
                </LinearGradient>
              </View>
            </View>
          </View>
        </MotiView>

        {/* QR Verification Section */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 100, delay: 550 }}
          style={styles.verificationCard}
        >
          <View style={styles.verificationHeader}>
            <MaterialIcons name="qr-code-2" size={24} color={GOLD} />
            <Text style={styles.verificationTitle}>
              Scannez pour vérifier l'authenticité
            </Text>
          </View>

          <TouchableOpacity
            style={styles.urlContainer}
            onPress={handleCopyUrl}
            activeOpacity={0.7}
          >
            <MaterialIcons name="link" size={18} color={WHITE_80} />
            <Text style={styles.urlText}>{verificationUrl}</Text>
            <MaterialIcons name="content-copy" size={16} color={WHITE_60} />
          </TouchableOpacity>

          <Text style={styles.urlHint}>
            Appuyez pour copier le lien de vérification
          </Text>
        </MotiView>

        {/* Action Buttons */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 100, delay: 700 }}
          style={styles.actionsContainer}
        >
          {/* Download Button */}
          <TouchableOpacity
            style={[
              styles.downloadButton,
              (!certificateUrl && !certificateMongoId) && styles.downloadButtonDisabled,
              isDownloading && styles.downloadButtonDisabled,
            ]}
            onPress={handleDownload}
            activeOpacity={0.7}
            disabled={(!certificateUrl && !certificateMongoId) || isDownloading}
          >
            <LinearGradient
              colors={
                (certificateUrl || certificateMongoId)
                  ? ["#d4a843", "#F4D03F"]
                  : ["rgba(212,168,67,0.3)", "rgba(244,208,63,0.3)"]
              }
              style={styles.downloadGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {isDownloading ? (
                <ActivityIndicator size="small" color="#1a237e" />
              ) : (
                <MaterialIcons
                  name="file-download"
                  size={22}
                  color={(certificateUrl || certificateMongoId) ? "#1a237e" : WHITE_60}
                />
              )}
              <Text
                style={[
                  styles.downloadText,
                  (!certificateUrl && !certificateMongoId) && styles.downloadTextDisabled,
                ]}
              >
                Télécharger le certificat
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Share Button */}
          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <MaterialIcons name="share" size={22} color={GOLD} />
            <Text style={styles.shareText}>Partager</Text>
          </TouchableOpacity>
        </MotiView>

        {/* Footer */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", duration: 600, delay: 900 }}
          style={styles.footer}
        >
          <MaterialIcons name="security" size={16} color={WHITE_60} />
          <Text style={styles.footerText}>
            Ce certificat atteste de votre statut d'expéditeur certifié
            ChinaLink Express
          </Text>
        </MotiView>
      </ScrollView>
    </SafeAreaView>
  );
}
