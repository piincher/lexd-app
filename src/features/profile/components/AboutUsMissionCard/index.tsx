import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';

export const AboutUsMissionCard: React.FC = () => {
   const { colors } = useAppTheme();
   const styles = makeStyles(colors);

   return (
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
   );
};

const makeStyles = (colors: any) =>
   StyleSheet.create({
      card: {
         marginHorizontal: 20,
         marginTop: 14,
         backgroundColor: colors.background.card,
         borderRadius: RADIUS.card,
         padding: 18,
         borderWidth: HAIRLINE,
         borderColor: colors.border,
      },
      cardIconRow: {
         flexDirection: 'row',
         alignItems: 'center',
         gap: 10,
         marginBottom: 12,
      },
      cardIconContainer: {
         width: 38,
         height: 38,
         borderRadius: RADIUS.control,
         justifyContent: 'center',
         alignItems: 'center',
      },
      cardTitle: {
         fontSize: 16,
         fontFamily: Fonts.bold,
         fontWeight: '700',
         color: colors.text.primary,
      },
      cardContent: {
         fontSize: 13,
         fontFamily: Fonts.regular,
         color: colors.text.secondary,
         lineHeight: 20,
      },
   });
