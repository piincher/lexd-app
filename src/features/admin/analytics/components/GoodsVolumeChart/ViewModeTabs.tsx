import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { tabs, ViewMode } from './goodsVolumeConstants';
import { styles } from './GoodsVolumeChart.styles';

interface ViewModeTabsProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const ViewModeTabs: React.FC<ViewModeTabsProps> = ({
  viewMode,
  setViewMode,
}) => (
  <View style={styles.tabsContainer}>
    {tabs.map((tab) => (
      <TouchableOpacity
        key={tab.key}
        style={[
          styles.tab,
          viewMode === tab.key && { backgroundColor: '#3B82F6' },
        ]}
        onPress={() => setViewMode(tab.key)}
      >
        <MaterialCommunityIcons
          name={tab.icon as any}
          size={14}
          color={viewMode === tab.key ? '#FFFFFF' : '#6B7280'}
        />
        <Text
          style={[
            styles.tabText,
            viewMode === tab.key && { color: '#FFFFFF' },
          ]}
        >
          {tab.label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);
