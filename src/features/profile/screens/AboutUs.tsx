/**
 * AboutUs Screen
 * SRP: About page with company info, values, and contact
 */

import React, { useMemo } from "react";
import {
   Image,
   Linking,
   SafeAreaView,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@src/constants/Theme";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";

const APP_VERSION = "2.0.0";

const VALUES = [
   {
      icon: "shield-checkmark-outline" as const,
      title: "Fiabilite",
      desc: "Livraison securisee et ponctuelle de vos marchandises",
      color: "#3B82F6",
   },
   {
      icon: "heart-outline" as const,
      title: "Integrite",
      desc: "Transparence totale dans chaque etape du processus",
      color: "#EF4444",
   },
   {
      icon: "flash-outline" as const,
      title: "Efficacite",
      desc: "Solutions logistiques optimisees pour votre business",
      color: "#F59E0B",
   },
   {
      icon: "people-outline" as const,
      title: "Satisfaction",
      desc: "Votre reussite est notre priorite absolue",
      color: "#10B981",
   },
];

const STATS = [
   { value: "5+", label: "Annees d'experience" },
   { value: "3K+", label: "Clients satisfaits" },
   { value: "50K+", label: "Colis livres" },
   { value: "2", label: "Pays desservis" },
];

const AboutUs = () => {
   const { colors } = useAppTheme();

   const styles = useMemo(
      () =>
         StyleSheet.create({
            container: {
               flex: 1,
               backgroundColor: colors.background.default,
            },
            scrollContent: {
               flexGrow: 1,
               paddingBottom: 40,
            },

            // Hero
            heroSection: {
               marginBottom: 0,
            },
            heroBg: {
               alignItems: "center",
               paddingTop: 32,
               paddingBottom: 36,
               borderBottomLeftRadius: 32,
               borderBottomRightRadius: 32,
            },
            logoWrapper: {
               width: 90,
               height: 90,
               borderRadius: 22,
               backgroundColor: "rgba(255,255,255,0.95)",
               justifyContent: "center",
               alignItems: "center",
               marginBottom: 16,
               shadowColor: "#000",
               shadowOffset: { width: 0, height: 4 },
               shadowOpacity: 0.15,
               shadowRadius: 12,
               elevation: 8,
            },
            logo: {
               width: 60,
               height: 60,
               resizeMode: "contain",
            },
            heroTitle: {
               fontSize: 24,
               fontFamily: Fonts.bold,
               fontWeight: "700",
               color: "#FFF",
               marginBottom: 4,
            },
            heroSubtitle: {
               fontSize: 13,
               fontFamily: Fonts.regular,
               color: "rgba(255,255,255,0.8)",
               marginBottom: 12,
            },
            versionBadge: {
               backgroundColor: "rgba(255,255,255,0.2)",
               paddingHorizontal: 12,
               paddingVertical: 4,
               borderRadius: 12,
            },
            versionText: {
               fontSize: 11,
               fontFamily: Fonts.medium,
               color: "rgba(255,255,255,0.9)",
            },

            // Stats
            statsRow: {
               flexDirection: "row",
               marginHorizontal: 20,
               marginTop: -20,
               backgroundColor: colors.background.card,
               borderRadius: 16,
               padding: 16,
               ...Theme.shadows.sm,
            },
            statItem: {
               flex: 1,
               alignItems: "center",
            },
            statValue: {
               fontSize: 20,
               fontFamily: Fonts.bold,
               fontWeight: "700",
               color: colors.primary.main,
            },
            statLabel: {
               fontSize: 9,
               fontFamily: Fonts.regular,
               color: colors.text.secondary,
               textAlign: "center",
               marginTop: 2,
            },

            // Image
            imageCard: {
               marginHorizontal: 20,
               marginTop: 16,
               borderRadius: 16,
               overflow: "hidden",
               height: 180,
               ...Theme.shadows.sm,
            },
            warehouseImage: {
               width: "100%",
               height: "100%",
            },
            imageOverlay: {
               ...StyleSheet.absoluteFillObject,
               justifyContent: "flex-end",
               padding: 16,
            },
            imageCaption: {
               fontSize: 12,
               fontFamily: Fonts.medium,
               color: "rgba(255,255,255,0.9)",
            },

            // Cards
            card: {
               marginHorizontal: 20,
               marginTop: 14,
               backgroundColor: colors.background.card,
               borderRadius: 16,
               padding: 18,
               ...Theme.shadows.sm,
            },
            cardIconRow: {
               flexDirection: "row",
               alignItems: "center",
               gap: 10,
               marginBottom: 12,
            },
            cardIconContainer: {
               width: 38,
               height: 38,
               borderRadius: 11,
               justifyContent: "center",
               alignItems: "center",
            },
            cardTitle: {
               fontSize: 16,
               fontFamily: Fonts.bold,
               fontWeight: "700",
               color: colors.text.primary,
            },
            cardContent: {
               fontSize: 13,
               fontFamily: Fonts.regular,
               color: colors.text.secondary,
               lineHeight: 20,
            },

            // Values
            sectionTitle: {
               fontSize: 16,
               fontFamily: Fonts.bold,
               fontWeight: "700",
               color: colors.text.primary,
               marginHorizontal: 20,
               marginTop: 20,
               marginBottom: 10,
            },
            valuesGrid: {
               flexDirection: "row",
               flexWrap: "wrap",
               paddingHorizontal: 15,
               gap: 10,
            },
            valueCard: {
               flex: 1,
               minWidth: "45%",
               backgroundColor: colors.background.card,
               borderRadius: 14,
               padding: 14,
               ...Theme.shadows.sm,
            },
            valueIcon: {
               width: 38,
               height: 38,
               borderRadius: 11,
               justifyContent: "center",
               alignItems: "center",
               marginBottom: 10,
            },
            valueTitle: {
               fontSize: 13,
               fontFamily: Fonts.bold,
               fontWeight: "700",
               color: colors.text.primary,
               marginBottom: 4,
            },
            valueDesc: {
               fontSize: 10,
               fontFamily: Fonts.regular,
               color: colors.text.secondary,
               lineHeight: 15,
            },

            // Services
            servicesList: {
               gap: 10,
            },
            serviceRow: {
               flexDirection: "row",
               alignItems: "center",
               gap: 10,
            },
            serviceText: {
               fontSize: 13,
               fontFamily: Fonts.medium,
               color: colors.text.primary,
            },

            // Contact
            contactCard: {
               marginHorizontal: 20,
               marginTop: 16,
               borderRadius: 16,
               overflow: "hidden",
               ...Theme.shadows.sm,
            },
            contactGradient: {
               alignItems: "center",
               padding: 24,
               gap: 6,
            },
            contactTitle: {
               fontSize: 18,
               fontFamily: Fonts.bold,
               fontWeight: "700",
               color: "#FFF",
               marginTop: 4,
            },
            contactSubtitle: {
               fontSize: 12,
               fontFamily: Fonts.regular,
               color: "rgba(255,255,255,0.8)",
               textAlign: "center",
               marginBottom: 8,
            },
            contactButton: {
               flexDirection: "row",
               alignItems: "center",
               gap: 8,
               backgroundColor: Theme.colors.background.card,
               paddingHorizontal: 20,
               paddingVertical: 10,
               borderRadius: 24,
            },
            contactButtonText: {
               fontSize: 14,
               fontFamily: Fonts.bold,
               fontWeight: "700",
               color: Theme.primary[600],
            },

            // Footer
            footer: {
               alignItems: "center",
               marginTop: 28,
               paddingHorizontal: 20,
               gap: 6,
            },
            footerDivider: {
               width: 40,
               height: 3,
               borderRadius: 2,
               backgroundColor: colors.border,
               marginBottom: 10,
            },
            footerCopyright: {
               fontSize: 11,
               fontFamily: Fonts.medium,
               color: colors.text.secondary,
            },
            madeWithText: {
               fontSize: 11,
               fontFamily: Fonts.regular,
               color: colors.text.secondary,
            },
            footerMadeBy: {
               flexDirection: "row",
               alignItems: "center",
               marginTop: 2,
            },
            nuvoLink: {
               fontSize: 11,
               fontFamily: Fonts.bold,
               fontWeight: "700",
               color: colors.primary.main,
               textDecorationLine: "underline",
            },
            footerLocation: {
               fontSize: 10,
               fontFamily: Fonts.medium,
               color: colors.text.secondary,
            },
            footerPhone: {
               flexDirection: "row",
               alignItems: "center",
               gap: 4,
               marginTop: 2,
            },
            footerPhoneText: {
               fontSize: 10,
               fontFamily: Fonts.regular,
               color: colors.text.secondary,
            },
         }),
      [colors]
   );

   const handleCall = () => {
      Linking.openURL("tel:+8617865673053");
   };

   const handleWebsite = () => {
      Linking.openURL("https://nuvotech.tech");
   };

   return (
      <SafeAreaView style={styles.container}>
         <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
         >
            {/* Hero Section */}
            <Animated.View entering={FadeInUp.duration(600)} style={styles.heroSection}>
               <LinearGradient
                  colors={Theme.gradients.primary}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.heroBg}
               >
                  <View style={styles.logoWrapper}>
                     <Image
                        source={require("../../../../assets/images/log.png")}
                        style={styles.logo}
                     />
                  </View>
                  <Text style={styles.heroTitle}>China Link Express</Text>
                  <Text style={styles.heroSubtitle}>
                     Votre partenaire logistique Chine - Afrique
                  </Text>
                  <View style={styles.versionBadge}>
                     <Text style={styles.versionText}>v{APP_VERSION}</Text>
                  </View>
               </LinearGradient>
            </Animated.View>

            {/* Stats Row */}
            <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.statsRow}>
               {STATS.map((stat, index) => (
                  <View key={index} style={styles.statItem}>
                     <Text style={styles.statValue}>{stat.value}</Text>
                     <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
               ))}
            </Animated.View>

            {/* Warehouse Image */}
            <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.imageCard}>
               <Image
                  source={{
                     uri: "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/warehouse.jpeg",
                  }}
                  style={styles.warehouseImage}
                  resizeMode="cover"
               />
               <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.6)"]}
                  style={styles.imageOverlay}
               >
                  <Text style={styles.imageCaption}>Centre logistique - Foshan, GuangDong</Text>
               </LinearGradient>
            </Animated.View>

            {/* Mission Section */}
            <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.card}>
               <View style={styles.cardIconRow}>
                  <View style={[styles.cardIconContainer, { backgroundColor: colors.primary.main + '10' }]}>
                     <Ionicons name="rocket-outline" size={22} color={colors.primary.main} />
                  </View>
                  <Text style={styles.cardTitle}>Notre Mission</Text>
               </View>
               <Text style={styles.cardContent}>
                  Fournir des services de transport efficaces et fiables de la Chine au Mali. Nous
                  facilitons des solutions logistiques transparentes, garantissant que vos
                  marchandises soient livrees en toute securite et a temps.
               </Text>
            </Animated.View>

            {/* Vision Section */}
            <Animated.View entering={FadeInDown.delay(500).duration(600)} style={styles.card}>
               <View style={styles.cardIconRow}>
                  <View style={[styles.cardIconContainer, { backgroundColor: "#3B82F620" }]}>
                     <Ionicons name="eye-outline" size={22} color="#3B82F6" />
                  </View>
                  <Text style={styles.cardTitle}>Notre Vision</Text>
               </View>
               <Text style={styles.cardContent}>
                  Etre la principale societe de transport pour les routes Chine-Afrique, reconnue
                  pour notre service superieur et notre innovation. Nous visons a combler les
                  distances et a creer un reseau fiable.
               </Text>
            </Animated.View>

            {/* Values Grid */}
            <Animated.View entering={FadeInDown.delay(600).duration(600)}>
               <Text style={styles.sectionTitle}>Nos Valeurs</Text>
               <View style={styles.valuesGrid}>
                  {VALUES.map((val, index) => (
                     <View key={index} style={styles.valueCard}>
                        <View style={[styles.valueIcon, { backgroundColor: val.color + '20' }]}>
                           <Ionicons name={val.icon} size={22} color={val.color} />
                        </View>
                        <Text style={styles.valueTitle}>{val.title}</Text>
                        <Text style={styles.valueDesc}>{val.desc}</Text>
                     </View>
                  ))}
               </View>
            </Animated.View>

            {/* Services Section */}
            <Animated.View entering={FadeInDown.delay(700).duration(600)} style={styles.card}>
               <View style={styles.cardIconRow}>
                  <View style={[styles.cardIconContainer, { backgroundColor: "#F59E0B20" }]}>
                     <Ionicons name="cube-outline" size={22} color="#F59E0B" />
                  </View>
                  <Text style={styles.cardTitle}>Nos Services</Text>
               </View>
               <View style={styles.servicesList}>
                  {[
                     { icon: "airplane-outline", text: "Fret aerien express" },
                     { icon: "boat-outline", text: "Fret maritime economique" },
                     { icon: "business-outline", text: "Entreposage en Chine" },
                     { icon: "document-text-outline", text: "Dedouanement" },
                     { icon: "navigate-outline", text: "Suivi en temps reel" },
                     { icon: "shield-checkmark-outline", text: "Assurance marchandises" },
                  ].map((service, index) => (
                     <View key={index} style={styles.serviceRow}>
                        <Ionicons name={service.icon as any} size={18} color={colors.primary.main} />
                        <Text style={styles.serviceText}>{service.text}</Text>
                     </View>
                  ))}
               </View>
            </Animated.View>

            {/* Contact Section */}
            <Animated.View
               entering={FadeInDown.delay(800).duration(600)}
               style={styles.contactCard}
            >
               <LinearGradient
                  colors={[Theme.primary[500], Theme.primary[600]]}
                  style={styles.contactGradient}
               >
                  <Ionicons name="call-outline" size={28} color="#FFF" />
                  <Text style={styles.contactTitle}>Besoin d'aide ?</Text>
                  <Text style={styles.contactSubtitle}>
                     Notre equipe est disponible pour vous accompagner
                  </Text>
                  <TouchableOpacity
                     style={styles.contactButton}
                     onPress={handleCall}
                     activeOpacity={0.8}
                  >
                     <Ionicons name="call" size={16} color={Theme.primary[600]} />
                     <Text style={styles.contactButtonText}>+86 188 5172 5957</Text>
                  </TouchableOpacity>
               </LinearGradient>
            </Animated.View>

            {/* Footer */}
            <Animated.View entering={FadeInDown.delay(900).duration(600)} style={styles.footer}>
               <View style={styles.footerDivider} />
               <Text style={styles.footerCopyright}>
                  © {new Date().getFullYear()} China Link Express. Tous droits reserves.
               </Text>
               <View style={styles.footerMadeBy}>
                  <Text style={styles.madeWithText}>Made with </Text>
                  <Ionicons name="heart" size={12} color="#EF4444" />
                  <Text style={styles.madeWithText}> by </Text>
                  <TouchableOpacity onPress={handleWebsite} activeOpacity={0.7}>
                     <Text style={styles.nuvoLink}>nuvotech.tech</Text>
                  </TouchableOpacity>
                  <Text style={styles.madeWithText}> team</Text>
               </View>
               <Text style={styles.footerLocation}>Nanjing - Paris</Text>
               <TouchableOpacity
                  onPress={handleCall}
                  activeOpacity={0.7}
                  style={styles.footerPhone}
               >
                  <Ionicons name="call-outline" size={12} color={colors.text.secondary} />
                  <Text style={styles.footerPhoneText}>+86 178 6567 3053</Text>
               </TouchableOpacity>
            </Animated.View>
         </ScrollView>
      </SafeAreaView>
   );
};

export default AboutUs;
