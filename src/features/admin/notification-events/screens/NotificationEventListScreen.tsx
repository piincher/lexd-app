import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { NotificationEventFilters } from '../components';
import { useNotificationEventListScreen } from './hooks/useNotificationEventListScreen';
import { createStyles } from './NotificationEventListScreen.styles';

const NotificationEventListScreen: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const {
    filters,
    setFilters,
    isLoading,
    isFetching,
    isError,
    items,
    handlers,
    ListEmptyComponent,
  } = useNotificationEventListScreen();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.iconButton} onPress={handlers.handleBack}>
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

export default NotificationEventListScreen;
