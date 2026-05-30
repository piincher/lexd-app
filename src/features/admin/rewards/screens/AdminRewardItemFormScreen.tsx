import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Input } from '@src/shared/ui/Input';
import { useAdminRewardItems } from '../hooks/useAdminRewards';
import type { RewardItem } from '../api/adminRewardApi';
import type { RewardItemFormData } from '../types';
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
  const { create, update } = useAdminRewardItems();
  const [form, setForm] = useState<RewardItemFormData>(EMPTY_FORM);
  const [pickerType, setPickerType] = useState<'pickup' | 'status' | null>(null);

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
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) { Alert.alert('Permission refusée', 'Accès à la galerie requis.'); return; }
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onClose} activeOpacity={0.7}>
          <Ionicons name="close" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{item ? 'Modifier' : 'Nouvel article'}</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scroll}>
          <TouchableOpacity style={form.imageUrl ? styles.imagePreview : styles.imagePicker} onPress={pickImage} activeOpacity={0.8}>
            {form.imageUrl ? (
              <Image source={{ uri: form.imageUrl }} style={styles.imagePreview} />
            ) : (
              <MaterialCommunityIcons name="camera-plus" size={32} color={colors.text.disabled} />
            )}
          </TouchableOpacity>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informations</Text>
            <Input label="Nom *" value={form.name} onChangeText={(v) => setField('name', v)} placeholder="Nom de l'article" fullWidth />
            <Input label="Description" value={form.description} onChangeText={(v) => setField('description', v)} placeholder="Description" multiline fullWidth />
            <Input label="Points requis *" value={form.pointsRequired} onChangeText={(v) => setField('pointsRequired', v.replace(/[^0-9]/g, ''))} placeholder="0" keyboardType="number-pad" fullWidth />
            <Input label="Stock *" value={form.stock} onChangeText={(v) => setField('stock', v.replace(/[^0-9]/g, ''))} placeholder="0" keyboardType="number-pad" fullWidth />
            <Input label="Catégorie" value={form.category} onChangeText={(v) => setField('category', v)} placeholder="Général" fullWidth />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Options</Text>
            <TouchableOpacity style={styles.pickerRow} onPress={() => setPickerType('pickup')} activeOpacity={0.8}>
              <Text style={styles.pickerLabel}>Mode de retrait</Text>
              <Text style={styles.pickerValue}>{form.pickupMethod === 'PICKUP' ? 'Retrait' : 'Livraison'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pickerRow} onPress={() => setPickerType('status')} activeOpacity={0.8}>
              <Text style={styles.pickerLabel}>Statut</Text>
              <Text style={styles.pickerValue}>{form.status === 'ACTIVE' ? 'Actif' : 'Inactif'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.saveButton, isSubmitting && { opacity: 0.6 }]} onPress={handleSubmit} disabled={isSubmitting} activeOpacity={0.8}>
            <Text style={styles.saveButtonText}>{isSubmitting ? 'Enregistrement...' : 'Enregistrer'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={!!pickerType} transparent animationType="slide" onRequestClose={() => setPickerType(null)}>
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setPickerType(null)} activeOpacity={1}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>
              {pickerType === 'pickup' ? 'Mode de retrait' : 'Statut'}
            </Text>
            {(pickerType === 'pickup' ? PICKUP_OPTIONS : STATUS_OPTIONS).map((opt) => (
              <TouchableOpacity key={opt.key} style={styles.modalOption} onPress={() => {
                if (pickerType === 'pickup') setField('pickupMethod', opt.key as 'PICKUP' | 'DELIVERY');
                else setField('status', opt.key as 'ACTIVE' | 'INACTIVE');
                setPickerType(null);
              }} activeOpacity={0.7}>
                <Text style={styles.modalOptionText}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalCancel} onPress={() => setPickerType(null)} activeOpacity={0.7}>
              <Text style={styles.modalCancelText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default AdminRewardItemFormScreen;
