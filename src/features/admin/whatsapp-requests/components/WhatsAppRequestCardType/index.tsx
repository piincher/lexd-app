import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { WhatsAppRequestType } from '../../api/whatsappRequestApi';
import { TYPE_LABELS } from '../../screens/WhatsAppRequestListScreen/constants';

interface WhatsAppRequestCardTypeProps {
  requestType: WhatsAppRequestType;
  goodsId?: string | null;
}

export const WhatsAppRequestCardType: React.FC<WhatsAppRequestCardTypeProps> = ({
  requestType,
  goodsId,
}) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.typeSection}>
      <Chip
        style={styles.typeChip}
        icon={() => <Ionicons name="document-text" size={14} color={colors.primary[600]} />}
      >
        {TYPE_LABELS[requestType]}
      </Chip>
      {goodsId && (
        <Chip style={styles.goodsChip} textStyle={{ fontSize: 11 }}>
          {goodsId}
        </Chip>
      )}
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  typeSection: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  typeChip: {
    backgroundColor: colors.primary[50],
  },
  goodsChip: {
    backgroundColor: colors.neutral[100],
  },
});
