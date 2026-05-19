/**
 * GoodsContainerAssignment - Container assignment display
 * SRP: Show current container assignment with assign/unassign actions
 */

import React from 'react';
import { View } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStyles } from './GoodsContainerAssignment.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export interface GoodsContainerAssignmentProps {
  containerId?: string;
  containerNumber?: string;
  onAssign: () => void;
  onUnassign: () => void;
  isLoading?: boolean;
}

export const GoodsContainerAssignment: React.FC<GoodsContainerAssignmentProps> = ({
  containerId,
  containerNumber,
  onAssign,
  onUnassign,
  isLoading = false,
}) => {
  const isAssigned = !!containerId;

  const { colors, isDark } = useAppTheme();

  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.header}>
          <MaterialCommunityIcons name="truck-cargo-container" size={20} color={colors.primary[600]} />
          <Text style={styles.title}>Assignation Conteneur</Text>
        </View>

        {isAssigned ? (
          <View style={styles.assignedContainer}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="ferry" size={32} color={colors.primary[600]} />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.containerNumber}>{containerNumber || containerId}</Text>
              <Text style={styles.status}>Assigné</Text>
            </View>
            <Button
              mode="outlined"
              onPress={onUnassign}
              loading={isLoading}
              disabled={isLoading}
              icon="link-off"
              style={styles.actionButton}
              textColor={colors.status.error}
            >
              Retirer
            </Button>
          </View>
        ) : (
          <View style={styles.unassignedContainer}>
            <MaterialCommunityIcons name="package-variant-closed" size={48} color={colors.neutral[300]} />
            <Text style={styles.unassignedText}>Non assigné à un conteneur</Text>
            <Button
              mode="contained"
              onPress={onAssign}
              loading={isLoading}
              disabled={isLoading}
              icon="plus"
              style={styles.assignButton}
            >
              Assigner
            </Button>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

export default GoodsContainerAssignment;
