import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, Menu, Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from '../AllOrdersScreen.styles';

interface FilterMenuProps {
  statusFilter: string | null;
  onSelect: (status: string | null) => void;
}

export const FilterMenu: React.FC<FilterMenuProps> = ({ statusFilter, onSelect }) => {
  const [visible, setVisible] = useState(false);
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <TouchableOpacity style={styles.filterButton} onPress={() => setVisible(true)}>
          <MaterialIcons name="filter-list" size={20} color={colors.primary.main} />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      }
    >
      <Menu.Item onPress={() => { onSelect(null); setVisible(false); }} title="All Status" />
      <Divider />
      <Menu.Item onPress={() => { onSelect('Active'); setVisible(false); }} title="Active" />
      <Menu.Item onPress={() => { onSelect('In Transit'); setVisible(false); }} title="In Transit" />
      <Menu.Item onPress={() => { onSelect('Delivered'); setVisible(false); }} title="Delivered" />
    </Menu>
  );
};

export default FilterMenu;
