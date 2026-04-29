import React from 'react';
import { Searchbar } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from '../screens/AllOrdersScreen.styles';

interface AllOrdersSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const AllOrdersSearchBar: React.FC<AllOrdersSearchBarProps> = ({
  value,
  onChangeText,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <Searchbar
      placeholder="Search orders..."
      onChangeText={onChangeText}
      value={value}
      style={styles.searchBar}
      inputStyle={styles.searchInput}
      iconColor={colors.primary.main}
    />
  );
};
