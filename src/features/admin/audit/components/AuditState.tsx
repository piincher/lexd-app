import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface AuditStateProps {
  title?: string;
  message?: string;
  loading?: boolean;
  onRetry?: () => void;
}

export const AuditState: React.FC<AuditStateProps> = ({
  title = 'No audit logs',
  message = 'Try adjusting filters or refresh the list.',
  loading = false,
  onRetry,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={colors.primary.main} size="large" />
      ) : (
        <MaterialCommunityIcons name="file-search-outline" size={40} color={colors.text.secondary} />
      )}
      <Text style={[styles.title, { color: colors.text.primary }]}>{loading ? 'Loading audit logs...' : title}</Text>
      {!loading ? <Text style={[styles.message, { color: colors.text.secondary }]}>{message}</Text> : null}
      {onRetry && !loading ? (
        <Pressable style={[styles.button, { backgroundColor: colors.primary.main }]} onPress={onRetry}>
          <Text style={[styles.buttonText, { color: colors.text.inverse }]}>Retry</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
  },
  message: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 16,
    minHeight: 44,
    paddingHorizontal: 18,
  },
  buttonText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
});
