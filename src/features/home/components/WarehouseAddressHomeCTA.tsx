import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';

/**
 * Home quick action (logged-in clients) linking to the warehouse receiving
 * addresses they forward to their supplier in China.
 */
export const WarehouseAddressHomeCTA: React.FC = () => {
  const { colors } = useAppTheme();
  const navigation = useNavigation<{ navigate: (screen: string) => void }>();

  return (
    <Pressable
      onPress={() => navigation.navigate('WarehouseAddress')}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.background.card, borderColor: colors.border },
        pressed && { opacity: 0.85 },
      ]}
      accessibilityRole="button"
      accessibilityLabel="Voir les adresses d'entrepôt"
    >
      <View style={[styles.iconBox, { backgroundColor: colors.status.info + '1A' }]}>
        <MaterialCommunityIcons name="warehouse" size={24} color={colors.status.info} />
      </View>
      <View style={styles.text}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Adresses d&apos;entrepôt</Text>
        <Text style={[styles.subtitle, { color: colors.text.secondary }]} numberOfLines={2}>
          Adresse de réception en Chine (fret aérien et maritime)
        </Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={26} color={colors.text.secondary} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 16,
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
  },
  iconBox: { width: 46, height: 46, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  text: { flex: 1, minWidth: 0 },
  title: { fontSize: 15, fontWeight: '800' },
  subtitle: { fontSize: 12, marginTop: 2, lineHeight: 17 },
});

export default WarehouseAddressHomeCTA;
