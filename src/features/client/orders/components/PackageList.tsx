/**
 * Package List Component
 * Shows list of active packages with tracking, description, CBM, status
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@src/shared/ui/Card';
import { Badge } from '@src/shared/ui/Badge';
import { Package } from '../api/clientOrdersApi';
import { formatCBM } from '@src/shared/lib/formatters';
import { Theme } from '@src/constants/Theme';

interface PackageListProps {
  packages: Package[];
}

export const PackageList: React.FC<PackageListProps> = ({ packages }) => (
  <View style={styles.packageList}>
    <Text style={styles.sectionTitle}>Vos Colis</Text>
    {packages.map((pkg) => (
      <Card key={pkg._id} style={styles.packageCard}>
        <View style={styles.packageHeader}>
          <Text style={styles.trackingCode}>{pkg.trackingNumber}</Text>
          <Badge label={pkg.status} variant="primary" />
        </View>
        <Text style={styles.packageDescription}>{pkg.description}</Text>
        <Text style={styles.packageCBM}>
          {formatCBM(
            (pkg.dimensions.length * pkg.dimensions.width * pkg.dimensions.height) / 1000000
          )}
        </Text>
      </Card>
    ))}
  </View>
);

const styles = StyleSheet.create({
  packageList: {
    marginTop: Theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.md,
  },
  packageCard: {
    marginBottom: Theme.spacing.md,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  trackingCode: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  packageDescription: {
    fontSize: 14,
    color: Theme.neutral[600],
    marginBottom: Theme.spacing.xs,
  },
  packageCBM: {
    fontSize: 13,
    color: Theme.neutral[500],
    fontWeight: '500',
  },
});
