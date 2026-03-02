import { Fonts } from "@src/constants/Fonts";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { MaterialIcons } from "@expo/vector-icons";

const AboutUs = () => {
   return (
      <LinearGradient colors={["#F8F9FA", "#E9ECEF"]} style={styles.container}>
         <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
               <Animated.View entering={FadeInUp.duration(800)} style={styles.logoContainer}>
                  <LinearGradient colors={["#FFFFFF", "#F1F3F5"]} style={styles.logoBackground}>
                     <Image
                        source={require("../../../../assets/images/log.png")}
                        style={styles.logo}
                     />
                  </LinearGradient>
               </Animated.View>
               <Animated.View
                  entering={FadeInDown.duration(600).delay(300)}
                  style={styles.warehouseContainer}
               >
                  <LinearGradient
                     colors={["rgba(43,45,66,0.1)", "rgba(43,45,66,0.05)"]}
                     style={styles.imageContainer}
                  >
                     <Image
                        source={{
                           uri: "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/warehouse.jpeg",
                        }}
                        style={styles.warehouseImage}
                        resizeMode="cover"
                     />
                  </LinearGradient>
                  <Text style={styles.imageCaption}>
                     Notre centre logistique à Foshan,GuangDong
                  </Text>
               </Animated.View>

               <Animated.Text entering={FadeInDown.duration(600).delay(200)} style={styles.title}>
                  À propos de China Link Express
               </Animated.Text>

               <BlurView intensity={30} style={styles.card}>
                  <Text style={styles.description}>
                     Chez China Link Express, notre mission est de fournir des services de transport
                     efficaces et fiables de la Chine au Mali. Nous nous efforçons de faciliter des
                     solutions logistiques transparentes, garantissant que vos marchandises soient
                     livrées en toute sécurité et à temps.
                  </Text>
                  <MaterialIcons
                     name="local-shipping"
                     size={40}
                     color="#2B2D42"
                     style={styles.icon}
                  />
               </BlurView>

               <Animated.View
                  entering={FadeInDown.duration(600).delay(400)}
                  style={[styles.card, styles.section]}
               >
                  <View style={styles.sectionHeader}>
                     <MaterialIcons name="visibility" size={24} color="#2B2D42" />
                     <Text style={styles.sectionTitle}>Notre Vision</Text>
                  </View>
                  <Text style={styles.sectionContent}>
                     Être la principale société de transport pour les routes Chine-Mali, reconnue
                     pour notre service supérieur et notre innovation. Nous visons à combler les
                     distances et à créer un réseau fiable.
                  </Text>
               </Animated.View>

               <Animated.View
                  entering={FadeInDown.duration(600).delay(600)}
                  style={[styles.card, styles.section]}
               >
                  <View style={styles.sectionHeader}>
                     <MaterialIcons name="star" size={24} color="#2B2D42" />
                     <Text style={styles.sectionTitle}>Nos Valeurs</Text>
                  </View>
                  <Text style={styles.sectionContent}>
                     Intégrité, fiabilité et satisfaction client. Nous maintenons les plus hauts
                     standards de service, priorisant la sécurité de vos envois et l'efficacité de
                     nos processus.
                  </Text>
               </Animated.View>

               <Animated.View entering={FadeInDown.duration(600).delay(800)} style={styles.footer}>
                  <LinearGradient
                     colors={["rgba(43,45,66,0.1)", "rgba(43,45,66,0.05)"]}
                     style={styles.footerLine}
                  />
                  <Text style={styles.footerText}>
                     © 2025 China Link Express. Tous droits réservés.
                  </Text>
               </Animated.View>
            </ScrollView>
         </SafeAreaView>
      </LinearGradient>
   );
};

export default AboutUs;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
   },
   scrollContainer: {
      flexGrow: 1,
      padding: 24,
      paddingBottom: 40,
   },
   logoContainer: {
      alignItems: "center",
      marginVertical: 30,
   },
   logoBackground: {
      padding: 20,
      borderRadius: 24,
      shadowColor: "#2B2D42",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 8,
   },
   logo: {
      width: 140,
      height: 140,
      resizeMode: "contain",
   },
   title: {
      fontSize: 26,
      color: "#2B2D42",
      textAlign: "center",
      marginBottom: 30,
      fontFamily: Fonts.bold,
      lineHeight: 34,
      letterSpacing: 0.5,
   },

   warehouseContainer: {
      marginVertical: 20,
      alignItems: "center",
   },
   imageContainer: {
      width: "100%",
      height: 200,
      borderRadius: 16,
      overflow: "hidden",
      shadowColor: "#2B2D42",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
   },
   warehouseImage: {
      width: "100%",
      height: "100%",
      opacity: 0.9,
   },
   imageCaption: {
      fontSize: 12,
      color: "#8D99AE",
      fontFamily: Fonts.italic,
      marginTop: 8,
      letterSpacing: 0.3,
   },
   card: {
      backgroundColor: "rgba(255,255,255,0.9)",
      borderRadius: 20,
      padding: 24,
      marginBottom: 24,
      shadowColor: "#2B2D42",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 6,
   },
   description: {
      fontSize: 16,
      color: "#4A4E69",
      lineHeight: 24,
      fontFamily: Fonts.regular,
      marginBottom: 20,
   },
   icon: {
      alignSelf: "center",
      marginTop: 15,
   },
   section: {
      backgroundColor: "rgba(255,255,255,0.95)",
   },
   sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
      gap: 12,
   },
   sectionTitle: {
      fontSize: 20,
      color: "#2B2D42",
      fontFamily: Fonts.semiBold,
      letterSpacing: 0.3,
   },
   sectionContent: {
      fontSize: 15,
      color: "#666666",
      lineHeight: 22,
      fontFamily: Fonts.regular,
   },
   footer: {
      marginTop: 40,
      alignItems: "center",
   },
   footerLine: {
      height: 1,
      width: "40%",
      marginBottom: 20,
   },
   footerText: {
      fontSize: 12,
      color: "#8D99AE",
      fontFamily: Fonts.medium,
      letterSpacing: 0.4,
   },
});
