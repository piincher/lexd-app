import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import SocialMedia from '@src/components/SocialMedia/SocialMedia';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const ProfileFooter: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)';

  return (
    <View style={styles.footer}>
      <SocialMedia color={isDark ? 'rgba(255,255,255,0.5)' : colors.text.disabled} />
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
    marginTop: 32,
    paddingHorizontal: 32,
    paddingBottom: 16,
  },
  versionText: {
    fontSize: 12,
    marginTop: -20,
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
