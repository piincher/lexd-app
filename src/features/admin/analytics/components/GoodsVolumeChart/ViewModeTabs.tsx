import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { tabs, ViewMode } from './goodsVolumeConstants';
import { createStyles } from './GoodsVolumeChart.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ViewModeTabsProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const ViewModeTabs: React.FC<ViewModeTabsProps> = ({
  viewMode,
  setViewMode,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  return (
  <View style={styles.tabsContainer}>
    {tabs.map((tab) => (
      <TouchableOpacity
        key={tab.key}
        style={[
          styles.tab,
          viewMode === tab.key && { backgroundColor: colors.primary.main },
        ]}
        onPress={() => setViewMode(tab.key)}
      >
        <MaterialCommunityIcons
          name={tab.icon as any}
          size={14}
          color={viewMode === tab.key ? colors.text.inverse : colors.text.secondary}
        />
        <Text
          style={[
            styles.tabText,
            viewMode === tab.key && { color: colors.text.inverse },
          ]}
        >
          {tab.label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
  );
};
