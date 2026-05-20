import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './RedemptionEmptyState.styles';

interface RedemptionEmptyStateProps {
  title?: string;
  subtitle?: string;
  icon?: string;
}

export const RedemptionEmptyState: React.FC<RedemptionEmptyStateProps> = ({
  title = 'Aucune demande',
  subtitle = 'Vos demandes de points apparaîtront ici.',
  icon = 'ticket-percent-outline',
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: colors.primary.main + '12' }]}>
        <MaterialCommunityIcons name={icon as any} size={36} color={colors.primary.main} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};
