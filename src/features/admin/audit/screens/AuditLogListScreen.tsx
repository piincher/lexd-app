import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { AuditFilters } from '../components';
import { useAuditLogListScreen } from './hooks/useAuditLogListScreen';
import { createStyles } from './AuditLogListScreen.styles';

const AuditLogListScreen: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const {
    filters,
    setFilters,
    isLoading,
    isFetching,
    isError,
    items,
    handlers,
    ListEmptyComponent,
  } = useAuditLogListScreen();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.iconButton} onPress={handlers.handleBack}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </Pressable>
        <Text style={styles.title}>Audit trail</Text>
      </View>
      <AuditFilters filters={filters} onChange={setFilters} />
      {isLoading ? (
        <ActivityIndicator style={styles.centered} color={colors.primary.main} />
      ) : isError ? (
        <View style={styles.centered}>
          <Text style={styles.stateText}>Impossible de charger les journaux d'audit.</Text>
          <Pressable style={styles.retryButton} onPress={handlers.handleRetry}>
            <Text style={styles.retryText}>Réessayer</Text>
          </Pressable>
        </View>
      ) : (
        <FlashList
          data={items}
          renderItem={handlers.renderItem}
          keyExtractor={handlers.keyExtractor}
          contentContainerStyle={styles.listContent}
          onRefresh={handlers.handleRetry}
          refreshing={isFetching}
          ListEmptyComponent={ListEmptyComponent}
        />
      )}
    </SafeAreaView>
  );
};

export default AuditLogListScreen;
