import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { RADIUS } from '@src/shared/ui/designLanguage';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { APP_VERSION } from '@src/features/profile/hooks/useAboutUs';

export const AboutUsHero: React.FC = () => {
   const { colors } = useAppTheme();
   const styles = makeStyles(colors);

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
                  // Light-ink wordmark: this hero sits on the green gradient.
                  source={require('../../../../../assets/images/lexd-logo-light.png')}
                  resizeMode="contain"
                  style={styles.logo}
               />
            </View>
            <Text style={styles.heroTitle}>LEXD</Text>
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

const makeStyles = (colors: any) =>
   StyleSheet.create({
      heroSection: {
         marginBottom: 0,
      },
      heroBg: {
         alignItems: 'center',
         paddingTop: 32,
         paddingBottom: 36,
         borderBottomLeftRadius: RADIUS.sheet,
         borderBottomRightRadius: RADIUS.sheet,
      },
      logoWrapper: {
         width: 90,
         height: 90,
         borderRadius: RADIUS.card,
         backgroundColor: colors.background.paper,
         justifyContent: 'center',
         alignItems: 'center',
         marginBottom: 16,
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
         color: colors.text.inverse,
         marginBottom: 4,
      },
      heroSubtitle: {
         fontSize: 13,
         fontFamily: Fonts.regular,
         color: colors.text.inverse,
         marginBottom: 12,
      },
      versionBadge: {
         backgroundColor: colors.background.overlay,
         paddingHorizontal: 12,
         paddingVertical: 4,
         borderRadius: RADIUS.badge,
      },
      versionText: {
         fontSize: 11,
         fontFamily: Fonts.medium,
         color: colors.text.inverse,
      },
   });
