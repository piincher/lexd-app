/**
 * ClientLoadingListScreen
 * Shows client's loading sequence in container
 * Simple version - displays loading position and sequence
 */

import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useClientLoadingListScreenStyles } from './ClientLoadingListScreen.styles';
import { ClientLoadingListHeader, LoadingPlanPlaceholder } from '../components';

export const ClientLoadingListScreen: React.FC<RootStackScreenProps<'ClientLoadingList'>> = ({
  route,
  navigation,
}) => {
  const { containerId } = route.params;
  const styles = useClientLoadingListScreenStyles();

  return (
    <SafeAreaView style={styles.container}>
      <ClientLoadingListHeader navigation={navigation} />
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {}} />
        }
      >
        <LoadingPlanPlaceholder />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClientLoadingListScreen;
