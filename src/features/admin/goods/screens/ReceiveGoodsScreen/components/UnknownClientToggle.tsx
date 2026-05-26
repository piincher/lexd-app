import React from 'react';
import { View } from 'react-native';
import { Switch, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './UnknownClientToggle.styles';

interface UnknownClientToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export const UnknownClientToggle: React.FC<UnknownClientToggleProps> = ({
  value,
  onChange,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Ionicons name="help-circle-outline" size={20} color={colors.primary[600]} />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.title}>Client inconnu</Text>
          <Text style={styles.subtitle}>
            Réceptionner sans attribution client
          </Text>
        </View>
        <Switch value={value} onValueChange={onChange} />
      </View>
    </View>
  );
};
