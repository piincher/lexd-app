import React from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { WhatsAppRequest } from '@src/features/admin/whatsapp-requests/api/whatsappRequestApi';
import { RequestCard } from './RequestCard';
import { EmptyState } from './EmptyState';

interface RequestListProps {
  requests: WhatsAppRequest[];
  selectedStatus: 'all' | import('../../api/whatsappRequestApi').WhatsAppRequestStatus;
  isRefetching: boolean;
  onRefresh: () => void;
  onProcessRequest: (request: WhatsAppRequest) => void;
  onGeneratePdf: (request: WhatsAppRequest) => void;
  onCompleteRequest: (request: WhatsAppRequest) => void;
  onCallCustomer: (phoneNumber: string) => void;
  onWhatsAppCustomer: (phoneNumber: string) => void;
  isProcessing: boolean;
  isGeneratingPdf: boolean;
  isCompleting: boolean;
}

export const RequestList: React.FC<RequestListProps> = ({
  requests,
  selectedStatus,
  isRefetching,
  onRefresh,
  onProcessRequest,
  onGeneratePdf,
  onCompleteRequest,
  onCallCustomer,
  onWhatsAppCustomer,
  isProcessing,
  isGeneratingPdf,
  isCompleting,
}) => {
  return (
    <FlatList
      data={requests}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <RequestCard
          request={item}
          onProcess={onProcessRequest}
          onGeneratePdf={onGeneratePdf}
          onComplete={onCompleteRequest}
          onCall={onCallCustomer}
          onWhatsApp={onWhatsAppCustomer}
          isProcessing={isProcessing}
          isGeneratingPdf={isGeneratingPdf}
          isCompleting={isCompleting}
        />
      )}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={onRefresh}
          tintColor={Theme.primary[500]}
        />
      }
      ListEmptyComponent={<EmptyState selectedStatus={selectedStatus} />}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: Theme.spacing.xl,
    paddingBottom: 100,
  },
});
