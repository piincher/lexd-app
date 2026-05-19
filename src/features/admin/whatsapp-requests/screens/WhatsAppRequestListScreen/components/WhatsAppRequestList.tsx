/**
 * WhatsAppRequestList - FlashList wrapper for requests
 */

import React from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { WhatsAppRequest } from '../../../api/whatsappRequestApi';
import { WhatsAppRequestCard } from './WhatsAppRequestCard';
import { WhatsAppRequestEmptyState } from './WhatsAppRequestEmptyState';

interface WhatsAppRequestListProps {
  requests: WhatsAppRequest[];
  selectedStatus: string;
  isRefetching: boolean;
  isProcessing: boolean;
  isCompleting: boolean;
  isGeneratingPdf: boolean;
  onRefresh: () => void;
  onProcess: (request: WhatsAppRequest) => void;
  onGeneratePdf: (request: WhatsAppRequest) => void;
  onComplete: (request: WhatsAppRequest) => void;
  onCall: (phoneNumber: string) => void;
  onWhatsApp: (phoneNumber: string) => void;
}

export const WhatsAppRequestList: React.FC<WhatsAppRequestListProps> = ({
  requests,
  selectedStatus,
  isRefetching,
  isProcessing,
  isCompleting,
  isGeneratingPdf,
  onRefresh,
  onProcess,
  onGeneratePdf,
  onComplete,
  onCall,
  onWhatsApp,
}) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const keyExtractor = (item: WhatsAppRequest) => item._id;

  const renderItem = ({ item }: { item: WhatsAppRequest }) => (
    <WhatsAppRequestCard
      request={item}
      isProcessing={isProcessing}
      isCompleting={isCompleting}
      isGeneratingPdf={isGeneratingPdf}
      onProcess={onProcess}
      onGeneratePdf={onGeneratePdf}
      onComplete={onComplete}
      onCall={onCall}
      onWhatsApp={onWhatsApp}
    />
  );

  return (
    <FlashList
      data={requests}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} tintColor={colors.primary[500]} />
      }
      ListEmptyComponent={<WhatsAppRequestEmptyState selectedStatus={selectedStatus} />}
    />
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  listContent: {
    padding: 24,
    paddingBottom: 100,
  },
});

export default WhatsAppRequestList;
