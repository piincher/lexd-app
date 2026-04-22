import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Divider, List, Switch } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];
import { useAppTheme } from '@src/providers/ThemeProvider';
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
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          marginBottom: 16,
          borderRadius: 12,
          elevation: 2,
          backgroundColor: colors.background.default,
        },
        sectionTitle: {
          fontSize: 14,
          fontWeight: '600',
          color: colors.text.secondary,
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
      }),
    [colors]
  );

  return (
    <>
      <Text style={styles.sectionTitle}>Types de notifications</Text>
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
                  <Ionicons
                    name={getIconForType(pref.type) as IoniconsName}
                    size={20}
                    color={getColorForType(pref.type)}
                  />
                </View>
              )}
              right={() => (
                <Switch
                  value={pref.enabled}
                  onValueChange={(value) => onToggle(pref.type, value)}
                  trackColor={{ false: colors.neutral[200], true: colors.primary.main + '50' }}
                  thumbColor={pref.enabled ? colors.primary.main : colors.background.default}
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
