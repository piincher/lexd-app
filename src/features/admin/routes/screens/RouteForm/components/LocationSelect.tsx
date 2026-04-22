import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Menu, HelperText } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { COMMON_ORIGINS, COMMON_DESTINATIONS } from '@src/features/admin/routes/types';

interface LocationSelectProps {
  origin: string;
  destination: string;
  onSelectOrigin: (origin: string) => void;
  onSelectDestination: (destination: string) => void;
  originError?: string;
  destinationError?: string;
  originMenuVisible: boolean;
  setOriginMenuVisible: (visible: boolean) => void;
  destinationMenuVisible: boolean;
  setDestinationMenuVisible: (visible: boolean) => void;
}

export const LocationSelect: React.FC<LocationSelectProps> = ({
  origin,
  destination,
  onSelectOrigin,
  onSelectDestination,
  originError,
  destinationError,
  originMenuVisible,
  setOriginMenuVisible,
  destinationMenuVisible,
  setDestinationMenuVisible,
}) => {
  return (
    <>
      {/* Origin Dropdown */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Origine <Text style={styles.required}>*</Text>
        </Text>
        <Menu
          visible={originMenuVisible}
          onDismiss={() => setOriginMenuVisible(false)}
          anchor={
            <TouchableOpacity
              style={[
                styles.dropdownButton,
                originError && styles.dropdownButtonError,
              ]}
              onPress={() => setOriginMenuVisible(true)}
              activeOpacity={0.8}
            >
              <View style={styles.dropdownButtonContent}>
                <Ionicons
                  name="location"
                  size={20}
                  color={origin ? Theme.primary[500] : Theme.neutral[400]}
                />
                <Text
                  style={[
                    styles.dropdownButtonText,
                    !origin && styles.dropdownButtonPlaceholder,
                  ]}
                  numberOfLines={1}
                >
                  {origin || 'Sélectionner une origine'}
                </Text>
              </View>
              <Ionicons
                name={originMenuVisible ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={Theme.neutral[400]}
              />
            </TouchableOpacity>
          }
          contentStyle={styles.menuContent}
        >
          <ScrollView style={{ maxHeight: 200 }}>
            {COMMON_ORIGINS.map((o) => (
              <Menu.Item
                key={o}
                onPress={() => onSelectOrigin(o)}
                title={o}
                leadingIcon={origin === o ? 'check' : undefined}
                titleStyle={
                  origin === o
                    ? { color: Theme.primary[600], fontWeight: '600' }
                    : undefined
                }
              />
            ))}
          </ScrollView>
        </Menu>
        {originError && <HelperText type="error">{originError}</HelperText>}
      </View>

      {/* Destination Dropdown */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Destination <Text style={styles.required}>*</Text>
        </Text>
        <Menu
          visible={destinationMenuVisible}
          onDismiss={() => setDestinationMenuVisible(false)}
          anchor={
            <TouchableOpacity
              style={[
                styles.dropdownButton,
                destinationError && styles.dropdownButtonError,
              ]}
              onPress={() => setDestinationMenuVisible(true)}
              activeOpacity={0.8}
            >
              <View style={styles.dropdownButtonContent}>
                <Ionicons
                  name="flag"
                  size={20}
                  color={destination ? Theme.primary[500] : Theme.neutral[400]}
                />
                <Text
                  style={[
                    styles.dropdownButtonText,
                    !destination && styles.dropdownButtonPlaceholder,
                  ]}
                  numberOfLines={1}
                >
                  {destination || 'Sélectionner une destination'}
                </Text>
              </View>
              <Ionicons
                name={destinationMenuVisible ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={Theme.neutral[400]}
              />
            </TouchableOpacity>
          }
          contentStyle={styles.menuContent}
        >
          <ScrollView style={{ maxHeight: 200 }}>
            {COMMON_DESTINATIONS.map((d) => (
              <Menu.Item
                key={d}
                onPress={() => onSelectDestination(d)}
                title={d}
                leadingIcon={destination === d ? 'check' : undefined}
                titleStyle={
                  destination === d
                    ? { color: Theme.primary[600], fontWeight: '600' }
                    : undefined
                }
              />
            ))}
          </ScrollView>
        </Menu>
        {destinationError && <HelperText type="error">{destinationError}</HelperText>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: Theme.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
  required: {
    color: Theme.status.error,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    borderRadius: Theme.radius.md,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    backgroundColor: Theme.colors.background.card,
  },
  dropdownButtonError: {
    borderColor: Theme.status.error,
  },
  dropdownButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    flex: 1,
  },
  dropdownButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: Theme.neutral[800],
    flex: 1,
  },
  dropdownButtonPlaceholder: {
    color: Theme.neutral[400],
  },
  menuContent: {
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.colors.background.card,
    width: '85%',
  },
});
