import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';
import { VALUES } from '@src/features/profile/hooks/useAboutUs';

export const AboutUsValuesGrid: React.FC = () => {
   const { colors } = useAppTheme();
   const styles = makeStyles(colors);

   return (
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
   );
};

const makeStyles = (colors: any) =>
   StyleSheet.create({
      sectionTitle: {
         fontSize: 16,
         fontFamily: Fonts.bold,
         fontWeight: '700',
         color: colors.text.primary,
         marginHorizontal: 20,
         marginTop: 20,
         marginBottom: 10,
      },
      valuesGrid: {
         flexDirection: 'row',
         flexWrap: 'wrap',
         paddingHorizontal: 15,
         gap: 10,
      },
      valueCard: {
         flex: 1,
         minWidth: '45%',
         backgroundColor: colors.background.card,
         borderRadius: RADIUS.card,
         padding: 14,
         borderWidth: HAIRLINE,
         borderColor: colors.border,
      },
      valueIcon: {
         width: 38,
         height: 38,
         borderRadius: RADIUS.control,
         justifyContent: 'center',
         alignItems: 'center',
         marginBottom: 10,
      },
      valueTitle: {
         fontSize: 13,
         fontFamily: Fonts.bold,
         fontWeight: '700',
         color: colors.text.primary,
         marginBottom: 4,
      },
      valueDesc: {
         fontSize: 10,
         fontFamily: Fonts.regular,
         color: colors.text.secondary,
         lineHeight: 15,
      },
   });
