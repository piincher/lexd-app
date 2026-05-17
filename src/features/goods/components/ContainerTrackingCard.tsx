import React from 'react';
import { View, Pressable } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createGoodsDetailContainerStyles } from './GoodsDetailContainer.styles';

interface ContainerTrackingCardProps {
  containerId: string | { _id: string; virtualContainerNumber?: string };
  onPress: () => void;
}

export const ContainerTrackingCard: React.FC<ContainerTrackingCardProps> = ({
  containerId,
  onPress,
}) => {
  const { colors } = useAppTheme();
  const styles = createGoodsDetailContainerStyles(colors);

  const containerNumber =
    typeof containerId === 'object' ? containerId.virtualContainerNumber : containerId;

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="cube" size={20} color={colors.primary.main} />
        <Text style={[styles.title, { color: colors.text.primary }]}>Container</Text>
      </View>
      <Card.Content>
        <Pressable onPress={onPress}>
          <View style={[styles.box, { backgroundColor: colors.background.paper }]}>
            <MaterialCommunityIcons name="ferry" size={36} color={colors.primary.main} />
            <View style={styles.boxInfo}>
              <Text style={[styles.boxLabel, { color: colors.text.secondary }]}>
                Votre marchandise est dans le container:
              </Text>
              <Text style={[styles.boxNumber, { color: colors.text.primary }]}>
                {containerNumber}
              </Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text.secondary} />
          </View>
        </Pressable>
        <Button
          mode="contained"
          onPress={onPress}
          style={styles.trackButton}
          icon="map-marker-path"
        >
          Suivre le Container
        </Button>
      </Card.Content>
    </Card>
  );
};
