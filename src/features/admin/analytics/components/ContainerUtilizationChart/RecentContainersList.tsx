import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ContainerUtilizationItem } from '../../types';

interface RecentContainersListProps {
  containers: ContainerUtilizationItem[];
  textPrimaryColor: string;
  textSecondaryColor: string;
  dividerColor: string;
}

export const RecentContainersList: React.FC<RecentContainersListProps> = ({
  containers,
  textPrimaryColor,
  textSecondaryColor,
  dividerColor,
}) => (
  <>
    {containers.slice(0, 5).map((container) => (
      <View
        key={container.containerId}
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: dividerColor }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <MaterialCommunityIcons name={container.shippingMode === 'AIR' ? 'airplane' : 'ferry'} size={16} color={textSecondaryColor} />
            <Text style={{ fontSize: 13, fontWeight: '600', color: textPrimaryColor }}>{container.containerNumber}</Text>
          </View>
          <Text style={{ fontSize: 11, marginTop: 2, color: textSecondaryColor }}>{container.status}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: textPrimaryColor }}>{container.utilization.cbmPercentage.toFixed(0)}%</Text>
            <Text style={{ fontSize: 10, color: textSecondaryColor }}>CBM</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: textPrimaryColor }}>{container.metrics.goodsCount}</Text>
            <Text style={{ fontSize: 10, color: textSecondaryColor }}>March.</Text>
          </View>
        </View>
      </View>
    ))}
  </>
);
