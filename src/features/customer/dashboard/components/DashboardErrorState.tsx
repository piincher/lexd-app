import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface Props {
  message: string;
  onRetry: () => void;
}

export const DashboardErrorState: React.FC<Props> = ({ message, onRetry }) => {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <MaterialCommunityIcons name="alert-circle-outline" size={64} color={colors.status.error} />
      <Text style={[styles.title, { color: colors.text.primary }]}>Erreur de chargement</Text>
      <Text style={[styles.subtitle, { color: colors.text.secondary }]}>{message}</Text>
      <Button mode="contained" onPress={onRetry} style={{ marginTop: 20 }}>
        Réessayer
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
  title: { fontSize: 18, fontWeight: '700', marginTop: 16 },
  subtitle: { fontSize: 14, textAlign: 'center', marginTop: 8 },
});

export default DashboardErrorState;
