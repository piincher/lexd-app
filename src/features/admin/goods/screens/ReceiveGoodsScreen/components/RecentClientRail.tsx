import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { userData } from '@src/shared/types/user';

interface RecentClientRailProps {
  clients: userData[];
  onSelect: (client: userData) => void;
}

export const RecentClientRail: React.FC<RecentClientRailProps> = ({ clients, onSelect }) => {
  const { colors } = useAppTheme();
  if (clients.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text.secondary }]}>Clients récents</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rail}>
        {clients.map((client) => {
          const fullName = `${client.firstName || ''} ${client.lastName || ''}`.trim() || 'Client';
          return (
            <Pressable
              key={client._id}
              onPress={() => onSelect(client)}
              style={({ pressed }) => [
                styles.chip,
                {
                  backgroundColor: pressed ? colors.background.paper : colors.background.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <MaterialCommunityIcons name="account-clock-outline" size={16} color={colors.primary.main} />
              <View style={styles.text}>
                <Text style={[styles.name, { color: colors.text.primary }]} numberOfLines={1}>
                  {fullName}
                </Text>
                {client.phoneNumber ? (
                  <Text style={[styles.phone, { color: colors.text.secondary }]} numberOfLines={1}>
                    {client.phoneNumber}
                  </Text>
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: { fontSize: 12, fontWeight: '700', marginBottom: 8 },
  rail: { gap: 8, paddingRight: 16 },
  chip: {
    minHeight: 48,
    maxWidth: 220,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: { flexShrink: 1, minWidth: 0 },
  name: { fontSize: 13, fontWeight: '700' },
  phone: { fontSize: 11, marginTop: 1 },
});
