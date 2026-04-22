/**
 * Conflict Resolution Component
 * UI for resolving sync conflicts between local and server data
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { QueuedAction } from '../lib/offlineQueue';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';

export interface ConflictData {
  action: QueuedAction;
  serverData: any;
  clientData: any;
  fieldName?: string;
}

interface ConflictResolverProps {
  /** Whether the modal is visible */
  visible: boolean;
  /** The conflict to resolve */
  conflict?: ConflictData;
  /** Callback when resolved */
  onResolve: (resolution: 'server' | 'client' | 'merge', mergedData?: any) => void;
  /** Callback to dismiss */
  onDismiss: () => void;
}

export const ConflictResolver: React.FC<ConflictResolverProps> = ({
  visible,
  conflict,
  onResolve,
  onDismiss,
}) => {
  const [selectedOption, setSelectedOption] = useState<'server' | 'client' | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  if (!conflict) return null;

  const { action, serverData, clientData, fieldName } = conflict;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderValue = (value: any) => {
    if (value === null || value === undefined) return 'Non défini';
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
  };

  const handleResolve = () => {
    if (selectedOption) {
      onResolve(selectedOption);
      setSelectedOption(null);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <MaterialCommunityIcons name="alert-decagram" size={32} color="#FF9800" />
            <Text style={styles.title}>Conflit de synchronisation</Text>
            <Text style={styles.subtitle}>
              Les données ont été modifiées sur le serveur pendant que vous étiez hors ligne
            </Text>
          </View>

          {/* Action Info */}
          <View style={styles.actionInfo}>
            <Text style={styles.actionLabel}>Action</Text>
            <Text style={styles.actionValue}>
              {action.type === 'CREATE' && 'Création'}
              {action.type === 'UPDATE' && 'Modification'}
              {action.type === 'DELETE' && 'Suppression'}
              {action.type === 'CUSTOM' && 'Action personnalisée'}
            </Text>
            <Text style={styles.actionTime}>
              Modifié le {formatDate(action.timestamp)}
            </Text>
          </View>

          {/* Comparison */}
          <View style={styles.comparisonContainer}>
            {/* Server Version */}
            <TouchableOpacity
              style={[
                styles.versionCard,
                selectedOption === 'server' && styles.selectedCard,
              ]}
              onPress={() => setSelectedOption('server')}
            >
              <View style={styles.versionHeader}>
                <MaterialCommunityIcons name="cloud" size={20} color="#2196F3" />
                <Text style={styles.versionTitle}>Version serveur</Text>
                {selectedOption === 'server' && (
                  <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
                )}
              </View>
              <View style={styles.versionContent}>
                <Text style={styles.versionText}>{renderValue(serverData)}</Text>
              </View>
            </TouchableOpacity>

            {/* Client Version */}
            <TouchableOpacity
              style={[
                styles.versionCard,
                selectedOption === 'client' && styles.selectedCard,
              ]}
              onPress={() => setSelectedOption('client')}
            >
              <View style={styles.versionHeader}>
                <MaterialCommunityIcons name="cellphone" size={20} color="#FF9800" />
                <Text style={styles.versionTitle}>Votre version</Text>
                {selectedOption === 'client' && (
                  <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
                )}
              </View>
              <View style={styles.versionContent}>
                <Text style={styles.versionText}>{renderValue(clientData)}</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onDismiss}>
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.resolveButton, !selectedOption && styles.resolveButtonDisabled]}
              onPress={handleResolve}
              disabled={!selectedOption}
            >
              <Text style={styles.resolveButtonText}>Résoudre</Text>
            </TouchableOpacity>
          </View>

          {/* Help Text */}
          <Text style={styles.helpText}>
            Sélectionnez la version à conserver. L'autre version sera perdue.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: colors.background.card,
    borderRadius: 16,
    width: '100%',
    maxHeight: '90%',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    marginTop: 12,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 8,
  },
  actionInfo: {
    backgroundColor: colors.background.paper,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  actionLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  actionValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: 4,
  },
  actionTime: {
    fontSize: 12,
    color: colors.text.muted,
    marginTop: 4,
  },
  comparisonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  versionCard: {
    flex: 1,
    backgroundColor: colors.background.paper,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  selectedCard: {
    borderColor: colors.status.success,
    backgroundColor: colors.feedback.successBg,
  },
  versionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.background.card,
    gap: 8,
  },
  versionTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  versionContent: {
    maxHeight: 150,
    padding: 12,
  },
  versionText: {
    fontSize: 13,
    color: colors.text.secondary,
    fontFamily: 'monospace',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    backgroundColor: colors.background.paper,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  resolveButton: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    backgroundColor: colors.status.info,
    alignItems: 'center',
  },
  resolveButtonDisabled: {
    backgroundColor: colors.text.disabled,
  },
  resolveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.inverse,
  },
  helpText: {
    fontSize: 12,
    color: colors.text.muted,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default ConflictResolver;
