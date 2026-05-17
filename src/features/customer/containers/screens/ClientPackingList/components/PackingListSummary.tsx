/**
 * PackingListSummary - Container summary card
 */

import React from 'react';
import { Card } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { SummaryHeader } from './SummaryHeader';
import { SummaryModeRow } from './SummaryModeRow';
import { SummaryTotals } from './SummaryTotals';
import { SummarySchedule } from './SummarySchedule';
import { SummarySignature } from './SummarySignature';
import { styles } from './PackingListSummary.styles';

import { MaterialCommunityIcons } from '@expo/vector-icons';

type StatusColor = { bg: string; text: string; icon: string };
type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface PackingListSummaryProps {
  containerNumber?: string;
  shippingMode?: 'AIR' | 'SEA';
  status?: string;
  totalCBM?: number;
  totalWeight?: number;
  totalPackages?: number;
  departureDate?: string;
  arrivalDate?: string;
  loadDate?: string | null;
  dakarPortArrivalAt?: string | null;
  signature?: {
    signed?: boolean;
    signedBy?: string;
    signerName?: string;
    signerRole?: string;
    signedAt?: string;
    signatureLabel?: string;
  };
  getShippingModeIcon: (mode: string) => MaterialIconName;
  getStatusColor: (status: string) => StatusColor | string;
  formatDate: (date?: string) => string;
  formatDateTime?: (date?: string | null) => string;
}

const isStatusColor = (value: StatusColor | string | null): value is StatusColor =>
  !!value && typeof value === 'object';

export const PackingListSummary: React.FC<PackingListSummaryProps> = ({
  containerNumber,
  shippingMode,
  status,
  totalCBM,
  totalWeight,
  totalPackages,
  departureDate,
  arrivalDate,
  loadDate,
  dakarPortArrivalAt,
  signature,
  getShippingModeIcon,
  getStatusColor,
  formatDate,
  formatDateTime,
}) => {
  const { colors } = useAppTheme();
  const rawStatusColor = status ? getStatusColor(status) : null;
  const statusColorObj = isStatusColor(rawStatusColor) ? rawStatusColor : null;
  const statusBg = statusColorObj?.bg || colors.background.paper;
  const statusText = statusColorObj?.text || (typeof rawStatusColor === 'string' ? rawStatusColor : colors.text.secondary);

  return (
    <Card style={styles.card}>
      <Card.Content>
        <SummaryHeader
          containerNumber={containerNumber}
          status={status}
          statusBg={statusBg}
          statusTextColor={statusText}
        />
        <SummaryModeRow
          shippingMode={shippingMode}
          getShippingModeIcon={getShippingModeIcon}
        />
        <SummaryTotals
          totalCBM={totalCBM}
          totalWeight={totalWeight}
          totalPackages={totalPackages}
        />
        <SummarySchedule
          loadDate={loadDate}
          departureDate={departureDate}
          dakarPortArrivalAt={dakarPortArrivalAt}
          arrivalDate={arrivalDate}
          formatDate={formatDate}
          formatDateTime={formatDateTime}
        />
        <SummarySignature
          signature={signature}
          formatDate={formatDate}
          formatDateTime={formatDateTime}
        />
      </Card.Content>
    </Card>
  );
};

export default PackingListSummary;
