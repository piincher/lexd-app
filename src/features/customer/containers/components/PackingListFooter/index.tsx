/**
 * PackingListFooter Component
 * Footer with document metadata
 * SRP: Display packing list footer information
 */

import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { styles } from './PackingListFooter.styles';

interface PackingListFooterProps {
  generatedAt?: string;
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return 'Non disponible';
  try {
    return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
  } catch {
    return dateString;
  }
};

export const PackingListFooter: React.FC<PackingListFooterProps> = ({
  generatedAt,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.footer}>
      <MaterialCommunityIcons
        name="seal-variant"
        size={32}
        color={theme.colors.primary}
      />
      <Text style={styles.footerText}>
        Document généré le {formatDate(generatedAt)}
      </Text>
      <Text style={styles.footerSubtext}>
        ChinaLink Express - Transport International
      </Text>
      <Text style={styles.footerRoute}>
        Route: Chine → Dakar (Sénégal) → Bamako (Mali)
      </Text>
    </View>
  );
};

export default PackingListFooter;
