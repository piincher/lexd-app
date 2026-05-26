/**
 * PackingListConsignee Component
 * Consignee information section with contact and address actions
 * SRP: Display consignee details with contact buttons
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from '../ClientPackingListScreen.styles';

interface Consignee {
  name?: string;
  phone?: string;
  email?: string;
  warehouseAddress?: string;
}

interface PackingListConsigneeProps {
  consignee?: Consignee;
  onContactPress: () => void;
  onAddressPress: () => void;
}

export const PackingListConsignee: React.FC<PackingListConsigneeProps> = ({
  consignee,
  onContactPress,
  onAddressPress,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  if (!consignee) {
    return null;
  }

  const infoRows = [
    consignee.name && {
      icon: 'account' as const,
      label: 'Nom',
      value: consignee.name,
      action: null,
    },
    consignee.phone && {
      icon: 'phone' as const,
      label: 'Téléphone',
      value: consignee.phone,
      action: onContactPress,
      actionIcon: 'phone-outline' as const,
    },
    consignee.email && {
      icon: 'email' as const,
      label: 'Email',
      value: consignee.email,
      action: null,
    },
    consignee.warehouseAddress && {
      icon: 'map-marker' as const,
      label: 'Adresse de l\'entrepôt',
      value: consignee.warehouseAddress,
      action: onAddressPress,
      actionIcon: 'map-marker-radius' as const,
    },
  ].filter(Boolean) as Array<{
    icon: string;
    label: string;
    value: string;
    action: (() => void) | null;
    actionIcon?: string;
  }>;

  return (
    <Card style={styles.sectionCard}>
      <Card.Content>
        <View style={styles.sectionHeader}>
          <View style={[stylesStatic.iconWrap, { backgroundColor: colors.primary[50] }]}>
            <MaterialCommunityIcons
              name="warehouse"
              size={20}
              color={colors.primary[600]}
            />
          </View>
          <Text style={styles.sectionTitle}>Informations du Destinataire</Text>
        </View>
        <Divider style={styles.sectionDivider} />

        <View style={styles.consigneeInfo}>
          {infoRows.map((row, index) => (
            <View key={row.label}>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name={row.icon as any} size={20} color={colors.text.muted} />
                <View style={styles.infoContent}>
                  <Text style={[stylesStatic.infoLabel, { color: colors.text.muted }]}>
                    {row.label}
                  </Text>
                  <Text style={[stylesStatic.infoValue, { color: colors.text.primary }]}>
                    {row.value}
                  </Text>
                </View>
                {row.action && (
                  <TouchableOpacity
                    onPress={row.action}
                    style={[stylesStatic.actionIconWrap, { backgroundColor: colors.primary[50] }]}
                    activeOpacity={0.7}
                  >
                    <MaterialCommunityIcons
                      name={row.actionIcon as any}
                      size={18}
                      color={colors.primary[600]}
                    />
                  </TouchableOpacity>
                )}
              </View>
              {index < infoRows.length - 1 && (
                <Divider style={[stylesStatic.rowDivider, { backgroundColor: colors.border }]} />
              )}
            </View>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
};

const stylesStatic = {
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: 12,
  },
  infoLabel: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: Fonts.meduim,
    fontSize: 15,
    lineHeight: 20,
  },
  actionIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  rowDivider: {
    marginLeft: 32,
    marginVertical: 12,
    height: 1,
  },
};

export default PackingListConsignee;
