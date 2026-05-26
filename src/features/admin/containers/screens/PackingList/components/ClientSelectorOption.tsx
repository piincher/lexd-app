import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ClientGoodsGroup } from '../../../types/packingList';
import type { createStyles } from './ClientSelector.styles';

type ClientSelectorStyles = ReturnType<typeof createStyles>;

interface ClientSelectorOptionProps {
  client?: ClientGoodsGroup;
  isSelected: boolean;
  label?: string;
  meta?: string;
  onPress: () => void;
  selectedColor: string;
  defaultColor: string;
  styles: ClientSelectorStyles;
}

export const ClientSelectorOption: React.FC<ClientSelectorOptionProps> = ({
  client,
  isSelected,
  label,
  meta,
  onPress,
  selectedColor,
  defaultColor,
  styles,
}) => {
  const itemLabel = label || client?.clientName || '';
  const itemMeta = meta || getClientMeta(client);

  return (
    <TouchableOpacity
      style={[styles.clientItem, isSelected && styles.clientItemSelected]}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
    >
      <View style={styles.clientIcon}>
        <Ionicons
          name={client ? 'person-outline' : 'people-outline'}
          size={18}
          color={isSelected ? selectedColor : defaultColor}
        />
      </View>
      <View style={styles.clientInfo}>
        <Text
          style={[
            styles.clientItemText,
            isSelected && styles.clientItemTextSelected,
          ]}
          numberOfLines={1}
        >
          {itemLabel}
        </Text>
        {!!itemMeta && (
          <Text style={styles.clientMeta} numberOfLines={1}>
            {itemMeta}
          </Text>
        )}
      </View>
      {isSelected && (
        <Ionicons name="checkmark-circle" size={20} color={selectedColor} />
      )}
    </TouchableOpacity>
  );
};

const getClientMeta = (client?: ClientGoodsGroup) => {
  if (!client) return '';

  const totalArticles = client.summary.totalQuantity || client.summary.totalItems || 0;
  return `${client.goods.length} colis • ${totalArticles} articles • ${client.summary.totalCBM.toFixed(2)} m³`;
};
