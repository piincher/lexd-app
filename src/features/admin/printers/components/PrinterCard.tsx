import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { WarehousePrinter } from '@src/entities/goodsPackage';
import { styles } from './styles';

interface Props {
  printer: WarehousePrinter;
  testing: boolean;
  onTest: () => void;
  onEdit: () => void;
  onToggle: () => void;
}

export const PrinterCard: React.FC<Props> = ({ printer, testing, onTest, onEdit, onToggle }) => {
  const { colors } = useAppTheme();
  const online = printer.status === 'ONLINE';
  const statusColor = online ? colors.status.success : printer.status === 'UNKNOWN' ? colors.text.secondary : colors.status.error;

  return <View style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
    <View style={styles.cardHeader}>
      <MaterialCommunityIcons name="printer-pos" size={28} color={printer.isActive ? colors.primary.main : colors.text.disabled} />
      <View style={styles.cardTitleWrap}><Text style={[styles.name, { color: colors.text.primary }]}>{printer.name}{printer.isDefault ? ' · Par défaut' : ''}</Text><Text style={[styles.endpoint, { color: colors.text.secondary }]}>{printer.host}:{printer.port}</Text></View>
      <View style={[styles.badge, { backgroundColor: `${statusColor}18` }]}><Text style={[styles.badgeText, { color: statusColor }]}>{printer.status}</Text></View>
    </View>
    <View style={styles.metadata}><Text style={[styles.metadataText, { color: colors.text.secondary }]}>{printer.warehouseLocation}</Text><Text style={[styles.metadataText, { color: colors.text.secondary }]}>{printer.dpi} dpi</Text><Text style={[styles.metadataText, { color: colors.text.secondary }]}>{printer.labelWidthMm}×{printer.labelHeightMm} mm</Text></View>
    <View style={styles.actions}><Button compact mode="text" icon="pencil" onPress={onEdit} style={styles.action}>Modifier</Button><Button compact mode="text" icon={printer.isActive ? 'pause' : 'play'} onPress={onToggle} style={styles.action}>{printer.isActive ? 'Désactiver' : 'Activer'}</Button><Button compact mode="outlined" icon="lan-connect" loading={testing} disabled={!printer.isActive || testing} onPress={onTest} style={styles.action}>Tester</Button></View>
  </View>;
};
