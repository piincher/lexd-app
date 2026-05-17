/**
 * PhotoGallery - Shared photo strip with full-screen viewer
 * Pure UI - no business logic
 */

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';

const { width: W, height: H } = Dimensions.get('window');

export interface PhotoGalleryProps {
  photoUrls?: string[] | string;
  imageHeight?: number;
  showCounter?: boolean;
  editable?: boolean;
  onAddPhoto?: () => void;
  emptyLabel?: string;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photoUrls = [], imageHeight = 120, showCounter = true, editable = false, onAddPhoto, emptyLabel = 'Aucune photo',
}) => {
  const { colors } = useAppTheme();
  const [visible, setVisible] = useState(false);
  const [idx, setIdx] = useState(0);
  const fade = useSharedValue(0);

  // Defensively coerce to array - handles corrupted string data from backend
  const safePhotoUrls = Array.isArray(photoUrls)
    ? photoUrls.filter((url): url is string => typeof url === 'string' && url.length > 0)
    : typeof photoUrls === 'string' && photoUrls.length > 0
      ? [photoUrls]
      : [];

  const open = useCallback((i: number) => { setIdx(i); setVisible(true); fade.value = withTiming(1, { duration: 250 }); }, [fade]);
  const close = useCallback(() => {
    fade.value = withTiming(0, { duration: 200 }, (finished) => {
      if (finished) runOnJS(setVisible)(false);
    });
    // Fallback: ensure modal closes even if animation callback fails
    setTimeout(() => setVisible(false), 300);
  }, [fade]);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: fade.value }));
  const go = (d: number) => { const n = idx + d; if (n >= 0 && n < safePhotoUrls.length) setIdx(n); };

  if (!safePhotoUrls.length) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={editable ? onAddPhoto : undefined} style={[s.empty, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
        <Ionicons name="images-outline" size={40} color={colors.text.disabled} />
        <Text style={[s.emptyText, { color: colors.text.secondary }]}>{emptyLabel}</Text>
        {editable && onAddPhoto && <Ionicons name="add-circle" size={28} color={colors.primary.main} />}
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.strip}>
        {safePhotoUrls.map((url, i) => (
          <TouchableOpacity key={`${url}_${i}`} activeOpacity={0.9} onPress={() => open(i)} style={s.wrap}>
            <Image source={{ uri: url }} style={[s.photo, { height: imageHeight }]} resizeMode="cover" />
            {showCounter && safePhotoUrls.length > 1 && (
              <View style={[s.badge, { backgroundColor: colors.background.overlay }]}><Text style={[s.badgeText, { color: colors.text.inverse }]}>{i + 1} / {safePhotoUrls.length}</Text></View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={visible} transparent animationType="none">
        <Animated.View style={[s.backdrop, animatedStyle]}>
          <TouchableOpacity activeOpacity={1} style={StyleSheet.absoluteFillObject} onPress={close} />
          <View style={s.header} pointerEvents="box-none">
            <Text style={[s.headerText, { color: colors.text.inverse }]}>{idx + 1} / {safePhotoUrls.length}</Text>
            <View pointerEvents="auto">
              <TouchableOpacity onPress={close} style={s.closeBtn} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
                <Ionicons name="close" size={28} color={colors.text.inverse} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={s.navRow} pointerEvents="box-none">
            {idx > 0 && (
              <View pointerEvents="auto">
                <TouchableOpacity onPress={() => go(-1)} style={s.chevron} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                  <Ionicons name="chevron-back" size={36} color={colors.text.inverse} />
                </TouchableOpacity>
              </View>
            )}
            <View style={{ flex: 1 }} />
            {idx < safePhotoUrls.length - 1 && (
              <View pointerEvents="auto">
                <TouchableOpacity onPress={() => go(1)} style={s.chevron} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                  <Ionicons name="chevron-forward" size={36} color={colors.text.inverse} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentOffset={{ x: idx * W, y: 0 }}
            onMomentumScrollEnd={(e) => setIdx(Math.round(e.nativeEvent.contentOffset.x / W))} style={s.viewerPager} contentContainerStyle={{ alignItems: 'center' }}>
            {safePhotoUrls.map((url, i) => (
              <View key={`v_${url}_${i}`} style={s.page}>
                <Image source={{ uri: url }} style={s.viewerImg} resizeMode="contain" />
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      </Modal>
    </View>
  );
};

const s = StyleSheet.create({
  strip: { paddingVertical: 4, gap: 10 },
  wrap: { borderRadius: 12, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 4 },
  photo: { width: 160, borderRadius: 12 },
  badge: { position: 'absolute', bottom: 8, right: 8, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  empty: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, paddingVertical: 24, borderRadius: 12, borderWidth: 1, marginVertical: 4 },
  emptyText: { fontSize: 14, fontWeight: '500' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 100 },
  header: { position: 'absolute', top: 48, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', zIndex: 104, elevation: 104 },
  headerText: { fontSize: 16, fontWeight: '600' },
  closeBtn: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.35)', zIndex: 200, elevation: 200 },
  navRow: { position: 'absolute', top: 0, bottom: 0, left: 8, right: 8, flexDirection: 'row', alignItems: 'center', zIndex: 101 },
  chevron: { padding: 12 },
  viewerPager: { zIndex: 103, elevation: 103 },
  page: { width: W, height: H, justifyContent: 'center', alignItems: 'center' },
  viewerImg: { width: W, height: H * 0.7 },
});

export default PhotoGallery;
