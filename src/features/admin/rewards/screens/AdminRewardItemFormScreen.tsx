import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { useReducedMotion } from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { Input } from '@src/shared/ui/Input';
import { useAdminRewardItems } from '../hooks/useAdminRewards';
import type { RewardItem } from '../api/adminRewardApi';
import type { RewardItemFormData } from '../types';
import { RewardThumb, PointsPill, StockMeter, StatusPill, PickupPill } from '../components/RewardVisuals';
import { createStyles } from './AdminRewardItemFormScreen.styles';

const EMPTY_FORM: RewardItemFormData = {
  name: '', description: '', pointsRequired: '', stock: '',
  pickupMethod: 'PICKUP', status: 'ACTIVE', imageUrl: '', category: '',
};

const PICKUP_OPTIONS: { key: 'PICKUP' | 'DELIVERY'; label: string }[] = [
  { key: 'PICKUP', label: 'Retrait en magasin' },
  { key: 'DELIVERY', label: 'Livraison' },
];

const STATUS_OPTIONS: { key: 'ACTIVE' | 'INACTIVE'; label: string }[] = [
  { key: 'ACTIVE', label: 'Actif' },
  { key: 'INACTIVE', label: 'Inactif' },
];

interface Props {
  item?: RewardItem | null;
  onClose?: () => void;
}

type FormRouteProp = RouteProp<RootStackParamList, 'AdminRewardItemForm'>;

const AdminRewardItemFormScreen: React.FC<Props> = ({ item: propItem, onClose: propOnClose }) => {
  const navigation = useNavigation();
  const route = useRoute<FormRouteProp>();
  const itemId = route.params?.itemId;
  const onClose = propOnClose || (() => navigation.goBack());
  const { query } = useAdminRewardItems();
  const item = propItem || (itemId && query.data ? query.data.find((i: RewardItem) => i.id === itemId) : undefined);
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const reducedMotion = useReducedMotion();
  const { create, update } = useAdminRewardItems();
  const [form, setForm] = useState<RewardItemFormData>(EMPTY_FORM);

  useEffect(() => {
    if (item) {
      setForm({
        name: item.name,
        description: item.description,
        pointsRequired: String(item.pointsRequired),
        stock: String(item.stock),
        pickupMethod: item.pickupMethod,
        status: item.status,
        imageUrl: item.imageUrl,
        category: item.category,
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [item, itemId]);

  const setField = useCallback(<K extends keyof RewardItemFormData>(field: K, value: RewardItemFormData[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 0.5, base64: true });
    if (!result.canceled && result.assets[0]?.base64) {
      setField('imageUrl', `data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  }, [setField]);

  const handleSubmit = useCallback(() => {
    if (!form.name.trim() || !form.pointsRequired || !form.stock) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      pointsRequired: Number(form.pointsRequired),
      stock: Number(form.stock),
      pickupMethod: form.pickupMethod,
      status: form.status,
      imageUrl: form.imageUrl,
      category: form.category.trim() || 'Général',
    };
    if (item) {
      update.mutate({ id: item.id, data: payload }, { onSuccess: onClose });
    } else {
      create.mutate(payload, { onSuccess: onClose });
    }
  }, [form, item, create, update, onClose]);

  const isSubmitting = create.isPending || update.isPending;

  // Subtle, reduced-motion-aware section entrance.
  const sectionMotion = (delay: number) => ({
    from: reducedMotion ? { opacity: 0 } : { opacity: 0, translateY: 6 },
    animate: reducedMotion ? { opacity: 1 } : { opacity: 1, translateY: 0 },
    transition: { type: 'timing' as const, duration: 280, delay },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onClose} activeOpacity={0.7}>
          <Ionicons name="close" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{item ? "Modifier l'article" : 'Nouvel article'}</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scroll}>
          {/* Hero image picker */}
          <MotiView {...sectionMotion(0)}>
            <TouchableOpacity onPress={pickImage} activeOpacity={0.85}>
              {form.imageUrl ? (
                <View style={styles.hero}>
                  <Image source={{ uri: form.imageUrl }} style={styles.heroImage} resizeMode="cover" />
                  <View style={styles.editPill}>
                    <Ionicons name="pencil" size={13} color={colors.neutral.white} />
                    <Text style={styles.editPillText}>Modifier</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.heroEmpty}>
                  <MaterialCommunityIcons name="camera-plus-outline" size={34} color={colors.accent.gold} />
                  <Text style={styles.heroEmptyText}>Ajouter une photo</Text>
                </View>
              )}
            </TouchableOpacity>
          </MotiView>

          {/* Live preview — what the client will see */}
          <MotiView {...sectionMotion(60)} style={styles.previewCard}>
            <RewardThumb uri={form.imageUrl} size={56} />
            <View style={styles.previewBody}>
              {form.name.trim() ? (
                <Text style={styles.previewName} numberOfLines={1}>{form.name}</Text>
              ) : (
                <Text style={styles.previewNamePlaceholder} numberOfLines={1}>Nom de l'article</Text>
              )}
              <View style={styles.previewRow}>
                <PointsPill points={Number(form.pointsRequired) || 0} size="sm" />
                <StatusPill active={form.status === 'ACTIVE'} />
                <PickupPill method={form.pickupMethod} />
              </View>
              <StockMeter stock={Number(form.stock) || 0} />
            </View>
          </MotiView>

          {/* INFORMATIONS */}
          <MotiView {...sectionMotion(120)} style={styles.section}>
            <Text style={styles.overline}>INFORMATIONS</Text>
            <Input label="Nom *" value={form.name} onChangeText={(v) => setField('name', v)} placeholder="Nom de l'article" fullWidth />
            <Input label="Description" value={form.description} onChangeText={(v) => setField('description', v)} placeholder="Description" multiline fullWidth />
            <Input label="Catégorie" value={form.category} onChangeText={(v) => setField('category', v)} placeholder="Général" fullWidth />
          </MotiView>

          {/* DISPONIBILITÉ */}
          <MotiView {...sectionMotion(160)} style={styles.section}>
            <Text style={styles.overline}>DISPONIBILITÉ</Text>
            <Input label="Points requis *" value={form.pointsRequired} onChangeText={(v) => setField('pointsRequired', v.replace(/[^0-9]/g, ''))} placeholder="0" keyboardType="number-pad" fullWidth />
            <Input label="Stock *" value={form.stock} onChangeText={(v) => setField('stock', v.replace(/[^0-9]/g, ''))} placeholder="0" keyboardType="number-pad" fullWidth />
          </MotiView>

          {/* OPTIONS */}
          <MotiView {...sectionMotion(200)} style={styles.section}>
            <Text style={styles.overline}>OPTIONS</Text>

            <View style={styles.optionGroup}>
              <Text style={styles.optionLabel}>Mode de retrait</Text>
              <View style={styles.segment}>
                {PICKUP_OPTIONS.map((opt) => {
                  const selected = form.pickupMethod === opt.key;
                  return (
                    <TouchableOpacity
                      key={opt.key}
                      style={[styles.segmentOption, selected && styles.segmentOptionActive]}
                      onPress={() => setField('pickupMethod', opt.key)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.segmentText, selected && styles.segmentTextActive]} numberOfLines={1}>{opt.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.optionGroup}>
              <Text style={styles.optionLabel}>Statut</Text>
              <View style={styles.segment}>
                {STATUS_OPTIONS.map((opt) => {
                  const selected = form.status === opt.key;
                  return (
                    <TouchableOpacity
                      key={opt.key}
                      style={[styles.segmentOption, selected && styles.segmentOptionActive]}
                      onPress={() => setField('status', opt.key)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.segmentText, selected && styles.segmentTextActive]} numberOfLines={1}>{opt.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </MotiView>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Sticky save bar */}
      <View style={styles.saveBar}>
        <TouchableOpacity onPress={handleSubmit} disabled={isSubmitting} activeOpacity={0.85}>
          <LinearGradient
            colors={Theme.gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.saveButton, isSubmitting && styles.saveButtonDisabled]}
          >
            {isSubmitting && <Ionicons name="hourglass-outline" size={17} color={colors.text.inverse} />}
            <Text style={styles.saveButtonText}>{isSubmitting ? 'Enregistrement…' : 'Enregistrer'}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AdminRewardItemFormScreen;
