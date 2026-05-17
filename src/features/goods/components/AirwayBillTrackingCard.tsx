import React from 'react';
import { View, Pressable } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createGoodsDetailContainerStyles } from './GoodsDetailContainer.styles';

interface AirwayBillTrackingCardProps {
  airwayBillId: string | { _id: string; awbNumber?: string; airline?: string; flightNumber?: string };
  onPress: () => void;
}

export const AirwayBillTrackingCard: React.FC<AirwayBillTrackingCardProps> = ({
  airwayBillId,
  onPress,
}) => {
  const { colors } = useAppTheme();
  const styles = createGoodsDetailContainerStyles(colors);

  const awbNumber = typeof airwayBillId === 'object' ? airwayBillId.awbNumber : airwayBillId;
  const airline = typeof airwayBillId === 'object' ? airwayBillId.airline : null;
  const flightNumber = typeof airwayBillId === 'object' ? airwayBillId.flightNumber : null;

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="airplane" size={20} color={colors.primary.main} />
        <Text style={[styles.title, { color: colors.text.primary }]}>Lettre de transport aérienne</Text>
      </View>
      <Card.Content>
        <Pressable onPress={onPress}>
          <View style={[styles.box, { backgroundColor: colors.background.paper }]}>
            <MaterialCommunityIcons name="airplane" size={36} color={colors.primary.main} />
            <View style={styles.boxInfo}>
              <Text style={[styles.boxLabel, { color: colors.text.secondary }]}>
                Votre colis est sous l'AWB:
              </Text>
              <Text style={[styles.boxNumber, { color: colors.text.primary }]}>
                {awbNumber}
              </Text>
              {airline && flightNumber && (
                <Text style={[styles.boxLabel, { color: colors.text.secondary }]}>
                  {airline} · {flightNumber}
                </Text>
              )}
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text.secondary} />
          </View>
        </Pressable>
        <Button
          mode="contained"
          onPress={onPress}
          style={styles.trackButton}
          icon="airplane"
        >
          Suivre le vol
        </Button>
      </Card.Content>
    </Card>
  );
};
