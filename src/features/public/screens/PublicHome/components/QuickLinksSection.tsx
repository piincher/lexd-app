import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';

interface QuickLinksSectionProps {
  onAboutUs: () => void;
  onContactUs: () => void;
  onFAQ: () => void;
  onWhatsApp: () => void;
}

export const QuickLinksSection: React.FC<QuickLinksSectionProps> = ({
  onAboutUs,
  onContactUs,
  onFAQ,
  onWhatsApp,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liens Rapides</Text>
      <View style={styles.grid}>
        <Pressable onPress={onAboutUs} style={styles.item}>
          <Surface style={styles.surface}>
            <MaterialCommunityIcons name="information" size={28} color={COLORS.blue} />
            <Text style={styles.text}>À Propos</Text>
          </Surface>
        </Pressable>
        <Pressable onPress={onContactUs} style={styles.item}>
          <Surface style={styles.surface}>
            <MaterialCommunityIcons name="phone" size={28} color={COLORS.blue} />
            <Text style={styles.text}>Contact</Text>
          </Surface>
        </Pressable>
        <Pressable onPress={onFAQ} style={styles.item}>
          <Surface style={styles.surface}>
            <MaterialCommunityIcons name="frequently-asked-questions" size={28} color={COLORS.blue} />
            <Text style={styles.text}>FAQ</Text>
          </Surface>
        </Pressable>
        <Pressable onPress={onWhatsApp} style={styles.item}>
          <Surface style={styles.surface}>
            <FontAwesome6 name="whatsapp" size={28} color="#25D366" />
            <Text style={styles.text}>WhatsApp</Text>
          </Surface>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '48%',
    marginBottom: 16,
  },
  surface: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
});
