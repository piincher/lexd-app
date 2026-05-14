import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface UnknownClientToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export const UnknownClientToggle: React.FC<UnknownClientToggleProps> = ({
  value,
  onChange,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => StyleSheet.create({
    container: {
      marginBottom: Theme.spacing.md,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: Theme.spacing.md,
      borderRadius: Theme.radius.lg,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.neutral[200],
    },
    iconWrap: {
      marginRight: Theme.spacing.md,
    },
    textWrap: {
      flex: 1,
    },
    title: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.neutral[800],
    },
    subtitle: {
      fontSize: 12,
      color: colors.neutral[500],
      marginTop: 2,
    },
  }), [colors]);

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
