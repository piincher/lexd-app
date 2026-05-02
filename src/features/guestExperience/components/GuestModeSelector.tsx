import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { DemoShipment, DemoShipmentMode } from '../types';

interface Props {
  shipments: DemoShipment[];
  selectedMode: DemoShipmentMode;
  onSelect: (mode: DemoShipmentMode) => void;
}

export const GuestModeSelector: React.FC<Props> = ({ shipments, selectedMode, onSelect }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.container}>
      {shipments.map((shipment) => {
        const selected = shipment.mode === selectedMode;
        return (
          <Pressable
            key={shipment.id}
            style={[styles.option, selected && styles.optionSelected]}
            onPress={() => onSelect(shipment.mode)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
          >
            <FontAwesome5
              name={shipment.mode === 'air' ? 'plane' : 'ship'}
              size={15}
              color={selected ? colors.text.inverse : colors.primary.main}
            />
            <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
              {shipment.mode === 'air' ? 'Aérien' : 'Maritime'}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors'], isDark: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginHorizontal: 20,
      marginTop: 8,
      padding: 4,
      borderRadius: 14,
      backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#F3F4F6',
      gap: 4,
    },
    option: {
      flex: 1,
      minHeight: 48,
      borderRadius: 11,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    optionSelected: {
      backgroundColor: colors.primary.main,
    },
    optionText: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 14,
    },
    optionTextSelected: {
      color: colors.text.inverse,
    },
  });
