import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

interface Props {
   onCall: () => void;
   onWebsite: () => void;
}

export const AboutUsFooter: React.FC<Props> = ({ onCall, onWebsite }) => {
   const { colors } = useAppTheme();
   const styles = makeStyles(colors);

   return (
      <Animated.View entering={FadeInDown.delay(900).duration(600)} style={styles.footer}>
         <View style={styles.footerDivider} />
         <Text style={styles.footerCopyright}>
            © {new Date().getFullYear()} LEXD. Tous droits reserves.
         </Text>
         <View style={styles.footerMadeBy}>
            <Text style={styles.madeWithText}>Made with </Text>
            <Ionicons name="heart" size={12} color={colors.status.error} />
            <Text style={styles.madeWithText}> by </Text>
            <TouchableOpacity onPress={onWebsite} activeOpacity={0.7}>
               <Text style={styles.nuvoLink}>nuvotech.tech</Text>
            </TouchableOpacity>
            <Text style={styles.madeWithText}> team</Text>
         </View>
         <Text style={styles.footerLocation}>Nanjing - Paris</Text>
         <TouchableOpacity onPress={onCall} activeOpacity={0.7} style={styles.footerPhone}>
            <Ionicons name="call-outline" size={12} color={colors.text.secondary} />
            <Text style={styles.footerPhoneText}>+86 178 6567 3053</Text>
         </TouchableOpacity>
      </Animated.View>
   );
};

const makeStyles = (colors: any) =>
   StyleSheet.create({
      footer: {
         alignItems: 'center',
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
         flexDirection: 'row',
         alignItems: 'center',
         marginTop: 2,
      },
      nuvoLink: {
         fontSize: 11,
         fontFamily: Fonts.bold,
         fontWeight: '700',
         color: colors.primary.main,
         textDecorationLine: 'underline',
      },
      footerLocation: {
         fontSize: 10,
         fontFamily: Fonts.medium,
         color: colors.text.secondary,
      },
      footerPhone: {
         flexDirection: 'row',
         alignItems: 'center',
         gap: 4,
         marginTop: 2,
      },
      footerPhoneText: {
         fontSize: 10,
         fontFamily: Fonts.regular,
         color: colors.text.secondary,
      },
   });
