import React, { useCallback } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Platform,
  AccessibilityProps,
} from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { MotiView } from 'moti';
import * as Haptics from 'expo-haptics';
import { useAppTheme } from '@src/providers/ThemeProvider';

// ============================================
// Brand Configuration
// ============================================
interface SocialBrand {
  name: string;
  icon: string;
  iconFamily: 'antdesign' | 'fontawesome5';
  url: string;
  color: string;
  darkColor: string;
  bgOpacity: number;
}

const BRANDS: SocialBrand[] = [
  {
    name: 'Instagram',
    icon: 'instagram',
    iconFamily: 'antdesign',
    url: 'https://www.instagram.com/lexd',
    color: '#E4405F',
    darkColor: '#F77787',
    bgOpacity: 0.12,
  },
  {
    name: 'Facebook',
    icon: 'facebook-f',
    iconFamily: 'fontawesome5',
    url: 'https://www.facebook.com/profile.php?id=61556519083512',
    color: '#1877F2',
    darkColor: '#4C9AFF',
    bgOpacity: 0.12,
  },
  {
    name: 'WhatsApp',
    icon: 'whatsapp',
    iconFamily: 'fontawesome5',
    url: 'https://wa.me/8618851725957',
    color: '#25D366',
    darkColor: '#3D9E80',
    bgOpacity: 0.12,
  },
  {
    name: 'TikTok',
    icon: 'tiktok',
    iconFamily: 'fontawesome5',
    url: 'https://www.tiktok.com/@lexdservices.com4',
    color: '#FF0050',
    darkColor: '#FF4D84',
    bgOpacity: 0.12,
  },
];

// ============================================
// Social Icon Button
// ============================================
interface SocialIconButtonProps {
  brand: SocialBrand;
  index: number;
  isDark: boolean;
}

const SocialIconButton: React.FC<SocialIconButtonProps> = React.memo(
  ({ brand, index, isDark }) => {
    const brandColor = isDark ? brand.darkColor : brand.color;
    const bgColor = `${brand.color}${Math.round(brand.bgOpacity * 255)
      .toString(16)
      .padStart(2, '0')}`;

    const handlePress = useCallback(async () => {
      if (Platform.OS !== 'web') {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      await WebBrowser.openBrowserAsync(brand.url);
    }, [brand.url]);

    const accessibilityProps: AccessibilityProps = {
      accessibilityLabel: `Ouvrir ${brand.name}`,
      accessibilityRole: 'button',
      accessibilityHint: `Ouvre la page ${brand.name} dans le navigateur`,
    };

    const IconComponent =
      brand.iconFamily === 'antdesign' ? AntDesign : FontAwesome5;

    return (
      <MotiView
        from={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 200,
          delay: index * 80 + 100,
        }}
      >
        <Pressable
          onPress={handlePress}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: bgColor },
            pressed && styles.buttonPressed,
          ]}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          {...accessibilityProps}
        >
          <IconComponent
            name={brand.icon}
            size={22}
            color={brandColor}
            style={styles.icon}
          />
        </Pressable>
      </MotiView>
    );
  }
);

SocialIconButton.displayName = 'SocialIconButton';

// ============================================
// Main Component
// ============================================
interface SocialMediaProps {
  color?: string; // kept for API compatibility, unused
}

const SocialMedia: React.FC<SocialMediaProps> = () => {
  const { isDark } = useAppTheme();

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 18, stiffness: 150 }}
      style={styles.container}
    >
      <View style={styles.row}>
        {BRANDS.map((brand, index) => (
          <SocialIconButton
            key={brand.name}
            brand={brand}
            index={index}
            isDark={isDark}
          />
        ))}
      </View>
    </MotiView>
  );
};

// ============================================
// Styles
// ============================================
const BUTTON_SIZE = 48;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    // Subtle border for definition on any background
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(128, 128, 128, 0.15)',
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.92 }],
  },
  icon: {
    // Ensure icons are perfectly centered
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default SocialMedia;
