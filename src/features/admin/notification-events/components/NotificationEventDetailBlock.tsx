import React from 'react';
import { Text, View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createNotificationEventDetailBlockStyles } from './NotificationEventDetailBlock.styles';

interface Row {
  label: string;
  value?: string | number | null;
}

interface NotificationEventDetailBlockProps {
  title: string;
  rows: Row[];
}

export const NotificationEventDetailBlock: React.FC<NotificationEventDetailBlockProps> = ({
  title,
  rows,
}) => {
  const { colors } = useAppTheme();
  const styles = createNotificationEventDetailBlockStyles(colors);

  return (
    <View style={styles.block}>
      <Text style={styles.title}>{title}</Text>
      {rows.map((row) => (
        <View key={row.label} style={styles.row}>
          <Text style={styles.label}>{row.label}</Text>
          <Text style={[styles.value, row.value === undefined || row.value === null ? styles.muted : null]}>
            {row.value ?? 'Non disponible'}
          </Text>
        </View>
      ))}
    </View>
  );
};
