import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { NotificationEventCard, NotificationEventFilters } from '../components';
import { useNotificationEvents } from '../hooks';
import type { NotificationEventFilters as Filters, NotificationEventLog } from '../types';
import { createNotificationEventListStyles } from './NotificationEventListScreen.styles';

const INITIAL_FILTERS: Filters = { page: 1, limit: 50, status: 'ALL' };

const NotificationEventListScreen: React.FC<RootStackScreenProps<'NotificationEvents'>> = ({
  navigation,
}) => {
  const { colors } = useAppTheme();
  const styles = createNotificationEventListStyles(colors);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const { data, isLoading, isFetching, isError, refetch } = useNotificationEvents(filters);
  const items = data?.items || [];

  const handlePress = useCallback((item: NotificationEventLog) => {
    navigation.navigate('NotificationEventDetail', { notificationEventId: item._id });
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }: { item: NotificationEventLog }) => (
      <NotificationEventCard item={item} onPress={handlePress} />
    ),
    [handlePress]
  );
  const keyExtractor = useCallback((item: NotificationEventLog) => item._id, []);
  const empty = useMemo(() => (
    <View style={styles.centered}>
      <Text style={styles.stateText}>Aucun événement de notification.</Text>
    </View>
  ), [styles]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </Pressable>
        <Text style={styles.title}>Notification events</Text>
      </View>
      <NotificationEventFilters filters={filters} onChange={setFilters} />
      {isLoading ? (
        <ActivityIndicator style={styles.centered} color={colors.primary.main} />
      ) : isError ? (
        <View style={styles.centered}>
          <Text style={styles.stateText}>Impossible de charger les événements.</Text>
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

export default NotificationEventListScreen;
