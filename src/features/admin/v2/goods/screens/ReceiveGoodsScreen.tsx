/**
 * ReceiveGoodsScreen - Enterprise-grade screen for receiving goods
 * Architecture: Container-Presentational pattern with custom hooks
 * Improved with consistent styling and better visual hierarchy
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Snackbar, Portal, Dialog, Card, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Hooks
import { useReceiveGoods } from '../hooks';
import { useReceiveGoodsForm } from '../hooks/useReceiveGoodsForm';

// Components
import { ClientSearchSection } from '../components/ClientSearchSection';
import { DimensionsInput } from '../components/DimensionsInput';
import { GoodsPhotoUpload } from '../components/GoodsPhotoUpload';
import { FormInput } from '../components/FormInput';
import { CostSummary } from '../components/CostSummary';

// Types & Utils
import { ApiClientError } from '@src/api/client';
import { COLORS } from '@src/constants/Colors';

type AdminV2StackParamList = {
  GoodsList: undefined;
  ReceiveGoods: undefined;
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

/**
 * ReceiveGoodsScreen Container Component
 */
export const ReceiveGoodsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  // Form management hook
  const {
    formData,
    errors,
    selectedClient,
    photoUri,
    useDimensions,
    setFormField,
    setSelectedClient,
    setPhotoUri,
    setUseDimensions,
    validateForm,
    calculatedCBM,
    totalCost,
    buildSubmitData,
    resetForm,
  } = useReceiveGoodsForm({ initialQuantity: 1 });
  
  // API mutation hook
  const receiveGoodsMutation = useReceiveGoods();
  
  /**
   * Handle form submission
   */
  const handleSubmit = async () => {
    // Validate form
    if (!validateForm()) {
      Alert.alert('Erreur', 'Veuillez corriger les erreurs avant de continuer');
      return;
    }
    
    const submitData = buildSubmitData();
    if (!submitData) return;
    
    try {
      await receiveGoodsMutation.mutateAsync({
        data: submitData,
        photoUri: photoUri || undefined,
      });
      
      setShowSuccessDialog(true);
    } catch (error) {
      if (error instanceof ApiClientError) {
        setErrorMessage(error.getUserMessage());
      } else {
        setErrorMessage('Une erreur inattendue est survenue');
      }
    }
  };
  
  /**
   * Handle successful submission
   */
  const handleSuccessDismiss = () => {
    setShowSuccessDialog(false);
    resetForm();
    navigation.navigate('AdminGoodsList' as never);
  };
  
  /**
   * Handle back navigation
   */
  const handleBack = () => {
    if (receiveGoodsMutation.isPending) return;
    navigation.goBack();
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Réception Marchandise</Text>
          <Text style={styles.headerSubtitle}>Enregistrer une nouvelle marchandise</Text>
        </View>
        
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Client Selection */}
          <ClientSearchSection
            selectedClient={selectedClient}
            onSelectClient={setSelectedClient}
            error={errors.clientPhone}
          />
          
          {/* Goods Information Section */}
          <Card style={styles.sectionCard} elevation={2}>
            <Card.Content style={styles.sectionContent}>
              <Text style={styles.sectionLabel}>Informations</Text>
              
              {/* Description */}
              <FormInput
                label="Description"
                value={formData.description}
                onChangeText={(value) => setFormField('description', value)}
                error={errors.description}
                multiline
                numberOfLines={2}
                placeholder="Description de la marchandise"
              />
              
              <Divider style={styles.divider} />
              
              {/* Dimensions / CBM */}
              <DimensionsInput
                useDimensions={useDimensions}
                onToggleMode={setUseDimensions}
                length={formData.length}
                width={formData.width}
                height={formData.height}
                cbm={formData.cbm}
                onChangeLength={(v) => setFormField('length', v)}
                onChangeWidth={(v) => setFormField('width', v)}
                onChangeHeight={(v) => setFormField('height', v)}
                onChangeCBM={(v) => setFormField('cbm', v)}
                errors={{
                  length: errors.length,
                  width: errors.width,
                  height: errors.height,
                  cbm: errors.cbm,
                }}
                calculatedCBM={calculatedCBM}
              />
            </Card.Content>
          </Card>
          
          {/* Physical Properties Section */}
          <Card style={styles.sectionCard} elevation={2}>
            <Card.Content style={styles.sectionContent}>
              <Text style={styles.sectionLabel}>Propriétés physiques</Text>
              
              <View style={styles.row}>
                <View style={styles.halfColumn}>
                  {/* Weight */}
                  <FormInput
                    label="Poids"
                    value={formData.weight}
                    onChangeText={(value) => setFormField('weight', value)}
                    error={errors.weight}
                    keyboardType="decimal-pad"
                    placeholder="0.00"
                    suffix="kg"
                  />
                </View>
                <View style={styles.halfColumn}>
                  {/* Quantity */}
                  <FormInput
                    label="Quantité"
                    value={formData.quantity}
                    onChangeText={(value) => setFormField('quantity', value)}
                    error={errors.quantity}
                    keyboardType="number-pad"
                    placeholder="1"
                  />
                </View>
              </View>
              
              <Divider style={styles.divider} />
              
              {/* Unit Price */}
              <FormInput
                label="Prix unitaire"
                value={formData.unitPrice}
                onChangeText={(value) => setFormField('unitPrice', value)}
                error={errors.unitPrice}
                keyboardType="decimal-pad"
                placeholder="0"
                suffix="FCFA/m³"
              />
            </Card.Content>
          </Card>
          
          {/* Location Section */}
          <Card style={styles.sectionCard} elevation={2}>
            <Card.Content style={styles.sectionContent}>
              <Text style={styles.sectionLabel}>Emplacement</Text>
              
              {/* Location */}
              <FormInput
                label="Code d'emplacement"
                value={formData.location}
                onChangeText={(value) => setFormField('location', value.toUpperCase())}
                error={errors.location}
                placeholder="Ex: C3-A12"
                autoCapitalize="characters"
              />
              
              <Divider style={styles.divider} />
              
              {/* Received By */}
              <FormInput
                label="Reçu par"
                value={formData.receivedByName}
                onChangeText={(value) => setFormField('receivedByName', value)}
                error={errors.receivedByName}
                placeholder="Nom de la personne qui reçoit"
                autoCapitalize="words"
              />
            </Card.Content>
          </Card>
          
          {/* Photo Upload */}
          <GoodsPhotoUpload
            photoUri={photoUri}
            onPhotoSelected={setPhotoUri}
            onPhotoRemoved={() => setPhotoUri(null)}
          />
          
          {/* Cost Summary */}
          <CostSummary
            cbm={calculatedCBM}
            unitPrice={parseFloat(formData.unitPrice.replace(',', '.')) || 0}
            totalCost={totalCost}
          />
          
          {/* Submit Button */}
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.submitButton}
            contentStyle={styles.submitButtonContent}
            loading={receiveGoodsMutation.isPending}
            disabled={receiveGoodsMutation.isPending}
            icon="check"
          >
            {receiveGoodsMutation.isPending
              ? 'Enregistrement...'
              : 'Enregistrer la marchandise'}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
      
      {/* Error Snackbar */}
      <Snackbar
        visible={!!errorMessage}
        onDismiss={() => setErrorMessage(null)}
        action={{
          label: 'OK',
          onPress: () => setErrorMessage(null),
        }}
        style={styles.snackbar}
      >
        {errorMessage}
      </Snackbar>
      
      {/* Success Dialog */}
      <Portal>
        <Dialog visible={showSuccessDialog} onDismiss={handleSuccessDismiss} style={styles.dialog}>
          <Dialog.Icon icon="check-circle" size={48} color={COLORS.success || '#28a745'} />
          <Dialog.Title style={styles.dialogTitle}>Succès</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>Marchandise enregistrée avec succès!</Text>
          </Dialog.Content>
          <Dialog.Actions style={styles.dialogActions}>
            <Button onPress={handleSuccessDismiss} mode="contained" style={styles.dialogButton}>
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  sectionCard: {
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  sectionContent: {
    padding: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 16,
    color: '#333',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -8,
  },
  halfColumn: {
    flex: 1,
    marginHorizontal: 8,
  },
  divider: {
    marginVertical: 16,
    backgroundColor: '#e0e0e0',
  },
  submitButton: {
    marginTop: 8,
    backgroundColor: COLORS.Crimson || '#dc3545',
    borderRadius: 8,
  },
  submitButtonContent: {
    paddingVertical: 8,
  },
  snackbar: {
    backgroundColor: '#333',
  },
  dialog: {
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  dialogTitle: {
    textAlign: 'center',
    fontWeight: '700',
  },
  dialogText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 15,
  },
  dialogActions: {
    justifyContent: 'center',
    paddingBottom: 16,
  },
  dialogButton: {
    paddingHorizontal: 32,
  },
});

export default ReceiveGoodsScreen;
