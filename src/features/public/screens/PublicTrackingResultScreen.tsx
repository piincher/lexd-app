/**
 * PublicTrackingResultScreen
 * 
 * Displays tracking results for public (non-authenticated) users.
 * Shows timeline and current status of the tracked item.
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Share,
} from 'react-native';
import {
  Text,
  Surface,
  Button,
  Chip,
  useTheme,
  IconButton,
  Divider,
  ActivityIndicator,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

import { COLORS } from '@src/constants/Colors';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { PublicStackScreenProps } from '@src/navigation/types';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

// Status configuration
const STATUS_CONFIG: Record<string, { color: string; icon: string; label: string }> = {
  received: { color: '#6366F1', icon: 'package-variant', label: 'Reçu' },
  in_container: { color: '#3B82F6', icon: 'container', label: 'En Container' },
  shipped: { color: '#0EA5E9', icon: 'ship', label: 'Expédié' },
  in_transit: { color: '#F59E0B', icon: 'truck-fast', label: 'En Transit' },
  arrived: { color: '#10B981', icon: 'map-marker-check', label: 'Arrivé' },
  delivered: { color: '#059669', icon: 'check-circle', label: 'Livré' },
  pending: { color: '#6B7280', icon: 'clock-outline', label: 'En Attente' },
};

const getStatusConfig = (status: string) => {
  return STATUS_CONFIG[status] || { color: '#6B7280', icon: 'help-circle', label: status };
};

export const PublicTrackingResultScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<PublicStackScreenProps<'PublicTrackingResult'>['route']>();
  const theme = useTheme();
  
  const { trackingNumber, data } = route.params;
  const statusConfig = getStatusConfig(data.currentStatus || 'pending');

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Suivez mon envoi ChinaLink Express: ${trackingNumber}`,
        title: 'Suivi ChinaLink Express',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Surface style={styles.header} elevation={2}>
        <IconButton icon="arrow-left" onPress={handleBack} />
        <Text style={styles.headerTitle}>Résultat du Suivi</Text>
        <IconButton icon="share-variant" onPress={handleShare} />
      </Surface>

      <AnimatedScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Tracking Number Card */}
        <Animated.View entering={FadeInDown.duration(400)}>
          <Surface style={styles.trackingCard}>
            <Text style={styles.trackingLabel}>Numéro de Suivi</Text>
            <Text style={styles.trackingNumber}>{trackingNumber}</Text>
            <View style={styles.statusBadge}>
              <MaterialCommunityIcons
                name={statusConfig.icon as any}
                size={20}
                color={statusConfig.color}
              />
              <Text style={[styles.statusText, { color: statusConfig.color }]}>
                {statusConfig.label}
              </Text>
            </View>
          </Surface>
        </Animated.View>

        {/* Item Details */}
        <Animated.View entering={FadeInUp.delay(100).duration(400)}>
          <Surface style={styles.detailsCard}>
            <Text style={styles.sectionTitle}>Détails</Text>
            
            {data.type === 'goods' && (
              <>
                <DetailRow label="Description" value={data.data?.description} />
                <DetailRow label="Catégorie" value={data.data?.category} />
                <DetailRow label="Poids" value={`${data.data?.weightKg} kg`} />
                <DetailRow label="Volume" value={`${data.data?.cbm} CBM`} />
                <DetailRow label="Quantité" value={data.data?.quantity?.toString()} />
              </>
            )}

            {data.type === 'container' && (
              <>
                <DetailRow label="Numéro Container" value={data.data?.containerNumber} />
                <DetailRow label="Compagnie" value={data.data?.shippingLine} />
                <DetailRow label="Destination" value={data.data?.destination} />
              </>
            )}

            {data.estimatedDelivery && (
              <View style={styles.estimatedDelivery}>
                <MaterialCommunityIcons name="calendar-clock" size={20} color={COLORS.blue} />
                <View style={styles.estimatedDeliveryText}>
                  <Text style={styles.estimatedDeliveryLabel}>Livraison Estimée</Text>
                  <Text style={styles.estimatedDeliveryValue}>
                    {new Date(data.estimatedDelivery).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Text>
                </View>
              </View>
            )}
          </Surface>
        </Animated.View>

        {/* Timeline */}
        <Animated.View entering={FadeInUp.delay(200).duration(400)}>
          <Surface style={styles.timelineCard}>
            <Text style={styles.sectionTitle}>Historique</Text>
            
            {data.timeline && data.timeline.length > 0 ? (
              <View style={styles.timeline}>
                {data.timeline.map((event, index) => {
                  const isLast = index === data.timeline!.length - 1;
                  const eventStatus = getStatusConfig(event.status);
                  
                  return (
                    <View key={index} style={styles.timelineItem}>
                      <View style={styles.timelineLeft}>
                        <View style={[styles.timelineDot, { backgroundColor: eventStatus.color }]} />
                        {!isLast && <View style={styles.timelineLine} />}
                      </View>
                      <View style={styles.timelineContent}>
                        <View style={styles.timelineHeader}>
                          <Text style={styles.timelineStatus}>{eventStatus.label}</Text>
                          <Text style={styles.timelineDate}>
                            {new Date(event.timestamp).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </Text>
                        </View>
                        <Text style={styles.timelineLocation}>{event.location}</Text>
                        {event.description && (
                          <Text style={styles.timelineDescription}>{event.description}</Text>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View style={styles.emptyTimeline}>
                <MaterialCommunityIcons name="timeline-clock" size={48} color={Theme.neutral[300]} />
                <Text style={styles.emptyTimelineText}>Aucun historique disponible</Text>
              </View>
            )}
          </Surface>
        </Animated.View>

        {/* CTA Section */}
        <Animated.View entering={FadeInUp.delay(300).duration(400)}>
          <Surface style={styles.ctaCard}>
            <MaterialCommunityIcons name="account-circle" size={48} color={COLORS.blue} />
            <Text style={styles.ctaTitle}>Vous êtes le propriétaire ?</Text>
            <Text style={styles.ctaDescription}>
              Connectez-vous pour voir plus de détails et gérer vos marchandises
            </Text>
            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.ctaButton}
            >
              Se Connecter
            </Button>
          </Surface>
        </Animated.View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </AnimatedScrollView>
    </SafeAreaView>
  );
};

// Detail Row Component
const DetailRow: React.FC<{ label: string; value?: string }> = ({ label, value }) => {
  if (!value) return null;
  
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.sm,
    height: 56,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Theme.neutral[800],
  },
  scrollContent: {
    padding: Theme.spacing.lg,
  },
  
  // Tracking Card
  trackingCard: {
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    alignItems: 'center',
  },
  trackingLabel: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Theme.neutral[500],
  },
  trackingNumber: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Theme.neutral[800],
    marginTop: Theme.spacing.xs,
    marginBottom: Theme.spacing.md,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral[100],
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.radius.lg,
    gap: Theme.spacing.sm,
  },
  statusText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
  
  // Details Card
  detailsCard: {
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    marginTop: Theme.spacing.lg,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
  },
  detailLabel: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Theme.neutral[500],
  },
  detailValue: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Theme.neutral[800],
  },
  estimatedDelivery: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.blue}10`,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    marginTop: Theme.spacing.md,
  },
  estimatedDeliveryText: {
    marginLeft: Theme.spacing.md,
  },
  estimatedDeliveryLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Theme.neutral[500],
  },
  estimatedDeliveryValue: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: COLORS.blue,
  },
  
  // Timeline
  timelineCard: {
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    marginTop: Theme.spacing.lg,
  },
  timeline: {
    paddingTop: Theme.spacing.sm,
  },
  timelineItem: {
    flexDirection: 'row',
  },
  timelineLeft: {
    width: 24,
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: Theme.neutral[200],
    marginVertical: 4,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: Theme.spacing.md,
    paddingBottom: Theme.spacing.lg,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timelineStatus: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Theme.neutral[800],
  },
  timelineDate: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Theme.neutral[400],
  },
  timelineLocation: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: Theme.neutral[600],
    marginTop: 2,
  },
  timelineDescription: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 4,
  },
  emptyTimeline: {
    alignItems: 'center',
    paddingVertical: Theme.spacing.xl,
  },
  emptyTimelineText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Theme.neutral[400],
    marginTop: Theme.spacing.md,
  },
  
  // CTA Card
  ctaCard: {
    padding: Theme.spacing.xl,
    borderRadius: Theme.radius.xl,
    marginTop: Theme.spacing.lg,
    alignItems: 'center',
  },
  ctaTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Theme.neutral[800],
    marginTop: Theme.spacing.md,
  },
  ctaDescription: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Theme.neutral[500],
    textAlign: 'center',
    marginTop: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  ctaButton: {
    width: '100%',
  },
  
  // Bottom Spacing
  bottomSpacing: {
    height: Theme.spacing['4xl'],
  },
});

export default PublicTrackingResultScreen;
