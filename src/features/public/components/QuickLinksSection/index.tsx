/**
 * QuickLinksSection - Navigation shortcuts grid
 * 
 * 4 quick action buttons for common navigation
 */

import React from 'react';
import { View, Pressable } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';

import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { styles } from './QuickLinksSection.styles';

interface QuickLinksSectionProps {
  onAboutPress: () => void;
  onContactPress: () => void;
  onFAQPress: () => void;
  onWhatsAppPress: () => void;
}

interface QuickLink {
  icon: string;
  iconFamily: 'material' | 'fontawesome';
  label: string;
  onPress: () => void;
  color?: string;
}

export const QuickLinksSection: React.FC<QuickLinksSectionProps> = ({
  onAboutPress,
  onContactPress,
  onFAQPress,
  onWhatsAppPress,
}) => {
  const links: QuickLink[] = [
    { icon: 'information', iconFamily: 'material', label: 'À Propos', onPress: onAboutPress },
    { icon: 'phone', iconFamily: 'material', label: 'Contact', onPress: onContactPress },
    { icon: 'frequently-asked-questions', iconFamily: 'material', label: 'FAQ', onPress: onFAQPress },
    { icon: 'whatsapp', iconFamily: 'fontawesome', label: 'WhatsApp', onPress: onWhatsAppPress, color: '#25D366' },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: Fonts.bold }]}>Liens Rapides</Text>
      <View style={styles.grid}>
        {links.map((link) => (
          <Pressable key={link.label} onPress={link.onPress} style={styles.item}>
            <Surface style={styles.surface}>
              {link.iconFamily === 'material' ? (
                <MaterialCommunityIcons name={link.icon as any} size={28} color={link.color || COLORS.blue} />
              ) : (
                <FontAwesome6 name={link.icon} size={28} color={link.color || COLORS.blue} />
              )}
              <Text style={[styles.label, { fontFamily: Fonts.medium }]}>{link.label}</Text>
            </Surface>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default QuickLinksSection;
