import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ReceiveAssistHeaderProps {
  onNotificationPress: () => void;
}

export const ReceiveAssistHeader: React.FC<ReceiveAssistHeaderProps> = ({ onNotificationPress }) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.header, { backgroundColor: colors.background.card, borderBottomColor: colors.border }]}>
      <View style={styles.topRow}>
        <View style={styles.titleBlock}>
          <View style={styles.kickerRow}>
            <MaterialCommunityIcons name="barcode-scan" size={16} color={colors.primary.main} />
            <Text style={[styles.kicker, { color: colors.primary.main }]}>Receive Assist</Text>
          </View>
          <Text style={[styles.title, { color: colors.text.primary }]}>Réception marchandise</Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
            Scanner, vérifier, étiqueter, continuer.
          </Text>
        </View>
        <NotificationBell
          onPress={onNotificationPress}
          size={24}
          color={colors.text.secondary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14, borderBottomWidth: 1 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  titleBlock: { flex: 1, minWidth: 0, paddingRight: 14 },
  kickerRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  kicker: { fontSize: 12, fontWeight: '800', textTransform: 'uppercase' },
  title: { marginTop: 4, fontSize: 22, fontWeight: '800' },
  subtitle: { marginTop: 2, fontSize: 13 },
});
