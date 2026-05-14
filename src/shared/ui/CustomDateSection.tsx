import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatDate } from './DateRangePicker.utils';

interface CustomDateSectionProps {
  startDate: Date;
  endDate: Date;
  onStartPress: () => void;
  onEndPress: () => void;
  colors: any;
  styles: any;
}

export const CustomDateSection: React.FC<CustomDateSectionProps> = ({
  startDate,
  endDate,
  onStartPress,
  onEndPress,
  colors,
  styles,
}) => (
  <View style={styles.customDateContainer}>
    <Text style={styles.customDateTitle}>Dates personnalisées</Text>

    <TouchableOpacity style={styles.dateField} onPress={onStartPress}>
      <MaterialCommunityIcons name="calendar-start" size={20} color={colors.text.secondary} />
      <View style={styles.dateFieldContent}>
        <Text style={styles.dateFieldLabel}>Date de début</Text>
        <Text style={styles.dateFieldValue}>{formatDate(startDate)}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color={colors.text.muted} />
    </TouchableOpacity>

    <TouchableOpacity style={styles.dateField} onPress={onEndPress}>
      <MaterialCommunityIcons name="calendar-end" size={20} color={colors.text.muted} />
      <View style={styles.dateFieldContent}>
        <Text style={styles.dateFieldLabel}>Date de fin</Text>
        <Text style={styles.dateFieldValue}>{formatDate(endDate)}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color={colors.text.muted} />
    </TouchableOpacity>
  </View>
);
