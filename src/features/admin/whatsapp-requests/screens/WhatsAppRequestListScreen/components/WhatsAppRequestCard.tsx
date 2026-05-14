/**
 * WhatsAppRequestCard - Individual request card with all actions
 */

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { WhatsAppRequest } from '../../../api/whatsappRequestApi';
import { WhatsAppRequestCardHeader } from '../../../components/WhatsAppRequestCardHeader';
import { WhatsAppRequestCardCustomer } from '../../../components/WhatsAppRequestCardCustomer';
import { WhatsAppRequestCardType } from '../../../components/WhatsAppRequestCardType';
import { WhatsAppRequestCardSearchResults } from '../../../components/WhatsAppRequestCardSearchResults';
import { WhatsAppRequestCardActions } from '../../../components/WhatsAppRequestCardActions';

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
  const { colors } = useAppTheme();
  return (
    <TouchableOpacity style={styles.card} onPress={() => onProcess(request)} activeOpacity={0.8}>
      <LinearGradient colors={[colors.background.card, colors.background.paper]} style={styles.cardGradient}>
        <WhatsAppRequestCardHeader
          requestId={request.requestId}
          status={request.status}
          requestedAt={request.requestedAt}
        />
        <WhatsAppRequestCardCustomer
          customerId={request.customerId}
          customerPhone={request.customerPhone}
          onCall={onCall}
        />
        <WhatsAppRequestCardType
          requestType={request.requestType}
          goodsId={request.goodsId}
        />
        <WhatsAppRequestCardSearchResults
          searchResults={request.searchResults}
        />
        <WhatsAppRequestCardActions
          status={request.status}
          isProcessing={isProcessing}
          isCompleting={isCompleting}
          isGeneratingPdf={isGeneratingPdf}
          pdfUrl={request.pdfUrl}
          onProcess={() => onProcess(request)}
          onGeneratePdf={() => onGeneratePdf(request)}
          onComplete={() => onComplete(request)}
          onWhatsApp={() => onWhatsApp(request.customerPhone)}
        />
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
});

export default WhatsAppRequestCard;
