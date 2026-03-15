/**
 * TrackOrderScreen
 * Screen for customers to track orders by order code
 */

import React, { useState, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Screen } from '@src/shared/ui/Screen';
import { Input } from '@src/shared/ui/Input';
import { Button } from '@src/shared/ui/Button';
import { Card } from '@src/shared/ui/Card';
import { EmptyState } from '@src/shared/ui/EmptyState';
import { useTrackOrder } from '../hooks/useTrackOrder';
import { styles } from './TrackOrderScreen.styles';

export const TrackOrderScreen: React.FC = () => {
  const [orderCode, setOrderCode] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const { data, isLoading, isError, refetch } = useTrackOrder(orderCode);

  const handleTrack = useCallback(() => {
    if (orderCode.trim()) {
      setHasSearched(true);
      refetch();
    }
  }, [orderCode, refetch]);

  return (
    <Screen header={{ title: 'Suivi de Commande' }}>
      <View style={styles.container}>
        <Card style={styles.inputCard}>
          <Input
            label="Code de commande"
            placeholder="Entrez votre code de suivi"
            value={orderCode}
            onChangeText={setOrderCode}
            autoCapitalize="characters"
          />
          <Button
            title="Suivre"
            onPress={handleTrack}
            loading={isLoading}
            disabled={!orderCode.trim() || isLoading}
            fullWidth
            style={styles.trackButton}
          />
        </Card>

        {isLoading && (
          <EmptyState title="Recherche en cours..." loading style={styles.loadingState} />
        )}

        {isError && hasSearched && !isLoading && (
          <EmptyState
            icon="alert-circle"
            title="Commande non trouvée"
            message="Vérifiez votre code de suivi et réessayez"
            style={styles.errorState}
          />
        )}

        {data?.found && !isLoading && (
          <ScrollView style={styles.resultsContainer}>
            <Card style={styles.resultCard}>
              <Text style={styles.statusLabel}>Statut</Text>
              <Text style={styles.statusValue}>{data.currentStatus}</Text>
            </Card>

            {data.order && (
              <Card style={styles.resultCard}>
                <Text style={styles.sectionTitle}>Détails</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Numéro</Text>
                  <Text style={styles.detailValue}>{data.order.orderNumber}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Destination</Text>
                  <Text style={styles.detailValue}>{data.order.destination}</Text>
                </View>
              </Card>
            )}

            {data.order?.timeline && data.order.timeline.length > 0 && (
              <Card style={styles.resultCard}>
                <Text style={styles.sectionTitle}>Historique</Text>
                {data.order.timeline.map((event, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineDot} />
                    <View style={styles.timelineContent}>
                      <Text style={styles.timelineStatus}>{event.status}</Text>
                      {event.location && (
                        <Text style={styles.timelineLocation}>{event.location}</Text>
                      )}
                      <Text style={styles.timelineDate}>
                        {new Date(event.timestamp).toLocaleDateString('fr-FR')}
                      </Text>
                    </View>
                  </View>
                ))}
              </Card>
            )}
          </ScrollView>
        )}
      </View>
    </Screen>
  );
};

export default TrackOrderScreen;
