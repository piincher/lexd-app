import React, { useCallback, useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  Text,
  View,
  Image,
  SafeAreaView,
  Linking,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { PromoCampaign, PromoCampaignEventType, PromoCampaignSlide } from '../../types';
import { createStyles } from './PromoCampaignModal.styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PromoCampaignModalProps {
  campaign: PromoCampaign;
  visible: boolean;
  onClose: () => void;
  onEvent: (campaignId: string, eventType: PromoCampaignEventType, slideIndex?: number) => void;
  onNavigate: (deepLink: string) => void;
}

export const PromoCampaignModal: React.FC<PromoCampaignModalProps> = ({
  campaign,
  visible,
  onClose,
  onEvent,
  onNavigate,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors, campaign.backgroundColor, campaign.textColor);
  const swiperRef = useRef<SwiperFlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClose = useCallback(() => {
    onEvent(campaign.id, 'dismiss', currentIndex);
    onClose();
  }, [campaign.id, currentIndex, onClose, onEvent]);

  const handleCta = useCallback(
    (slide?: PromoCampaignSlide) => {
      const action = slide?.ctaAction || campaign.primaryCtaAction;
      const target = slide?.ctaTarget || campaign.primaryCtaTarget;
      const text = slide?.ctaText || campaign.primaryCtaText;

      onEvent(campaign.id, 'click', currentIndex);

      if (action === 'DISMISS' || !target) {
        onClose();
        return;
      }

      if (action === 'EXTERNAL_URL') {
        Linking.openURL(target).catch(() => {
          // Ignore unsupported URLs.
        });
        return;
      }

      if (action === 'DEEP_LINK') {
        onNavigate(target);
      }
    },
    [campaign, currentIndex, onClose, onEvent, onNavigate]
  );

  const renderSlide = ({ item }: { item: PromoCampaignSlide }) => (
    <View style={styles.slide}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      </View>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            {item.title ? <Text style={styles.title}>{item.title}</Text> : null}
            {item.body ? <Text style={styles.body}>{item.body}</Text> : null}
          </View>
          <View style={styles.ctaContainer}>
            <View style={styles.paginationContainer}>
              {campaign.slides.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    index === currentIndex ? styles.paginationActive : styles.paginationInactive,
                  ]}
                />
              ))}
            </View>
            {item.ctaText ? (
              <Pressable style={styles.primaryButton} onPress={() => handleCta(item)}>
                <Text style={styles.primaryButtonText}>{item.ctaText}</Text>
              </Pressable>
            ) : null}
            <Pressable style={styles.secondaryButton} onPress={handleClose}>
              <Text style={styles.secondaryButtonText}>Fermer</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );

  return (
    <Modal visible={visible} animationType="fade" statusBarTranslucent onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.closeButton} onPress={handleClose} accessibilityLabel="Fermer">
          <Ionicons name="close" size={24} color={campaign.textColor || colors.text.primary} />
        </Pressable>
        <SwiperFlatList
          ref={swiperRef}
          index={0}
          data={campaign.slides}
          renderItem={renderSlide}
          onChangeIndex={({ index }) => setCurrentIndex(index)}
          showPagination={false}
        />
      </View>
    </Modal>
  );
};
