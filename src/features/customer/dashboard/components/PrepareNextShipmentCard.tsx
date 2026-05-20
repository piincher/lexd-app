import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { NextShipmentAction } from '@src/shared/types/dashboard';

interface Props {
  actions: NextShipmentAction[];
  onActionPress: (action: NextShipmentAction) => void;
  onPreparePress: () => void;
}

export const PrepareNextShipmentCard: React.FC<Props> = ({
  actions,
  onActionPress,
  onPreparePress,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => StyleSheet.create({
    wrapper: { paddingHorizontal: 16, marginTop: 16 },
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    title: { color: colors.text.primary, fontSize: 17, fontWeight: '900' },
    detail: { color: colors.text.secondary, fontSize: 13, lineHeight: 19, marginTop: 6 },
    primary: {
      minHeight: 48,
      borderRadius: 12,
      backgroundColor: colors.status.info,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginTop: 14,
    },
    primaryText: { color: colors.text.inverse, fontSize: 14, fontWeight: '900' },
    row: { flexDirection: 'row', gap: 8, marginTop: 10 },
    secondary: {
      flex: 1,
      minHeight: 48,
      borderRadius: 12,
      paddingHorizontal: 10,
      backgroundColor: colors.background.paper,
      alignItems: 'center',
      justifyContent: 'center',
    },
    secondaryText: { color: colors.text.primary, fontSize: 12, fontWeight: '800', textAlign: 'center' },
  }), [colors]);

  const secondary = actions.filter((action) => action.priority !== 'primary').slice(0, 2);

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Text style={styles.title}>Préparer le prochain envoi</Text>
        <Text style={styles.detail}>
          Demandez l&apos;organisation de votre prochain envoi ou vérifiez une route avant d&apos;acheter.
        </Text>
        <Pressable style={styles.primary} onPress={onPreparePress}>
          <Ionicons name="send" size={18} color={colors.text.inverse} />
          <Text style={styles.primaryText}>Demander un envoi</Text>
        </Pressable>
        <View style={styles.row}>
          {secondary.map((action) => (
            <Pressable key={action.id} style={styles.secondary} onPress={() => onActionPress(action)}>
              <Text style={styles.secondaryText} numberOfLines={2}>{action.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

export default PrepareNextShipmentCard;
