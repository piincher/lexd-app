import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { formatDateTime } from '@src/shared/lib/formatters';
import type { LabelPrintJobSummary } from '@src/entities/goodsPackage';
import type { PrintJobAction } from '../hooks/usePrinterManagement';
import { styles } from './styles';

interface Props {
  jobs: LabelPrintJobSummary[];
  pendingJobId?: string;
  onAction: (job: LabelPrintJobSummary, action: PrintJobAction) => void;
}

const labels: Record<LabelPrintJobSummary['status'], string> = {
  QUEUED: 'EN FILE', READY: 'PRÊT', SENDING: 'ENVOI INCERTAIN', PRINTED: 'IMPRIMÉ', FAILED: 'ÉCHEC', CANCELLED: 'ANNULÉ',
};

export const PrintJobHistory: React.FC<Props> = ({ jobs, pendingJobId, onAction }) => {
  const { colors } = useAppTheme();
  return <View style={styles.historySection}>
    <View><Text style={[styles.historyTitle, { color: colors.text.primary }]}>Travaux d’impression récents</Text><Text style={[styles.historyHelp, { color: colors.text.secondary }]}>Les envois incertains doivent être vérifiés sur l’imprimante avant confirmation.</Text></View>
    {!jobs.length ? <Text style={[styles.emptyText, { color: colors.text.secondary }]}>Aucun travail récent.</Text> : null}
    {jobs.map((job) => {
      const pending = pendingJobId === job.jobId;
      return <View key={job.jobId} style={[styles.jobCard, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
        <View style={styles.jobHeader}><View style={styles.cardTitleWrap}><Text style={[styles.jobCode, { color: colors.text.primary }]}>{job.labelIds.length} étiquette(s) · {job.printerId?.name || 'Imprimante supprimée'}</Text><Text style={[styles.jobMeta, { color: colors.text.secondary }]}>{job.createdAt ? formatDateTime(job.createdAt) : ''} · {job.attempts} tentative(s)</Text></View><Text style={[styles.jobStatus, { color: job.status === 'FAILED' ? colors.status.error : colors.primary.main }]}>{labels[job.status]}</Text></View>
        {job.lastError?.message ? <Text style={[styles.jobError, { color: colors.status.error }]}>{job.lastError.message}</Text> : null}
        {job.status === 'SENDING' ? <View style={styles.jobActions}><Button compact loading={pending} disabled={pending} onPress={() => onAction(job, 'CONFIRM_PRINTED')}>Confirmer imprimé</Button><Button compact disabled={pending} textColor={colors.status.error} onPress={() => onAction(job, 'MARK_FAILED')}>Non imprimé</Button></View> : null}
        {job.status === 'FAILED' || job.status === 'READY' ? <View style={styles.jobActions}><Button compact mode="contained-tonal" loading={pending} disabled={pending} icon="printer" onPress={() => onAction(job, 'RETRY')}>Envoyer</Button><Button compact disabled={pending} onPress={() => onAction(job, 'CANCEL')}>Annuler</Button></View> : null}
      </View>;
    })}
  </View>;
};
