import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DateRangePreset, PresetOption } from './DateRangePicker.types';
import { PRESETS } from './DateRangePicker.utils';

interface PresetGridProps {
  selectedPreset: DateRangePreset;
  onSelect: (preset: DateRangePreset) => void;
  colors: any;
  styles: any;
}

export const PresetGrid: React.FC<PresetGridProps> = ({
  selectedPreset,
  onSelect,
  colors,
  styles,
}) => (
  <View style={styles.presetsContainer}>
    {PRESETS.map((preset: PresetOption) => (
      <TouchableOpacity
        key={preset.key}
        style={[
          styles.presetButton,
          selectedPreset === preset.key && styles.presetButtonActive,
        ]}
        onPress={() => onSelect(preset.key)}
      >
        <MaterialCommunityIcons
          name={preset.icon as any}
          size={20}
          color={selectedPreset === preset.key ? colors.text.inverse : colors.text.secondary}
        />
        <Text
          style={[
            styles.presetLabel,
            selectedPreset === preset.key && styles.presetLabelActive,
          ]}
        >
          {preset.label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);
