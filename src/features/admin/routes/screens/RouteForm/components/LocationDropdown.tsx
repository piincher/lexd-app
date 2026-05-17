import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Menu, HelperText } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { styles } from './LocationSelect.styles';

interface LocationDropdownProps {
  label: string;
  icon: 'location' | 'flag';
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  error?: string;
  menuVisible: boolean;
  setMenuVisible: (visible: boolean) => void;
  placeholder: string;
}

export const LocationDropdown: React.FC<LocationDropdownProps> = ({
  label,
  icon,
  value,
  options,
  onSelect,
  error,
  menuVisible,
  setMenuVisible,
  placeholder,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        {label} <Text style={styles.required}>*</Text>
      </Text>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <TouchableOpacity
            style={[
              styles.dropdownButton,
              error && styles.dropdownButtonError,
            ]}
            onPress={() => setMenuVisible(true)}
            activeOpacity={0.8}
          >
            <View style={styles.dropdownButtonContent}>
              <Ionicons
                name={icon}
                size={20}
                color={value ? Theme.primary[500] : Theme.neutral[400]}
              />
              <Text
                style={[
                  styles.dropdownButtonText,
                  !value && styles.dropdownButtonPlaceholder,
                ]}
                numberOfLines={1}
              >
                {value || placeholder}
              </Text>
            </View>
            <Ionicons
              name={menuVisible ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={Theme.neutral[400]}
            />
          </TouchableOpacity>
        }
        contentStyle={styles.menuContent}
      >
        <ScrollView style={styles.menuScroll}>
          {options.map((o) => (
            <Menu.Item
              key={o}
              onPress={() => onSelect(o)}
              title={o}
              leadingIcon={value === o ? 'check' : undefined}
              titleStyle={
                value === o ? styles.menuItemActive : undefined
              }
            />
          ))}
        </ScrollView>
      </Menu>
      {error && <HelperText type="error">{error}</HelperText>}
    </View>
  );
};
