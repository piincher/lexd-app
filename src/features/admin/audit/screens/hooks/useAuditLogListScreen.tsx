import { useCallback, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { useAuditLogs } from '../../hooks';
import { AuditLogCard } from '../../components';
import type { AuditLog, AuditLogFilters } from '../../types';
import { createAuditLogListStyles } from '../AuditLogListScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

const INITIAL_FILTERS: AuditLogFilters = { page: 1, limit: 50, status: 'ALL' };

export const useAuditLogListScreen = () => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const styles = createAuditLogListStyles(colors);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const { data, isLoading, isFetching, isError, refetch } = useAuditLogs(filters);
  const items = data?.items || [];

  const handlePress = useCallback((item: AuditLog) => {
    navigation.navigate('AuditLogDetail' as never, { auditLogId: item._id } as never);
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }: { item: AuditLog }) => <AuditLogCard item={item} onPress={handlePress} />,
    [handlePress]
  );

  const keyExtractor = useCallback((item: AuditLog) => item._id, []);

  const ListEmptyComponent = useMemo(
    () => (
      <View style={styles.centered}>
        <Text style={styles.stateText}>Aucun journal ne correspond aux filtres.</Text>
      </View>
    ),
    [styles]
  );

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    filters,
    setFilters,
    data,
    isLoading,
    isFetching,
    isError,
    items,
    handlers: {
      handleBack,
      handleRetry,
      handlePress,
      renderItem,
      keyExtractor,
    },
    ListEmptyComponent,
    refetch,
  };
};
