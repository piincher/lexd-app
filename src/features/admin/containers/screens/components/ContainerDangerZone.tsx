import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ContainerDangerZoneProps {
  isDeletingContainer: boolean;
  onAssignGoods?: () => void;
  onDeleteContainer: () => void;
}

export const ContainerDangerZone: React.FC<ContainerDangerZoneProps> = ({
  isDeletingContainer,
  onAssignGoods,
  onDeleteContainer,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.card, borderTopColor: colors.border }]}>
      {onAssignGoods && (
        <Pressable
          style={[styles.primaryButton, { backgroundColor: colors.primary[600] }]}
          onPress={onAssignGoods}
        >
          <Ionicons name="add-circle-outline" size={20} color={colors.text.inverse} />
          <Text style={[styles.primaryText, { color: colors.text.inverse }]}>
            Assigner des marchandises
          </Text>
        </Pressable>
      )}

      <Pressable
        style={[
          styles.deleteButton,
          { borderColor: colors.status.error, opacity: isDeletingContainer ? 0.6 : 1 },
        ]}
        onPress={onDeleteContainer}
        disabled={isDeletingContainer}
      >
        {isDeletingContainer ? (
          <ActivityIndicator size="small" color={colors.status.error} />
        ) : (
          <Ionicons name="trash-outline" size={20} color={colors.status.error} />
        )}
        <Text style={[styles.text, { color: colors.status.error }]}>
          {isDeletingContainer ? 'Suppression...' : 'Supprimer le container'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 10, borderTopWidth: 1, gap: 10 },
  primaryButton: { minHeight: 50, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  deleteButton: { minHeight: 48, borderRadius: 8, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  primaryText: { fontSize: 14, fontWeight: '800' },
  text: { fontSize: 14, fontWeight: '800' },
});

export default ContainerDangerZone;
