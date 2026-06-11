import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { formatDateLong } from '@src/shared/lib/formatters';
import { useActiveEvent } from '../hooks/useActiveEvent';
import { useCountdown } from '../hooks/useCountdown';
import { laneHeadline, feePromoLabel } from '../lib/eventCopy';
import { CountdownDigits } from './CountdownDigits';
import { getBannerStyles } from './EventCountdownBanner.styles';

interface EventCountdownBannerProps {
  /** ISO country code to scope the active event (e.g. "ML"). */
  region?: string;
  onPress?: (eventSlug: string) => void;
}

/**
 * Home-screen takeover banner for the active event. Shows the most urgent open
 * shipping lane with a live ship-by countdown. Renders nothing when no event is
 * live or every lane has passed its cutoff.
 */
export const EventCountdownBanner: React.FC<EventCountdownBannerProps> = ({ region, onPress }) => {
  const { colors } = useAppTheme();
  const { event, featuredLane } = useActiveEvent(region);
  const countdown = useCountdown(featuredLane?.cutoffDate ?? null);

  if (!event || !featuredLane || !countdown || countdown.isExpired) return null;

  const styles = getBannerStyles();
  const primary = event.theme.primaryColor || colors.primary.dark;
  const accent = event.theme.accentColor || colors.primary.main;
  const isUrgent = featuredLane.state === 'urgency';
  const promo = feePromoLabel(featuredLane.feePromo);

  return (
    <Pressable
      style={styles.wrapper}
      onPress={onPress ? () => onPress(event.slug) : undefined}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`${event.name} — ${laneHeadline(featuredLane)}`}
    >
      <LinearGradient
        colors={[primary, accent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.headerRow}>
          {!!event.theme.icon && <Text style={styles.icon}>{event.theme.icon}</Text>}
          <View style={styles.titleBlock}>
            <Text style={styles.eventName} numberOfLines={1}>
              {event.name}
            </Text>
            <Text style={styles.headline} numberOfLines={1}>
              {laneHeadline(featuredLane)}
            </Text>
          </View>
          {isUrgent && (
            <View style={styles.urgencyPill}>
              <Text style={styles.urgencyPillText}>URGENT</Text>
            </View>
          )}
        </View>

        <CountdownDigits countdown={countdown} tint={primary} />

        <Text style={styles.cutoffText}>
          Date limite : {formatDateLong(featuredLane.cutoffDate)}
        </Text>

        <View style={styles.metaRow}>
          {!!promo && (
            <View style={styles.chip}>
              <Text style={styles.chipText}>{promo}</Text>
            </View>
          )}
          {featuredLane.guaranteedDelivery && (
            <View style={styles.chip}>
              <Text style={styles.chipText}>✓ Livraison garantie</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </Pressable>
  );
};
