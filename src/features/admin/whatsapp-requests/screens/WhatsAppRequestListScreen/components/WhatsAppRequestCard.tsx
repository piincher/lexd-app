/**
 * WhatsAppRequestCard - Individual request card with all actions
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Chip, Button } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { WhatsAppRequest, WhatsAppRequestStatus } from '../../../api/whatsappRequestApi';
import { TYPE_LABELS, STATUS_LABELS } from '../constants';

interface WhatsAppRequestCardProps {
  request: WhatsAppRequest;
  isProcessing: boolean;
  isCompleting: boolean;
  isGeneratingPdf: boolean;
  onProcess: (request: WhatsAppRequest) => void;
  onGeneratePdf: (request: WhatsAppRequest) => void;
  onComplete: (request: WhatsAppRequest) => void;
  onCall: (phoneNumber: string) => void;
  onWhatsApp: (phoneNumber: string) => void;
}

const getStatusColor = (status: WhatsAppRequestStatus): string => {
  switch (status) {
    case 'PENDING':
      return '#F59E0B';
    case 'PROCESSING':
      return '#3B82F6';
    case 'COMPLETED':
      return '#10B981';
    case 'FAILED':
      return '#EF4444';
    default:
      return Theme.neutral[400];
  }
};

export const WhatsAppRequestCard: React.FC<WhatsAppRequestCardProps> = ({
  request,
  isProcessing,
  isCompleting,
  isGeneratingPdf,
  onProcess,
  onGeneratePdf,
  onComplete,
  onCall,
  onWhatsApp,
}) => {
  const customerName = request.customerId
    ? `${request.customerId.firstName || ''} ${request.customerId.lastName || ''}`.trim()
    : 'Client inconnu';

  const statusColor = getStatusColor(request.status);
  const isMutating = isProcessing || isCompleting;

  return (
    <TouchableOpacity style={styles.card} onPress={() => onProcess(request)} activeOpacity={0.8}>
      <LinearGradient colors={['#FFFFFF', '#FAFAFA']} style={styles.cardGradient}>
        {/* Header */}
        <View style={styles.cardHeader}>
          <View style={styles.requestIdContainer}>
            <Text style={styles.requestId}>{request.requestId}</Text>
            <Chip
              style={[styles.statusChip, { backgroundColor: `${statusColor}20` }]}
              textStyle={{ color: statusColor, fontSize: 11, fontWeight: '700' }}
            >
              {STATUS_LABELS[request.status]}
            </Chip>
          </View>
          <Text style={styles.timestamp}>
            {new Date(request.requestedAt).toLocaleString('fr-FR', {
              day: '2-digit',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>

        {/* Customer Info */}
        <View style={styles.customerSection}>
          <View style={styles.customerIcon}>
            <Ionicons name="person-circle" size={40} color={Theme.primary[500]} />
          </View>
          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>{customerName}</Text>
            <TouchableOpacity onPress={() => onCall(request.customerPhone)} style={styles.phoneContainer}>
              <Ionicons name="call" size={14} color={Theme.primary[600]} />
              <Text style={styles.customerPhone}>{request.customerPhone}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Request Type */}
        <View style={styles.typeSection}>
          <Chip
            style={styles.typeChip}
            icon={() => <Ionicons name="document-text" size={14} color={Theme.primary[600]} />}
          >
            {TYPE_LABELS[request.requestType]}
          </Chip>
          {request.goodsId && (
            <Chip style={styles.goodsChip} textStyle={{ fontSize: 11 }}>
              {request.goodsId}
            </Chip>
          )}
        </View>

        {/* Search Results Preview */}
        {request.searchResults && (
          <View style={styles.searchResults}>
            <View style={styles.resultItem}>
              <Ionicons name="cube" size={16} color={Theme.neutral[500]} />
              <Text style={styles.resultText}>{request.searchResults.goodsFound.length} marchandise(s)</Text>
            </View>
            <View style={styles.resultItem}>
              <Ionicons name="container" size={16} color={Theme.neutral[500]} />
              <Text style={styles.resultText}>{request.searchResults.containersFound.length} container(s)</Text>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        {request.status === 'PENDING' && (
          <View style={styles.actionButtons}>
            <Button
              mode="contained"
              onPress={() => onProcess(request)}
              loading={isMutating}
              disabled={isMutating}
              style={styles.processButton}
              buttonColor={Theme.primary[600]}
            >
              Traiter
            </Button>
            <Button
              mode="outlined"
              onPress={() => onWhatsApp(request.customerPhone)}
              style={styles.whatsappButton}
              textColor="#25D366"
            >
              WhatsApp
            </Button>
          </View>
        )}

        {request.status === 'PROCESSING' && (
          <View style={styles.actionButtons}>
            <Button
              mode="contained"
              onPress={() => onGeneratePdf(request)}
              loading={isGeneratingPdf}
              style={styles.pdfButton}
              buttonColor="#6366F1"
              icon="file-pdf-box"
            >
              Générer PDF
            </Button>
            <Button
              mode="contained"
              onPress={() => onComplete(request)}
              loading={isCompleting}
              style={styles.completeButton}
              buttonColor="#10B981"
            >
              Terminer
            </Button>
          </View>
        )}

        {request.status === 'COMPLETED' && request.pdfUrl && (
          <View style={styles.completedBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#10B981" />
            <Text style={styles.completedText}>PDF envoyé</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    ...Theme.shadows.md,
  },
  cardGradient: {
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.md,
  },
  requestIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  requestId: {
    fontSize: 16,
    fontWeight: '800',
    color: Theme.neutral[800],
  },
  statusChip: {
    height: 24,
  },
  timestamp: {
    fontSize: 12,
    color: Theme.neutral[400],
  },
  customerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  customerIcon: {
    marginRight: Theme.spacing.md,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  customerPhone: {
    fontSize: 14,
    color: Theme.primary[600],
    marginLeft: 4,
  },
  typeSection: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  typeChip: {
    backgroundColor: Theme.primary[50],
  },
  goodsChip: {
    backgroundColor: Theme.neutral[100],
  },
  searchResults: {
    flexDirection: 'row',
    gap: Theme.spacing.lg,
    padding: Theme.spacing.md,
    backgroundColor: Theme.neutral[50],
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.md,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resultText: {
    fontSize: 13,
    color: Theme.neutral[600],
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  processButton: {
    flex: 1,
    borderRadius: Theme.radius.lg,
  },
  whatsappButton: {
    flex: 1,
    borderRadius: Theme.radius.lg,
    borderColor: '#25D366',
  },
  pdfButton: {
    flex: 1,
    borderRadius: Theme.radius.lg,
  },
  completeButton: {
    flex: 1,
    borderRadius: Theme.radius.lg,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    padding: Theme.spacing.md,
    backgroundColor: '#D1FAE5',
    borderRadius: Theme.radius.lg,
  },
  completedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
});

export default WhatsAppRequestCard;
