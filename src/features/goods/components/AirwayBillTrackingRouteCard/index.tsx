import React from 'react';
import { View } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './AirwayBillTrackingRouteCard.styles';

interface Props {
  departureAirport: string;
  arrivalAirport: string;
}

export const AirwayBillTrackingRouteCard: React.FC<Props> = ({ departureAirport, arrivalAirport }) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.routeRow}>
          <View style={styles.airport}>
            <Text style={styles.airportCode}>{departureAirport}</Text>
            <Text style={styles.airportLabel}>Départ</Text>
          </View>
          <View style={styles.routeLine}>
            <MaterialCommunityIcons name="airplane" size={20} color={colors.primary[500]} />
          </View>
          <View style={styles.airport}>
            <Text style={styles.airportCode}>{arrivalAirport}</Text>
            <Text style={styles.airportLabel}>Arrivée</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};
