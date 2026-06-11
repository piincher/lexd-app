import React from 'react';
import { View, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Loading, EmptyState } from '@src/shared/ui';
import { useEvents } from '../hooks/useEventQueries';
import { EventListItem } from '../components/EventListItem';
import { AdminEvent } from '../api/types';
import { createStyles } from './EventListScreen.styles';

const EventListScreen = ({ navigation }: RootStackScreenProps<'EventList'>) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const { data, isLoading, isRefetching, refetch } = useEvents();

  const events = data?.data?.events ?? [];
  const openForm = (id?: string) => navigation.navigate('EventForm', id ? { id } : undefined);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Événements</Text>
        <View style={{ width: 24 }} />
      </View>

      {isLoading ? (
        <Loading />
      ) : (
        <FlashList
          data={events}
          keyExtractor={(item: AdminEvent) => item._id}
          renderItem={({ item }) => <EventListItem event={item} onPress={openForm} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
          ListEmptyComponent={
            <EmptyState
              title="Aucun événement"
              message="Créez votre premier événement (Coupe du Monde, AFCON, Ramadan…)."
            />
          }
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => openForm()} accessibilityLabel="Créer un événement">
        <Ionicons name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EventListScreen;
