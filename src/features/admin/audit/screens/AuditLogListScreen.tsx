import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { AuditFilters, AuditLogCard } from '../components';
import { useAuditLogs } from '../hooks';
import type { AuditLog, AuditLogFilters } from '../types';
import { createAuditLogListStyles } from './AuditLogListScreen.styles';

const INITIAL_FILTERS: AuditLogFilters = { page: 1, limit: 50, status: 'ALL' };

const AuditLogListScreen: React.FC<RootStackScreenProps<'AuditLogs'>> = ({ navigation }) => {
  const { colors } = useAppTheme();
  const styles = createAuditLogListStyles(colors);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const { data, isLoading, isFetching, isError, refetch } = useAuditLogs(filters);
  const items = data?.items || [];

  const handlePress = useCallback((item: AuditLog) => {
    navigation.navigate('AuditLogDetail', { auditLogId: item._id });
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }: { item: AuditLog }) => <AuditLogCard item={item} onPress={handlePress} />,
    [handlePress]
  );
  const keyExtractor = useCallback((item: AuditLog) => item._id, []);

  const empty = useMemo(() => (
    <View style={styles.centered}>
      <Text style={styles.stateText}>Aucun journal ne correspond aux filtres.</Text>
    </View>
  ), [styles]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.iconButton} onPress={() => navigation.goBack()}>
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
          <Pressable style={styles.retryButton} onPress={() => refetch()}>
            <Text style={styles.retryText}>Réessayer</Text>
          </Pressable>
        </View>
      ) : (
        <FlashList
          data={items}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          onRefresh={refetch}
          refreshing={isFetching}
          ListEmptyComponent={empty}
        />
      )}
    </SafeAreaView>
  );
};

export default AuditLogListScreen;
