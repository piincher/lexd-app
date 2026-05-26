import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { STATS } from '@src/features/profile/hooks/useAboutUs';

export const AboutUsStats: React.FC = () => {
   const { colors } = useAppTheme();
   const styles = makeStyles(colors);

   return (
      <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.statsRow}>
         {STATS.map((stat, index) => (
            <View key={index} style={styles.statItem}>
               <Text style={styles.statValue}>{stat.value}</Text>
               <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
         ))}
      </Animated.View>
   );
};

const makeStyles = (colors: any) =>
   StyleSheet.create({
      statsRow: {
         flexDirection: 'row',
         marginHorizontal: 20,
         marginTop: -20,
         backgroundColor: colors.background.card,
         borderRadius: 16,
         padding: 16,
         ...Theme.shadows.sm,
      },
      statItem: {
         flex: 1,
         alignItems: 'center',
      },
      statValue: {
         fontSize: 20,
         fontFamily: Fonts.bold,
         fontWeight: '700',
         color: colors.primary.main,
      },
      statLabel: {
         fontSize: 9,
         fontFamily: Fonts.regular,
         color: colors.text.secondary,
         textAlign: 'center',
         marginTop: 2,
      },
   });
