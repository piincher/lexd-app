/**
 * PackingListFooter Component
 * Footer with document metadata
 * SRP: Display packing list footer information
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

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
  const { colors, isDark } = useAppTheme();

  const styles = StyleSheet.create({
    footer: {
      alignItems: 'center',
      paddingVertical: 32,
    },
    footerText: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.secondary,
      marginTop: 8,
    },
    footerSubtext: {
      fontFamily: Fonts.bold,
      fontSize: 13,
      color: colors.text.primary,
      marginTop: 4,
    },
    footerRoute: {
      fontFamily: Fonts.meduim,
      fontSize: 11,
      color: colors.status.success,
      marginTop: 4,
    },
  });

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
        LEXD - Transport International
      </Text>
      <Text style={styles.footerRoute}>
        Route: Chine → Dakar (Sénégal) → Bamako (Mali)
      </Text>
    </View>
  );
};

export default PackingListFooter;
