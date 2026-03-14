import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Divider, List, Switch } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import {
  NotificationPreference,
  NotificationType,
} from '@src/shared/services';

interface NotificationTypesListProps {
  preferences: NotificationPreference[];
  onToggle: (type: NotificationType, value: boolean) => void;
  getIconForType: (type: NotificationType) => string;
  getColorForType: (type: NotificationType) => string;
}

export const NotificationTypesList: React.FC<NotificationTypesListProps> = ({
  preferences,
  onToggle,
  getIconForType,
  getColorForType,
}) => {
  return (
    <>
      <Text style={styles.sectionTitle}>Notification Types</Text>
      <Card style={styles.card}>
        {preferences.map((pref, index) => (
          <React.Fragment key={pref.type}>
            {index > 0 && <Divider />}
            <List.Item
              title={pref.label}
              description={pref.description}
              left={() => (
                <View
                  style={[
                    styles.typeIcon,
                    { backgroundColor: getColorForType(pref.type) + '20' },
                  ]}
                >
                  <AntDesign
                    name={getIconForType(pref.type)}
                    size={20}
                    color={getColorForType(pref.type)}
                  />
                </View>
              )}
              right={() => (
                <Switch
                  value={pref.enabled}
                  onValueChange={(value) => onToggle(pref.type, value)}
                  trackColor={{ false: '#E5E7EB', true: COLORS.primary + '50' }}
                  thumbColor={pref.enabled ? COLORS.primary : '#FFF'}
                />
              )}
              style={styles.preferenceItem}
            />
          </React.Fragment>
        ))}
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: '#FFF',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 4,
  },
  preferenceItem: {
    paddingVertical: 12,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
