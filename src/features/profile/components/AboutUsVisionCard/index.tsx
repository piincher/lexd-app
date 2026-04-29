import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

export const AboutUsVisionCard: React.FC = () => {
   const { colors } = useAppTheme();
   const styles = useMemo(() => makeStyles(colors), [colors]);

   return (
      <Animated.View entering={FadeInDown.delay(500).duration(600)} style={styles.card}>
         <View style={styles.cardIconRow}>
            <View style={[styles.cardIconContainer, { backgroundColor: '#3B82F620' }]}>
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
   );
};

const makeStyles = (colors: any) =>
   StyleSheet.create({
      card: {
         marginHorizontal: 20,
         marginTop: 14,
         backgroundColor: colors.background.card,
         borderRadius: 16,
         padding: 18,
         ...Theme.shadows.sm,
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
         borderRadius: 11,
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
