import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];
import { Theme } from '@src/constants/Theme';
import { Badge } from '@src/shared/ui/Badge';
import { SearchResult } from '../../types';

interface SearchResultCardProps {
  result: SearchResult;
  onPress: (result: SearchResult) => void;
}

const TYPE_CONFIG: Record<SearchResult['type'], { icon: IoniconsName; color: string; label: string }> = {
  order: { icon: 'cube-outline', color: Theme.colors.primary.main, label: 'Commande' },
  goods: { icon: 'archive-outline', color: Theme.colors.success.main, label: 'Marchandise' },
  container: { icon: 'boat-outline', color: Theme.colors.info.main, label: 'Conteneur' },
};

export const SearchResultCard: React.FC<SearchResultCardProps> = ({ result, onPress }) => {
  const typeConfig = TYPE_CONFIG[result.type];

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(result)}>
      <View style={[styles.iconContainer, { backgroundColor: typeConfig.color + '20' }]}>
        <Ionicons name={typeConfig.icon} size={24} color={typeConfig.color} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {result.title}
          </Text>
          <Badge
            label={typeConfig.label}
            variant="custom"
            backgroundColor={typeConfig.color + '20'}
            textColor={typeConfig.color}
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.background.card,
    borderRadius: 12,
    marginBottom: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.neutral.grey200,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.neutral.grey900,
    flex: 1,
    marginRight: Theme.spacing.sm,
  },
  description: {
    fontSize: 14,
    color: Theme.neutral.grey600,
    marginBottom: Theme.spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: Theme.neutral.grey500,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.primary.main,
  },
});
