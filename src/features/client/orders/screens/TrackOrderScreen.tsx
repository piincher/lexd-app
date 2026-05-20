/**
 * TrackOrderScreen
 * Screen for customers to track orders by order code
 */

import React from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Screen } from '@src/shared/ui/Screen';
import { useTrackOrderScreen } from '../hooks/useTrackOrderScreen';
import { TrackOrderSearchForm } from '../components/TrackOrderSearchForm';
import { TrackOrderResults } from '../components/TrackOrderResults';
import { styles } from './TrackOrderScreen.styles';

export const TrackOrderScreen: React.FC = () => {
  const { orderCode, setOrderCode, handleTrack, hasSearched, data, isLoading, isError } =
    useTrackOrderScreen();

  return (
    <Screen header={{ title: 'Suivi de Commande', showNotificationBell: true }} scrollable={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <TrackOrderSearchForm
              orderCode={orderCode}
              onOrderCodeChange={setOrderCode}
              onTrack={handleTrack}
              isLoading={isLoading}
            />
            <TrackOrderResults
              data={data}
              isLoading={isLoading}
              isError={isError}
              hasSearched={hasSearched}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default TrackOrderScreen;
