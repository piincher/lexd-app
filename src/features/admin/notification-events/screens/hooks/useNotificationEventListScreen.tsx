import { useCallback, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { useNotificationEvents } from '../../hooks';
import { NotificationEventCard } from '../../components';
import type { NotificationEventFilters as Filters, NotificationEventLog } from '../../types';
import { createStyles } from '../NotificationEventListScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

const INITIAL_FILTERS: Filters = { page: 1, limit: 50, status: 'ALL' };

export const useNotificationEventListScreen = () => {
  const navigation = useNavigation();
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const { data, isLoading, isFetching, isError, refetch } = useNotificationEvents(filters);
  const items = data?.items || [];

  const handlePress = useCallback((item: NotificationEventLog) => {
    navigation.navigate('NotificationEventDetail' as never, { notificationEventId: item._id } as never);
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }: { item: NotificationEventLog }) => <NotificationEventCard item={item} onPress={handlePress} />,
    [handlePress]
  );

  const keyExtractor = useCallback((item: NotificationEventLog) => item._id, []);

  const ListEmptyComponent = useMemo(
    () => (
      <View style={styles.centered}>
        <Text style={styles.stateText}>Aucun événement de notification.</Text>
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
