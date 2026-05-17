import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Surface, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { getStyles } from './ActiveOrderRouteTimeline.styles';

const STEP_ICONS: Record<string, string> = {
  'Le client a passé une commande': 'cart-check',
  'Les colis sont emballés et prêts pour l\'expédition': 'package-variant-closed',
  'Order arrived at warehouse': 'warehouse',
  'Order in Processing': 'cog',
  'Order in Transit': 'truck-delivery',
  'Order in Arrived': 'map-marker-check',
  Delivered: 'package-check',
};

interface RouteItem {
  id?: string;
  status: string;
  coordinates: { location: string; note?: string; latitude?: string; longitude?: string }[];
}

interface ActiveOrderRouteTimelineProps {
  routeData?: { orderDetail?: RouteItem[] };
  selectedCheckboxes: Record<string, boolean>;
  pickerValue: string;
  actualLocation?: string;
  onStepChange: (value: string, status: string, coordinates: any[]) => void;
  onCheckboxPress: (location: string, status: string, coordinates: any[]) => void;
}

export const ActiveOrderRouteTimeline: React.FC<ActiveOrderRouteTimelineProps> = ({
  routeData,
  selectedCheckboxes,
  pickerValue,
  actualLocation,
  onStepChange,
  onCheckboxPress,
}) => {
  const { colors } = useAppTheme();
  const styles = getStyles(colors);
  const details = routeData?.orderDetail || [];

  return (
    <Surface style={styles.card}>
      <View style={styles.sectionHeader}>
        <MaterialCommunityIcons name="routes" size={20} color={colors.primary.main} />
        <Text style={styles.sectionTitle}>Suivi de l&apos;expédition</Text>
      </View>

      {details.map((routeItem, routeIndex) => (
        <View key={routeItem.id || routeIndex} style={styles.routeGroup}>
          <View style={styles.routeHeader}>
            <View
              style={[
                styles.routeIconCircle,
                routeItem.status === 'Order in Transit' && styles.routeIconCircleActive,
              ]}
            >
              <MaterialCommunityIcons
                name={(STEP_ICONS[routeItem.status] || 'circle') as any}
                size={16}
                color={routeItem.status === 'Order in Transit' ? colors.status.info : colors.text.secondary}
              />
            </View>
            <Text style={styles.routeTitle}>{routeItem.status}</Text>
          </View>

          {routeItem.status === 'Order in Transit' ? (
            <View style={styles.pickerWrapper}>
              <Picker
                prompt="Changer le trajet"
                mode="dialog"
                style={styles.picker}
                selectedValue={pickerValue || actualLocation}
                onValueChange={(val) =>
                  onStepChange(val, routeItem.status, routeItem.coordinates)
                }
              >
                {routeItem.coordinates.map((c) => (
                  <Picker.Item key={c.location} label={c.location} value={c.location} />
                ))}
              </Picker>
            </View>
          ) : (
            <View style={styles.timelineList}>
              {routeItem.coordinates.map((location, locIndex) => {
                const isChecked = selectedCheckboxes[location.location];
                return (
                  <Pressable
                    key={location.location}
                    onPress={() =>
                      onCheckboxPress(location.location, routeItem.status, routeItem.coordinates)
                    }
                    style={styles.timelineItem}
                  >
                    {locIndex > 0 && (
                      <View
                        style={[
                          styles.connector,
                          isChecked && styles.connectorActive,
                        ]}
                      />
                    )}
                    <View
                      style={[
                        styles.timelineCircle,
                        isChecked && styles.timelineCircleActive,
                      ]}
                    >
                      {isChecked && (
                        <MaterialCommunityIcons name="check" size={12} color={colors.text.inverse} />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.timelineLabel,
                        isChecked && styles.timelineLabelActive,
                      ]}
                      numberOfLines={2}
                    >
                      {location.location}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}

          {routeIndex < details.length - 1 && <Divider style={styles.routeDivider} />}
        </View>
      ))}
    </Surface>
  );
};

export default ActiveOrderRouteTimeline;
