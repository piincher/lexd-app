/**
 * WhatsAppRequestCard - Individual request card with actions
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Badge, Button, Card } from '@src/shared/ui';
import { Theme } from '@src/constants/Theme';

export interface WhatsAppRequest { id: string; phoneNumber: string; message: string; status: 'pending' | 'approved' | 'rejected'; createdAt: string; customerName?: string; }

interface WhatsAppRequestCardProps { request: WhatsAppRequest; onApprove: (id: string) => void; onReject: (id: string) => void; onView: (id: string) => void; isApproving?: boolean; isRejecting?: boolean; }

const STATUS_CONFIG: Record<WhatsAppRequest['status'], { label: string; variant: 'warning' | 'success' | 'error' }> = {
  pending: { label: 'En attente', variant: 'warning' }, approved: { label: 'Approuvé', variant: 'success' }, rejected: { label: 'Rejeté', variant: 'error' },
};

const truncate = (msg: string, max = 80) => msg.length <= max ? msg : msg.substring(0, max).trim() + '...';
const formatDate = (date: string) => new Date(date).toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });

export const WhatsAppRequestCard: React.FC<WhatsAppRequestCardProps> = ({ request, onApprove, onReject, onView, isApproving, isRejecting }) => {
  const status = STATUS_CONFIG[request.status];
  const displayName = request.customerName || request.phoneNumber;
  const isPending = request.status === 'pending';
  const isLoading = isApproving || isRejecting;
  const colors = Theme.lightTheme.colors;

  return (
    <Card variant="elevated" style={s.container}>
      <TouchableOpacity onPress={() => onView(request.id)} activeOpacity={0.9}>
        <View style={s.header}>
          <View style={s.customer}>
            <Ionicons name="person-circle" size={36} color={colors.primary[500]} />
            <View style={s.nameWrap}>
              <Text style={s.name}>{displayName}</Text>
              {request.customerName && <Text style={s.phone}>{request.phoneNumber}</Text>}
            </View>
          </View>
          <Badge label={status.label} variant={status.variant} size="small" />
        </View>
        <View style={s.messageBox}>
          <Ionicons name="chatbubble-outline" size={14} color={colors.neutral[400]} />
          <Text style={s.message} numberOfLines={2}>{truncate(request.message)}</Text>
        </View>
        <Text style={s.time}>{formatDate(request.createdAt)}</Text>
      </TouchableOpacity>
      {isPending && (
        <View style={s.actions}>
          <Button variant="outline" size="small" onPress={() => onReject(request.id)} loading={isRejecting} disabled={isLoading} style={s.btn}>Rejeter</Button>
          <Button variant="primary" size="small" onPress={() => onApprove(request.id)} loading={isApproving} disabled={isLoading} style={s.approve}>Approuver</Button>
        </View>
      )}
    </Card>
  );
};

const s = StyleSheet.create({
  container: { marginHorizontal: Theme.spacing.lg, marginVertical: Theme.spacing.sm, padding: Theme.spacing.lg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Theme.spacing.md },
  customer: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: Theme.spacing.sm },
  nameWrap: { marginLeft: Theme.spacing.sm, flex: 1 },
  name: { fontSize: 16, fontWeight: '700', color: Theme.lightTheme.colors.neutral[800] },
  phone: { fontSize: 13, color: Theme.lightTheme.colors.neutral[500], marginTop: 2 },
  messageBox: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: Theme.lightTheme.colors.neutral[50], borderRadius: Theme.spacing.md, padding: Theme.spacing.md, marginBottom: Theme.spacing.sm },
  message: { fontSize: 14, color: Theme.lightTheme.colors.neutral[600], marginLeft: Theme.spacing.sm, flex: 1, lineHeight: 20 },
  time: { fontSize: 12, color: Theme.lightTheme.colors.neutral[400], textAlign: 'right' },
  actions: { flexDirection: 'row', gap: Theme.spacing.md, marginTop: Theme.spacing.md, paddingTop: Theme.spacing.md, borderTopWidth: 1, borderTopColor: Theme.lightTheme.colors.neutral[100] },
  btn: { flex: 1, borderColor: Theme.lightTheme.colors.status.error },
  approve: { flex: 1, backgroundColor: Theme.lightTheme.colors.status.success },
});

export default WhatsAppRequestCard;
