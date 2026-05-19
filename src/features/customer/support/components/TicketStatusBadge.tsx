/**
 * Ticket Status Badge Component
 * Color-coded badge for ticket status
 */

import React from 'react';
import { Chip, useTheme } from 'react-native-paper';
import { TicketStatus, TICKET_STATUS_LABELS, TICKET_STATUS_COLORS } from '../types';

interface TicketStatusBadgeProps {
  status: TicketStatus;
  size?: 'small' | 'medium';
}

export const TicketStatusBadge: React.FC<TicketStatusBadgeProps> = ({
  status,
  size = 'small',
}) => {
  const theme = useTheme();
  const label = TICKET_STATUS_LABELS[status];
  const textColor = TICKET_STATUS_COLORS[status];
  const bgColor = textColor + '15';

  return (
    <Chip
      style={{
        backgroundColor: bgColor,
        height: size === 'small' ? 28 : 32,
      }}
      textStyle={{
        color: textColor,
        fontSize: size === 'small' ? 11 : 12,
      }}
      compact={size === 'small'}
    >
      {label}
    </Chip>
  );
};

export default TicketStatusBadge;
