import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
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
  return (
    <View style={styles.typeSection}>
      <Chip
        style={styles.typeChip}
        icon={() => <Ionicons name="document-text" size={14} color={Theme.primary[600]} />}
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

const styles = StyleSheet.create({
  typeSection: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  typeChip: {
    backgroundColor: Theme.primary[50],
  },
  goodsChip: {
    backgroundColor: Theme.neutral[100],
  },
});
