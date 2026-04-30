import React, { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { AuditLog, AuditStatus } from '../types';
import { formatAuditDate } from '../utils/formatAudit';
import { createAuditLogCardStyles } from './AuditLogCard.styles';

interface AuditLogCardProps {
  item: AuditLog;
  onPress: (item: AuditLog) => void;
}

const STATUS_COLORS: Record<AuditStatus, string> = {
  SUCCESS: '#16A34A',
  FAILED: '#DC2626',
  DENIED: '#D97706',
};

export const AuditLogCard = memo(({ item, onPress }: AuditLogCardProps) => {
  const { colors } = useAppTheme();
  const styles = createAuditLogCardStyles(colors);
  const actorName = item.actor?.name || item.adminName || 'System';
  const resource = item.resource?.display || item.targetDisplay || item.resource?.type || item.targetType || 'Ressource';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Voir le journal ${item.action}`}
      onPress={() => onPress(item)}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.78 }]}
    >
      <View style={styles.topRow}>
        <Text style={styles.action} numberOfLines={1}>{item.action}</Text>
        <View style={[styles.status, { backgroundColor: STATUS_COLORS[item.status] || '#64748B' }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.description} numberOfLines={2}>
        {item.description || `${actorName} a modifié ${resource}`}
      </Text>
      <View style={styles.metaRow}>
        <Text style={styles.metaText} numberOfLines={1}>{actorName}</Text>
        <Text style={styles.metaText} numberOfLines={1}>{formatAuditDate(item.createdAt)}</Text>
      </View>
    </Pressable>
  );
});

AuditLogCard.displayName = 'AuditLogCard';
