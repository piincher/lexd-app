import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from '../screens/AllOrdersScreen.styles';

const STATUS_TABS = [
  { key: undefined, label: 'All' },
  { key: 'Pending', label: 'Pending' },
  { key: 'Active', label: 'Active' },
  { key: 'In Transit', label: 'Transit' },
  { key: 'Delivered', label: 'Delivered' },
];

interface AllOrdersStatusTabsProps {
  activeFilter: string | undefined;
  onChangeFilter: (filter: string | undefined) => void;
}

export const AllOrdersStatusTabs: React.FC<AllOrdersStatusTabsProps> = ({
  activeFilter,
  onChangeFilter,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.tabsContainer}
      contentContainerStyle={styles.tabsContent}
    >
      {STATUS_TABS.map((tab) => (
        <Button
          key={tab.label}
          mode={activeFilter === tab.key ? 'contained' : 'outlined'}
          onPress={() => onChangeFilter(tab.key)}
          style={styles.tabButton}
          buttonColor={activeFilter === tab.key ? colors.primary.main : undefined}
          textColor={activeFilter === tab.key ? colors.text.inverse : colors.text.secondary}
          compact
        >
          {tab.label}
        </Button>
      ))}
    </ScrollView>
  );
};
