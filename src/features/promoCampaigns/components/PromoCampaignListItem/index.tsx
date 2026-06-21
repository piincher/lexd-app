import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { PromoCampaignAdmin } from '../../api/promoCampaignAdminApi';
import { createStyles } from './PromoCampaignListItem.styles';

interface PromoCampaignListItemProps {
  campaign: PromoCampaignAdmin;
  onPress: (id?: string) => void;
}

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  ACTIVE: { bg: '#22C55E', text: '#FFFFFF' },
  SCHEDULED: { bg: '#3B82F6', text: '#FFFFFF' },
  PAUSED: { bg: '#F59E0B', text: '#FFFFFF' },
  EXPIRED: { bg: '#6B7280', text: '#FFFFFF' },
  ARCHIVED: { bg: '#374151', text: '#FFFFFF' },
  DRAFT: { bg: '#E5E7EB', text: '#111827' },
};

export const PromoCampaignListItem: React.FC<PromoCampaignListItemProps> = ({ campaign, onPress }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  const badgeColor = useMemo(
    () => STATUS_COLORS[campaign.effectiveStatus || campaign.status] || STATUS_COLORS.DRAFT,
    [campaign.effectiveStatus, campaign.status]
  );

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(campaign._id)} activeOpacity={0.7}>
      <View style={styles.row}>
        <Text style={styles.title}>{campaign.title}</Text>
        <View style={[styles.badge, { backgroundColor: badgeColor.bg }]}>
          <Text style={[styles.badgeText, { color: badgeColor.text }]}>
            {campaign.effectiveStatus || campaign.status}
          </Text>
        </View>
      </View>
      <Text style={styles.meta}>{campaign.campaignId}</Text>
      <Text style={styles.meta}>
        {campaign.slides.length} slide{campaign.slides.length > 1 ? 's' : ''}
      </Text>
      <Text style={styles.schedule}>
        {new Date(campaign.startDate).toLocaleDateString('fr-FR')} →{' '}
        {new Date(campaign.endDate).toLocaleDateString('fr-FR')}
      </Text>
    </TouchableOpacity>
  );
};
