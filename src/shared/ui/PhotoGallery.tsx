/**
 * PhotoGallery - Shared photo strip with full-screen viewer
 * Pure UI - no business logic
 */

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';

const { width: W, height: H } = Dimensions.get('window');

export interface PhotoGalleryProps {
  photoUrls?: string[];
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

  const open = useCallback((i: number) => { setIdx(i); setVisible(true); fade.value = withTiming(1, { duration: 250 }); }, [fade]);
  const close = useCallback(() => { fade.value = withTiming(0, { duration: 200 }, (f) => { if (f) runOnJS(setVisible)(false); }); }, [fade]);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: fade.value }));
  const go = (d: number) => { const n = idx + d; if (n >= 0 && n < photoUrls.length) setIdx(n); };

  if (!photoUrls.length) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={editable ? onAddPhoto : undefined} style={[s.empty, { backgroundColor: colors.background.card }]}>
        <Ionicons name="images-outline" size={40} color={colors.text.disabled} />
        <Text style={[s.emptyText, { color: colors.text.secondary }]}>{emptyLabel}</Text>
        {editable && onAddPhoto && <Ionicons name="add-circle" size={28} color={colors.primary.main} />}
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.strip}>
        {photoUrls.map((url, i) => (
          <TouchableOpacity key={`${url}_${i}`} activeOpacity={0.9} onPress={() => open(i)} style={s.wrap}>
            <Image source={{ uri: url }} style={[s.photo, { height: imageHeight }]} contentFit="cover" />
            {showCounter && photoUrls.length > 1 && (
              <View style={s.badge}><Text style={s.badgeText}>{i + 1} / {photoUrls.length}</Text></View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={visible} transparent animationType="none">
        <Animated.View style={[s.backdrop, animatedStyle]}>
          <TouchableOpacity activeOpacity={1} style={StyleSheet.absoluteFillObject} onPress={close} />
          <View style={s.header} pointerEvents="box-none">
            <Text style={s.headerText}>{idx + 1} / {photoUrls.length}</Text>
            <TouchableOpacity onPress={close} style={s.closeBtn}><Ionicons name="close" size={28} color="#fff" /></TouchableOpacity>
          </View>
          <View style={s.navRow} pointerEvents="box-none">
            {idx > 0 && <TouchableOpacity onPress={() => go(-1)} style={s.chevron}><Ionicons name="chevron-back" size={36} color="#fff" /></TouchableOpacity>}
            <View style={{ flex: 1 }} />
            {idx < photoUrls.length - 1 && <TouchableOpacity onPress={() => go(1)} style={s.chevron}><Ionicons name="chevron-forward" size={36} color="#fff" /></TouchableOpacity>}
          </View>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentOffset={{ x: idx * W, y: 0 }}
            onMomentumScrollEnd={(e) => setIdx(Math.round(e.nativeEvent.contentOffset.x / W))} style={{ zIndex: 103 }} contentContainerStyle={{ alignItems: 'center' }}>
            {photoUrls.map((url, i) => (
              <View key={`v_${url}_${i}`} style={s.page}>
                <Image source={{ uri: url }} style={s.viewerImg} contentFit="contain" />
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
  badge: { position: 'absolute', bottom: 8, right: 8, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: 'rgba(0,0,0,0.6)' },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  empty: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, paddingVertical: 24, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)', marginVertical: 4 },
  emptyText: { fontSize: 14, fontWeight: '500' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 100 },
  header: { position: 'absolute', top: 48, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', zIndex: 102 },
  headerText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  closeBtn: { padding: 4 },
  navRow: { position: 'absolute', top: 0, bottom: 0, left: 8, right: 8, flexDirection: 'row', alignItems: 'center', zIndex: 101 },
  chevron: { padding: 12 },
  page: { width: W, height: H, justifyContent: 'center', alignItems: 'center' },
  viewerImg: { width: W, height: H * 0.7 },
});

export default PhotoGallery;
