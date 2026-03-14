/**
 * PublicFooter - Landing page footer
 * 
 * Copyright, contact info, and social links
 */

import React from 'react';
import { View, Pressable, Linking } from 'react-native';
import { Text, Surface, Divider } from 'react-native-paper';
import { MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';

import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { styles } from './PublicFooter.styles';

interface PublicFooterProps {
  onAboutPress?: () => void;
  onContactPress?: () => void;
  onFAQPress?: () => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({
  onAboutPress,
  onContactPress,
  onFAQPress,
}) => {
  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/223XXXXXXXX');
  };

  return (
    <View style={styles.container}>
      <Divider style={styles.divider} />
      
      <View style={styles.linksRow}>
        <Pressable onPress={onAboutPress} style={styles.linkItem}>
          <Text style={[styles.linkText, { fontFamily: Fonts.medium }]}>À Propos</Text>
        </Pressable>
        <Pressable onPress={onContactPress} style={styles.linkItem}>
          <Text style={[styles.linkText, { fontFamily: Fonts.medium }]}>Contact</Text>
        </Pressable>
        <Pressable onPress={onFAQPress} style={styles.linkItem}>
          <Text style={[styles.linkText, { fontFamily: Fonts.medium }]}>FAQ</Text>
        </Pressable>
      </View>

      <View style={styles.socialRow}>
        <Pressable onPress={handleWhatsApp}>
          <Surface style={styles.socialButton}>
            <FontAwesome6 name="whatsapp" size={20} color="#25D366" />
          </Surface>
        </Pressable>
        <Pressable onPress={() => {}}>
          <Surface style={styles.socialButton}>
            <FontAwesome6 name="facebook" size={20} color="#1877F2" />
          </Surface>
        </Pressable>
        <Pressable onPress={() => {}}>
          <Surface style={styles.socialButton}>
            <FontAwesome6 name="instagram" size={20} color="#E4405F" />
          </Surface>
        </Pressable>
      </View>

      <Text style={[styles.copyright, { fontFamily: Fonts.regular }]}>
        © 2024 ChinaLink Express. Tous droits réservés.
      </Text>
      <Text style={[styles.contact, { fontFamily: Fonts.regular }]}>
        contact@chinalinkexpress.com | +223 XX XX XX XX
      </Text>
    </View>
  );
};

export default PublicFooter;
