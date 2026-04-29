import React, { useState } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { productType } from '@src/api/order';
import { LOGISTICS_COLORS } from '../pastOrderConstants';
import { createStyles } from './PastOrderCard.styles';
import { PastOrderCardDetails } from './PastOrderCardDetails';

const windowWidth = Dimensions.get('window').width;

const getStatusColor = (status: string) =>
  ({ Pending: LOGISTICS_COLORS.warning, 'In Transit': LOGISTICS_COLORS.accent, Completed: LOGISTICS_COLORS.success, Cancelled: LOGISTICS_COLORS.error } as Record<string, string>)[status] || LOGISTICS_COLORS.gray[600];

const getStatusText = (status: string) =>
  ({ Pending: 'En attente', 'In Transit': 'En transit', Inactive: 'Livré' } as Record<string, string>)[status];

interface PastOrderCardProps {
  item: productType;
}

export const PastOrderCard: React.FC<PastOrderCardProps> = ({ item }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [status] = useState(item.status);
  const styles = createStyles();

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    setSnackbarVisible(true);
    setTimeout(() => setSnackbarVisible(false), 3000);
  };

  const statusColor = getStatusColor(status);
  const statusText = getStatusText(status);

  return (
    <View style={styles.card}>
      {snackbarVisible && (
        <View style={styles.snackbar}>
          <Ionicons name="checkmark-circle" size={20} color={LOGISTICS_COLORS.success} />
          <Text style={styles.snackbarText}>Code copié dans le presse-papiers</Text>
        </View>
      )}

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: `${100 * (item?.images?.length ?? 0)}%` }}
        onMomentumScrollEnd={(event) => {
          const offset = event.nativeEvent.contentOffset.x;
          setCurrentImageIndex(Math.floor(offset / windowWidth));
        }}
      >
        {item?.images?.map((image, index) => (
          <View style={styles.imageContainer} key={index}>
            <Image
              source={{ uri: image?.url || 'https://placehold.co/600x400/DEE2E6/6C757D?text=No+Image' }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ))}
      </ScrollView>

      <View style={styles.cardContent}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.clientName}>{item.clientName}</Text>
            <View style={styles.statusBadge}>
              <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
              <Text style={styles.statusText}>{statusText}</Text>
            </View>
          </View>
          <Text style={styles.trackingCode}>#{item.code}</Text>
        </View>

        <PastOrderCardDetails item={item} isExpanded={isExpanded} />

        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => copyToClipboard(item.code!)} style={styles.copyButton}>
            <Ionicons name="copy-outline" size={20} color="#FFFFFF" />
            <Text style={styles.copyButtonText}>Copier le code</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={styles.expandButton}>
            <Text style={styles.expandButtonText}>
              {isExpanded ? 'Réduire' : 'Voir plus'}
            </Text>
            <Ionicons
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={LOGISTICS_COLORS.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PastOrderCard;
