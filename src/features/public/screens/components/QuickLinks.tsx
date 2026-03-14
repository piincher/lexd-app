/**
 * QuickLinks Component
 * 
 * Quick navigation links grid section.
 */

import React from 'react';
import { View, Pressable } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';

import { COLORS } from '@src/constants/Colors';
import { styles } from '../PublicHomeScreen.styles';

interface QuickLinksProps {
  onAboutUs: () => void;
  onContactUs: () => void;
  onFAQ: () => void;
  onWhatsApp: () => void;
}

export const QuickLinks: React.FC<QuickLinksProps> = ({
  onAboutUs,
  onContactUs,
  onFAQ,
  onWhatsApp,
}) => {
  return (
    <View style={[styles.section, styles.quickLinksSection]}>
      <Text style={styles.sectionTitle}>Liens Rapides</Text>
      <View style={styles.quickLinksGrid}>
        <Pressable onPress={onAboutUs} style={styles.quickLinkItem}>
          <Surface style={styles.quickLinkSurface}>
            <MaterialCommunityIcons name="information" size={28} color={COLORS.blue} />
            <Text style={styles.quickLinkText}>À Propos</Text>
          </Surface>
        </Pressable>
        <Pressable onPress={onContactUs} style={styles.quickLinkItem}>
          <Surface style={styles.quickLinkSurface}>
            <MaterialCommunityIcons name="phone" size={28} color={COLORS.blue} />
            <Text style={styles.quickLinkText}>Contact</Text>
          </Surface>
        </Pressable>
        <Pressable onPress={onFAQ} style={styles.quickLinkItem}>
          <Surface style={styles.quickLinkSurface}>
            <MaterialCommunityIcons name="frequently-asked-questions" size={28} color={COLORS.blue} />
            <Text style={styles.quickLinkText}>FAQ</Text>
          </Surface>
        </Pressable>
        <Pressable onPress={onWhatsApp} style={styles.quickLinkItem}>
          <Surface style={styles.quickLinkSurface}>
            <FontAwesome6 name="whatsapp" size={28} color="#25D366" />
            <Text style={styles.quickLinkText}>WhatsApp</Text>
          </Surface>
        </Pressable>
      </View>
    </View>
  );
};
