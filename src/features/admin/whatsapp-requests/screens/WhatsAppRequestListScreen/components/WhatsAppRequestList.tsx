/**
 * WhatsAppRequestList - FlatList wrapper for requests
 */

import React from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
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
    <FlatList
      data={requests}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} tintColor={Theme.primary[500]} />
      }
      ListEmptyComponent={<WhatsAppRequestEmptyState selectedStatus={selectedStatus} />}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: Theme.spacing.xl,
    paddingBottom: 100,
  },
});

export default WhatsAppRequestList;
