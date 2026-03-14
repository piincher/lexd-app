import React from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';

interface MasterToggleProps {
  enabled: boolean;
  onToggle: (value: boolean) => void;
}

export const MasterToggle: React.FC<MasterToggleProps> = ({ enabled, onToggle }) => {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.masterToggle}>
        <View style={styles.masterToggleLeft}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: enabled ? COLORS.primary : '#E5E7EB' },
            ]}
          >
            <Ionicons
              name={enabled ? 'notifications' : 'notifications-off'}
              size={24}
              color={enabled ? '#FFF' : '#6B7280'}
            />
          </View>
          <View style={styles.masterToggleText}>
            <Text style={styles.masterToggleTitle}>Push Notifications</Text>
            <Text style={styles.masterToggleSubtitle}>
              {enabled ? 'Enabled' : 'Disabled'}
            </Text>
          </View>
        </View>
        <Switch
          value={enabled}
          onValueChange={onToggle}
          trackColor={{ false: '#E5E7EB', true: COLORS.primary + '50' }}
          thumbColor={enabled ? COLORS.primary : '#FFF'}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: '#FFF',
  },
  masterToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  masterToggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  masterToggleText: {
    marginLeft: 16,
  },
  masterToggleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
  },
  masterToggleSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
});
