import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import SocialMedia from '@src/shared/ui/SocialMedia';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const ProfileFooter: React.FC = () => {
  const { colors } = useAppTheme();
  const cardBorder = colors.border;

  return (
    <View style={styles.footer}>
      <SocialMedia />
      <Text style={[styles.versionText, { color: colors.text.disabled }]}>
        v{Constants.expoConfig?.version}
      </Text>
      <View style={[styles.footerDivider, { backgroundColor: cardBorder }]} />
      <Text style={[styles.madeWithLove, { color: colors.text.disabled }]}>
        Made with love by nuvotech.tech team
      </Text>
      <Text style={[styles.madeWithLoveDetail, { color: colors.text.disabled }]}>
        Nanjing - Paris | +8617865673053(whatsapp)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 32,
    paddingBottom: 24,
  },
  versionText: {
    fontSize: 12,
    marginTop: 16,
    letterSpacing: 0.5,
  },
  footerDivider: {
    width: 40,
    height: StyleSheet.hairlineWidth,
    marginVertical: 12,
  },
  madeWithLove: {
    fontSize: 11,
    textAlign: 'center',
  },
  madeWithLoveDetail: {
    fontSize: 10,
    marginTop: 3,
    textAlign: 'center',
    opacity: 0.7,
  },
});

export default ProfileFooter;
