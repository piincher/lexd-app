import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { GoodsStatus } from '../../types';
import { styles } from '../GoodsListScreen.styles';

interface FilterItem {
  key: GoodsStatus | 'all';
  label: string;
  icon: string;
}

interface FilterPillsProps {
  filters: FilterItem[];
  selected: GoodsStatus | 'all';
  onSelect: (key: GoodsStatus | 'all') => void;
}

export const FilterPills: React.FC<FilterPillsProps> = ({ filters, selected, onSelect }) => (
  <View style={styles.filterWrapper}>
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={filters}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.filterList}
      renderItem={({ item }) => {
        const isSelected = selected === item.key;
        return (
          <TouchableOpacity
            style={[styles.filterPill, isSelected && styles.filterPillActive]}
            onPress={() => onSelect(item.key)}
          >
            {isSelected && (
              <LinearGradient
                colors={Theme.gradients.primary}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            )}
            <Ionicons
              name={item.icon as any}
              size={16}
              color={isSelected ? '#FFF' : Theme.neutral[500]}
              style={styles.filterIcon}
            />
            <Text style={[styles.filterText, isSelected && styles.filterTextActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  </View>
);
