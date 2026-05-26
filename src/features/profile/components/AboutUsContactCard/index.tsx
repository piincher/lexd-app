import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface Props {
   onCall: () => void;
}

export const AboutUsContactCard: React.FC<Props> = ({ onCall }) => {
   const { colors } = useAppTheme();
   const styles = makeStyles(colors);

   return (
      <Animated.View entering={FadeInDown.delay(800).duration(600)} style={styles.contactCard}>
         <LinearGradient
            colors={[colors.primary[500], colors.primary[600]]}
            style={styles.contactGradient}
         >
            <Ionicons name="call-outline" size={28} color={colors.text.inverse} />
            <Text style={styles.contactTitle}>Besoin d'aide ?</Text>
            <Text style={styles.contactSubtitle}>
               Notre equipe est disponible pour vous accompagner
            </Text>
            <TouchableOpacity
               style={styles.contactButton}
               onPress={onCall}
               activeOpacity={0.8}
            >
               <Ionicons name="call" size={16} color={colors.primary[600]} />
               <Text style={styles.contactButtonText}>+86 188 5172 5957</Text>
            </TouchableOpacity>
         </LinearGradient>
      </Animated.View>
   );
};

const makeStyles = (colors: any) =>
   StyleSheet.create({
      contactCard: {
         marginHorizontal: 20,
         marginTop: 16,
         borderRadius: 16,
         overflow: 'hidden',
         ...Theme.shadows.sm,
      },
      contactGradient: {
         alignItems: 'center',
         padding: 24,
         gap: 6,
      },
      contactTitle: {
         fontSize: 18,
         fontFamily: Fonts.bold,
         fontWeight: '700',
         color: colors.text.inverse,
         marginTop: 4,
      },
      contactSubtitle: {
         fontSize: 12,
         fontFamily: Fonts.regular,
         color: colors.text.inverse,
         textAlign: 'center',
         marginBottom: 8,
      },
      contactButton: {
         flexDirection: 'row',
         alignItems: 'center',
         gap: 8,
         backgroundColor: colors.background.card,
         paddingHorizontal: 20,
         paddingVertical: 10,
         borderRadius: 24,
      },
      contactButtonText: {
         fontSize: 14,
         fontFamily: Fonts.bold,
         fontWeight: '700',
         color: colors.primary[600],
      },
   });
