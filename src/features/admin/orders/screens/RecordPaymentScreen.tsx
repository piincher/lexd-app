/**
 * RecordPaymentScreen - Admin screen to record manual payments with optional photo proof
 * For cash, bank transfer, or mobile money payments made by clients
 */

import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { 
  Text, 
  TextInput, 
  Button, 
  RadioButton, 
  Surface,
  Divider,
  HelperText,
  IconButton,
  Portal,
  Modal
} from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Screen } from '@src/shared/ui/Screen';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRecordPayment } from '../hooks/useOrderManagement';
import { hapticSuccess } from '@src/shared/lib/haptics';
import * as ImagePicker from 'expo-image-picker';

const PAYMENT_METHODS = [
  { key: 'CASH', label: 'Cash', icon: 'cash' },
  { key: 'BANK_TRANSFER', label: 'Bank Transfer', icon: 'bank' },
  { key: 'MOBILE_MONEY', label: 'Mobile Money', icon: 'cellphone' },
  { key: 'ORANGE_MONEY', label: 'Orange Money', icon: 'cellphone' },
  { key: 'WAVE', label: 'Wave', icon: 'wave' },
];

const RecordPaymentScreen: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background.default,
    },
    summaryCard: {
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
      elevation: 2,
    },
    summaryTitle: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: Fonts.semiBold,
      marginBottom: 12,
      color: colors.text.primary,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 4,
    },
    summaryLabel: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
    },
    summaryValue: {
      fontSize: 14,
      fontWeight: '600',
      fontFamily: Fonts.semiBold,
      color: colors.text.primary,
    },
    divider: {
      marginVertical: 12,
    },
    formCard: {
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
      elevation: 2,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: Fonts.semiBold,
      marginBottom: 16,
      color: colors.text.primary,
    },
    inputGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      fontFamily: Fonts.medium,
      marginBottom: 8,
      color: colors.text.primary,
    },
    hint: {
      fontSize: 12,
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      marginBottom: 8,
    },
    radioItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    radioIcon: {
      marginLeft: 8,
    },
    radioButton: {
      flex: 1,
    },
    imageContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    imageWrapper: {
      position: 'relative',
    },
    proofImage: {
      width: 100,
      height: 100,
      borderRadius: 8,
    },
    removeButton: {
      position: 'absolute',
      top: -8,
      right: -8,
      backgroundColor: colors.background.card,
      borderRadius: 12,
    },
    addImageButton: {
      width: 100,
      height: 100,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: colors.primary.main,
      borderStyle: 'dashed',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background.default,
    },
    addImageText: {
      fontSize: 12,
      color: colors.primary.main,
      fontFamily: Fonts.medium,
      marginTop: 4,
    },
    previewCard: {
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
      elevation: 2,
      backgroundColor: colors.background.paper,
    },
    previewTitle: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: Fonts.semiBold,
      marginBottom: 12,
      color: colors.primary.main,
    },
    previewRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 6,
    },
    previewLabel: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
    },
    previewValue: {
      fontSize: 14,
      fontWeight: '600',
      fontFamily: Fonts.semiBold,
      color: colors.text.primary,
    },
    statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
    },
    statusText: {
      fontSize: 12,
      fontWeight: '600',
      fontFamily: Fonts.semiBold,
    },
    errorCard: {
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
      backgroundColor: colors.status.error,
    },
    errorText: {
      color: colors.status.error,
      fontFamily: Fonts.medium,
    },
    submitButton: {
      marginVertical: 16,
      paddingVertical: 8,
      borderRadius: 10,
    },
    submitLabel: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: Fonts.semiBold,
    },
    modalContent: {
      backgroundColor: colors.background.card,
      padding: 20,
      margin: 20,
      borderRadius: 12,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      fontFamily: Fonts.semiBold,
      marginBottom: 16,
      textAlign: 'center',
    },
    modalButton: {
      marginVertical: 8,
    },
  }), [colors, isDark]);
  const route = useRoute();
  const navigation = useNavigation();
  const { orderId, orderCode, clientName, clientPhone, currentBalance, totalAmount } = route.params as {
    orderId: string;
    orderCode: string;
    clientName: string;
    clientPhone?: string;
    currentBalance: number;
    totalAmount: number;
  };

  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [proofImages, setProofImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showImageModal, setShowImageModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: recordPayment, isPending, error, isError } = useRecordPayment();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitPayment = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const paymentData = {
      orderId,
      amount: parseFloat(amount),
      paymentMethod,
      referenceNumber: referenceNumber || undefined,
      notes: notes || undefined,
      proofImages: proofImages.length > 0 ? proofImages : undefined,
      recordedAt: new Date().toISOString(),
    };

    console.log('[RecordPaymentScreen] Submitting payment:', paymentData);

    recordPayment(paymentData, {
      onSuccess: (data) => {
        setIsSubmitting(false);
        console.log('[RecordPaymentScreen] Payment recorded:', data);

        const paymentV2Id = data.paymentV2Id || data.payment?.id;

        // Navigate to Payment Detail — receipt is generated in background,
        // PaymentDetailScreen will poll for it
        navigation.navigate('PaymentDetail', {
          paymentId: paymentV2Id || '',
          orderId,
          orderCode,
          clientName,
          clientPhone,
          amount: parseFloat(amount),
          paymentMethod,
          status: 'COMPLETED',
          paidAt: new Date().toISOString(),
          referenceNumber,
          notes,
          proofImages,
          goodsIds: data.goodsIds || [],
        });
      },
      onError: (err) => {
        setIsSubmitting(false);
        console.error('[RecordPaymentScreen] Payment failed:', err);
        Alert.alert('Erreur', 'Échec de l\'enregistrement du paiement. Veuillez réessayer.');
      },
    });
  };

  const handleSubmit = () => {
    hapticSuccess();
    console.log('[RecordPaymentScreen] Submit clicked');

    if (!validate()) {
      console.log('[RecordPaymentScreen] Validation failed:', errors);
      return;
    }

    const parsedAmount = parseFloat(amount);

    // Warn on overpayment
    if (parsedAmount > currentBalance) {
      const overage = parsedAmount - currentBalance;
      Alert.alert(
        'Overpayment Warning',
        `This amount exceeds the balance due by ${overage.toLocaleString()} FCFA.\n\nBalance due: ${currentBalance.toLocaleString()} FCFA\nPayment amount: ${parsedAmount.toLocaleString()} FCFA\n\nDo you want to proceed?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Proceed', style: 'destructive', onPress: () => submitPayment() },
        ]
      );
      return;
    }

    submitPayment();
  };

  const pickImage = async (fromCamera: boolean) => {
    try {
      let result;
      
      if (fromCamera) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission needed', 'Camera permission is required to take photos');
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.3,
          base64: true,
        });
      } else {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission needed', 'Gallery permission is required to select photos');
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.3,
          base64: true,
        });
      }

      if (!result.canceled && result.assets && result.assets[0]) {
        // Store both URI for display and base64 for upload
        const asset = result.assets[0];
        const base64Image = `data:image/jpeg;base64,${asset.base64}`;
        setProofImages([...proofImages, base64Image]);
      }
    } catch (error) {
      console.error('[RecordPaymentScreen] Image picker error:', error);
      Alert.alert('Error', 'Failed to select image');
    } finally {
      setShowImageModal(false);
    }
  };

  const removeImage = (index: number) => {
    setProofImages(proofImages.filter((_, i) => i !== index));
  };

  const getNewBalance = () => {
    const paid = parseFloat(amount) || 0;
    return Math.max(0, currentBalance - paid);
  };

  const getPaymentStatus = () => {
    const paid = parseFloat(amount) || 0;
    const newBalance = currentBalance - paid;
    
    if (newBalance <= 0) return 'PAID';
    if (paid > 0) return 'PARTIAL';
    return 'UNPAID';
  };

  return (
    <Screen header={{ title: 'Record Payment', showNotificationBell: true }}>
      <ScrollView style={styles.container}>
        {/* Order Summary */}
        <Surface style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Order Code</Text>
            <Text style={styles.summaryValue}>{orderCode}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Client</Text>
            <Text style={styles.summaryValue}>{clientName}</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Amount</Text>
            <Text style={styles.summaryValue}>{totalAmount.toLocaleString()} FCFA</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Current Balance Due</Text>
            <Text style={[styles.summaryValue, { color: '#F44336' }]}>
              {currentBalance.toLocaleString()} FCFA
            </Text>
          </View>
        </Surface>

        {/* Payment Form */}
        <Surface style={styles.formCard}>
          <Text style={styles.sectionTitle}>Payment Details</Text>

          {/* Amount Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Amount Received (FCFA) *</Text>
            <TextInput
              mode="outlined"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="Enter amount"
              error={!!errors.amount}
            />
            {errors.amount && (
              <HelperText type="error">{errors.amount}</HelperText>
            )}
          </View>

          {/* Payment Method */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Payment Method *</Text>
            <RadioButton.Group 
              onValueChange={setPaymentMethod} 
              value={paymentMethod}
            >
              {PAYMENT_METHODS.map((method) => (
                <View key={method.key} style={styles.radioItem}>
                  <MaterialCommunityIcons 
                    name={method.icon as any} 
                    size={20} 
                    color={colors.text.secondary}
                    style={styles.radioIcon}
                  />
                  <RadioButton.Item
                    label={method.label}
                    value={method.key}
                    style={styles.radioButton}
                  />
                </View>
              ))}
            </RadioButton.Group>
          </View>

          {/* Reference Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Reference Number (Optional)</Text>
            <TextInput
              mode="outlined"
              value={referenceNumber}
              onChangeText={setReferenceNumber}
              placeholder="e.g., Bank transfer reference or MOMO ID"
            />
            <HelperText type="info">
              Transaction ID for bank transfers or mobile money
            </HelperText>
          </View>

          {/* Notes */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes (Optional)</Text>
            <TextInput
              mode="outlined"
              value={notes}
              onChangeText={setNotes}
              placeholder="Any additional notes..."
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Proof Images */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Payment Proof (Optional)</Text>
            <Text style={styles.hint}>Add photos of receipts, screenshots, etc.</Text>
            
            <View style={styles.imageContainer}>
              {proofImages.map((imageData, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image 
                    source={{ uri: imageData.startsWith('data:') ? imageData : imageData }} 
                    style={styles.proofImage} 
                  />
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => removeImage(index)}
                  >
                    <MaterialCommunityIcons name="close-circle" size={24} color="#F44336" />
                  </TouchableOpacity>
                </View>
              ))}
              
              {proofImages.length < 3 && (
                <TouchableOpacity 
                  style={styles.addImageButton}
                  onPress={() => setShowImageModal(true)}
                >
                  <MaterialCommunityIcons name="camera-plus" size={32} color={colors.primary.main} />
                  <Text style={styles.addImageText}>Add Photo</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Surface>

        {/* Payment Preview */}
        {amount && parseFloat(amount) > 0 && (
          <Surface style={styles.previewCard}>
            <Text style={styles.previewTitle}>Payment Preview</Text>
            <View style={styles.previewRow}>
              <Text style={styles.previewLabel}>Amount Being Paid</Text>
              <Text style={styles.previewValue}>
                {parseFloat(amount).toLocaleString()} FCFA
              </Text>
            </View>
            <View style={styles.previewRow}>
              <Text style={styles.previewLabel}>New Balance</Text>
              <Text style={[styles.previewValue, { color: getNewBalance() === 0 ? '#4CAF50' : '#FF9800' }]}>
                {getNewBalance().toLocaleString()} FCFA
              </Text>
            </View>
            {parseFloat(amount) > currentBalance && (
              <View style={styles.previewRow}>
                <Text style={[styles.previewLabel, { color: '#E65100' }]}>Overpayment</Text>
                <Text style={{ fontSize: 14, fontWeight: '600', fontFamily: Fonts.semiBold, color: '#E65100' }}>
                  +{(parseFloat(amount) - currentBalance).toLocaleString()} FCFA
                </Text>
              </View>
            )}
            <View style={styles.previewRow}>
              <Text style={styles.previewLabel}>Payment Status</Text>
              <View style={[styles.statusBadge, { 
                backgroundColor: getPaymentStatus() === 'PAID' ? '#E8F5E9' : 
                                getPaymentStatus() === 'PARTIAL' ? '#FFF3E0' : '#FFEBEE'
              }]}>
                <Text style={[styles.statusText, { 
                  color: getPaymentStatus() === 'PAID' ? colors.status.success : 
                         getPaymentStatus() === 'PARTIAL' ? colors.accent.goldDark : colors.status.error
                }]}>
                  {getPaymentStatus()}
                </Text>
              </View>
            </View>
          </Surface>
        )}

        {/* Error Message */}
        {isError && error && (
          <Surface style={styles.errorCard}>
            <Text style={styles.errorText}>
              Error: {error.message || 'Failed to record payment'}
            </Text>
          </Surface>
        )}

        {/* Submit Button */}
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isPending}
          disabled={isPending || isSubmitting || !amount}
          style={styles.submitButton}
          buttonColor={colors.primary.main}
          icon="check"
          labelStyle={styles.submitLabel}
        >
          {isPending ? 'Recording Payment...' : 'Record Payment'}
        </Button>
      </ScrollView>

      {/* Image Picker Modal */}
      <Portal>
        <Modal
          visible={showImageModal}
          onDismiss={() => setShowImageModal(false)}
          contentContainerStyle={styles.modalContent}
        >
          <Text style={styles.modalTitle}>Add Payment Proof</Text>
          <Button 
            mode="contained" 
            onPress={() => pickImage(true)}
            style={styles.modalButton}
            icon="camera"
          >
            Take Photo
          </Button>
          <Button 
            mode="outlined" 
            onPress={() => pickImage(false)}
            style={styles.modalButton}
            icon="image"
          >
            Choose from Gallery
          </Button>
          <Button 
            mode="text" 
            onPress={() => setShowImageModal(false)}
            style={styles.modalButton}
          >
            Cancel
          </Button>
        </Modal>
      </Portal>
    </Screen>
  );
};

export default RecordPaymentScreen;
