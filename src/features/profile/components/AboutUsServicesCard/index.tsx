import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { SERVICES } from '@src/features/profile/hooks/useAboutUs';

export const AboutUsServicesCard: React.FC = () => {
   const { colors } = useAppTheme();
   const styles = useMemo(() => makeStyles(colors), [colors]);

   return (
      <Animated.View entering={FadeInDown.delay(700).duration(600)} style={styles.card}>
         <View style={styles.cardIconRow}>
            <View style={[styles.cardIconContainer, { backgroundColor: '#F59E0B20' }]}>
               <Ionicons name="cube-outline" size={22} color="#F59E0B" />
            </View>
            <Text style={styles.cardTitle}>Nos Services</Text>
         </View>
         <View style={styles.servicesList}>
            {SERVICES.map((service, index) => (
               <View key={index} style={styles.serviceRow}>
                  <Ionicons name={service.icon} size={18} color={colors.primary.main} />
                  <Text style={styles.serviceText}>{service.text}</Text>
               </View>
            ))}
         </View>
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
      servicesList: {
         gap: 10,
      },
      serviceRow: {
         flexDirection: 'row',
         alignItems: 'center',
         gap: 10,
      },
      serviceText: {
         fontSize: 13,
         fontFamily: Fonts.medium,
         color: colors.text.primary,
      },
   });
