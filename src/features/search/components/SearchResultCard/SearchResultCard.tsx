import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAppTheme } from '@src/providers/ThemeProvider';
import { Badge } from '@src/shared/ui/Badge';
import { SearchResult } from '../../types';

interface SearchResultCardProps {
  result: SearchResult;
  onPress: (result: SearchResult) => void;
}

const TYPE_CONFIG: Record<SearchResult['type'], { icon: string; colorKey: string; label: string }> = {
  order: { icon: 'cube-outline', colorKey: 'primary', label: 'Commande' },
  goods: { icon: 'archive-outline', colorKey: 'success', label: 'Marchandise' },
  container: { icon: 'boat-outline', colorKey: 'info', label: 'Conteneur' },
};

export const SearchResultCard: React.FC<SearchResultCardProps> = ({ result, onPress }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const typeConfig = TYPE_CONFIG[result.type];

  const getColor = (key: string) => {
    switch (key) {
      case 'primary': return colors.primary.main;
      case 'success': return colors.status.success;
      case 'info': return colors.status.info;
      default: return colors.primary.main;
    }
  };

  const typeColor = getColor(typeConfig.colorKey);

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(result)}>
      <View style={[styles.iconContainer, { backgroundColor: typeColor + '20' }]}>
        <Ionicons name={typeConfig.icon as any} size={24} color={typeColor} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {result.title}
          </Text>
          <Badge
            label={typeConfig.label}
            variant="custom"
            backgroundColor={typeColor + '20'}
            textColor={typeColor}
          />
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {result.description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.date}>
            {new Date(result.metadata.createdAt).toLocaleDateString('fr-FR')}
          </Text>
          {result.metadata.price && (
            <Text style={styles.price}>
              {result.metadata.price.toLocaleString('fr-FR')} {result.metadata.currency}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 12,
      backgroundColor: colors.background.card,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    content: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.primary,
      flex: 1,
      marginRight: 8,
    },
    description: {
      fontSize: 14,
      color: colors.text.secondary,
      marginBottom: 8,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    date: {
      fontSize: 12,
      color: colors.text.disabled,
    },
    price: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.primary.main,
    },
  });
