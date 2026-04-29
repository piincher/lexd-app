import React, { useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { APP_VERSION } from '@src/features/profile/hooks/useAboutUs';

export const AboutUsHero: React.FC = () => {
   const styles = useMemo(() => makeStyles(), []);

   return (
      <Animated.View entering={FadeInUp.duration(600)} style={styles.heroSection}>
         <LinearGradient
            colors={Theme.gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroBg}
         >
            <View style={styles.logoWrapper}>
               <Image
                  source={require('../../../../../assets/images/log.png')}
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
   );
};

const makeStyles = () =>
   StyleSheet.create({
      heroSection: {
         marginBottom: 0,
      },
      heroBg: {
         alignItems: 'center',
         paddingTop: 32,
         paddingBottom: 36,
         borderBottomLeftRadius: 32,
         borderBottomRightRadius: 32,
      },
      logoWrapper: {
         width: 90,
         height: 90,
         borderRadius: 22,
         backgroundColor: 'rgba(255,255,255,0.95)',
         justifyContent: 'center',
         alignItems: 'center',
         marginBottom: 16,
         shadowColor: '#000',
         shadowOffset: { width: 0, height: 4 },
         shadowOpacity: 0.15,
         shadowRadius: 12,
         elevation: 8,
      },
      logo: {
         width: 60,
         height: 60,
         resizeMode: 'contain',
      },
      heroTitle: {
         fontSize: 24,
         fontFamily: Fonts.bold,
         fontWeight: '700',
         color: '#FFF',
         marginBottom: 4,
      },
      heroSubtitle: {
         fontSize: 13,
         fontFamily: Fonts.regular,
         color: 'rgba(255,255,255,0.8)',
         marginBottom: 12,
      },
      versionBadge: {
         backgroundColor: 'rgba(255,255,255,0.2)',
         paddingHorizontal: 12,
         paddingVertical: 4,
         borderRadius: 12,
      },
      versionText: {
         fontSize: 11,
         fontFamily: Fonts.medium,
         color: 'rgba(255,255,255,0.9)',
      },
   });
