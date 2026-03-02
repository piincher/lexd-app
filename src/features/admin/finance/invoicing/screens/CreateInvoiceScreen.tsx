import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import {
  Appbar,
  Card,
  Text,
  Button,
  useTheme,
  TextInput,
  Divider,
  Menu,
  ActivityIndicator,
  Portal,
  Dialog,
  List,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { showMessage } from 'react-native-flash-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useCreateInvoice, usePreviewInvoice } from '../hooks/useInvoices';
import { InvoiceTypeSelector } from '../components/InvoiceTypeSelector';
import { InvoiceItemList } from '../components/InvoiceItemList';
import { InvoiceType, InvoiceItem } from '../types';
import { RootStackParamList } from '@src/navigations/type';
import { formatCurrency } from '@src/shared/lib/currency';

// Mock user data - in real app, use a user search API
const MOCK_USERS = [
  { _id: '1', firstName: 'Jean', lastName: 'Dupont', phoneNumber: '+223 70 00 00 01' },
  { _id: '2', firstName: 'Marie', lastName: 'Diarra', phoneNumber: '+223 70 00 00 02' },
  { _id: '3', firstName: 'Amadou', lastName: 'Traoré', phoneNumber: '+223 70 00 00 03' },
];

type CreateInvoiceScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CreateInvoice'
>;

interface FormData {
  userId: string;
  type: InvoiceType | null;
  items: Partial<InvoiceItem>[];
  taxRate: number;
  discountAmount: number;
  dueDate: Date;
  notes: string;
  terms: string;
}

export const CreateInvoiceScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<CreateInvoiceScreenNavigationProp>();
  const createMutation = useCreateInvoice();
  const previewMutation = usePreviewInvoice();

  const [step, setStep] = useState(1);
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);

  const [formData, setFormData] = useState<FormData>({
    userId: '',
    type: null,
    items: [{ description: '', quantity: 1, unitPrice: 0, total: 0 }],
    taxRate: 0,
    discountAmount: 0,
    dueDate: addDays(new Date(), 14),
    notes: '',
    terms: '',
  });

  const selectedUser = MOCK_USERS.find(u => u._id === formData.userId);

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + (item.total || 0), 0);
    const taxAmount = subtotal * (formData.taxRate / 100);
    const total = subtotal + taxAmount - formData.discountAmount;
    return { subtotal, taxAmount, total };
  };

  const updateFormData = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleCreate = async (sendImmediately: boolean = false) => {
    if (!formData.userId || !formData.type) {
      showMessage({
        message: 'Veuillez sélectionner un client et un type de facture',
        type: 'warning',
      });
      return;
    }

    try {
      const data = await createMutation.mutateAsync({
        userId: formData.userId,
        type: formData.type,
        items: formData.items.map(item => ({
          description: item.description || '',
          quantity: item.quantity || 0,
          unitPrice: item.unitPrice || 0,
        })),
        taxRate: formData.taxRate,
        discountAmount: formData.discountAmount,
        dueDate: formData.dueDate.toISOString(),
        notes: formData.notes || undefined,
        terms: formData.terms || undefined,
      });

      showMessage({
        message: sendImmediately ? 'Facture créée et envoyée' : 'Facture créée en brouillon',
        type: 'success',
      });

      navigation.goBack();
    } catch (error) {
      showMessage({
        message: 'Erreur lors de la création de la facture',
        type: 'danger',
      });
    }
  };

  const handlePreview = async () => {
    if (!formData.userId || !formData.type) return;

    try {
      const data = await previewMutation.mutateAsync({
        userId: formData.userId,
        type: formData.type,
        items: formData.items.map(item => ({
          description: item.description || '',
          quantity: item.quantity || 0,
          unitPrice: item.unitPrice || 0,
        })),
        dueDate: formData.dueDate.toISOString(),
      });
      setPreviewData(data);
      setShowPreview(true);
    } catch (error) {
      showMessage({
        message: 'Erreur lors de la prévisualisation',
        type: 'danger',
      });
    }
  };

  const renderStep1 = () => (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.stepTitle}>
          Étape 1: Sélectionner le client
        </Text>
        <Menu
          visible={userMenuVisible}
          onDismiss={() => setUserMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setUserMenuVisible(true)}
              icon="account"
              style={styles.selectorButton}
            >
              {selectedUser
                ? `${selectedUser.firstName} ${selectedUser.lastName}`
                : 'Sélectionner un client'}
            </Button>
          }
        >
          {MOCK_USERS.map(user => (
            <Menu.Item
              key={user._id}
              onPress={() => {
                updateFormData('userId', user._id);
                setUserMenuVisible(false);
              }}
              title={`${user.firstName} ${user.lastName}`}
              description={user.phoneNumber}
            />
          ))}
        </Menu>
      </Card.Content>
    </Card>
  );

  const renderStep2 = () => (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.stepTitle}>
          Étape 2: Type de facture
        </Text>
        <InvoiceTypeSelector
          value={formData.type}
          onSelect={(type) => updateFormData('type', type)}
          error={!formData.type}
        />
      </Card.Content>
    </Card>
  );

  const renderStep3 = () => (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.stepTitle}>
          Étape 3: Articles
        </Text>
        <InvoiceItemList
          items={formData.items}
          onChange={(items) => updateFormData('items', items)}
          editable
        />
      </Card.Content>
    </Card>
  );

  const renderStep4 = () => (
    <>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.stepTitle}>
            Étape 4: Détails et totaux
          </Text>

          <TextInput
            label="Date d'échéance"
            value={format(formData.dueDate, 'dd/MM/yyyy', { locale: fr })}
            onFocus={() => setShowDatePicker(true)}
            right={<TextInput.Icon icon="calendar" />}
            style={styles.input}
          />

          <View style={styles.taxRow}>
            <TextInput
              label="TVA (%)"
              value={String(formData.taxRate)}
              onChangeText={(text) => updateFormData('taxRate', Number(text) || 0)}
              keyboardType="numeric"
              style={[styles.input, { flex: 1 }]}
            />
            <TextInput
              label="Remise"
              value={String(formData.discountAmount)}
              onChangeText={(text) => updateFormData('discountAmount', Number(text) || 0)}
              keyboardType="numeric"
              style={[styles.input, { flex: 2, marginLeft: 12 }]}
            />
          </View>

          <TextInput
            label="Notes"
            value={formData.notes}
            onChangeText={(text) => updateFormData('notes', text)}
            multiline
            numberOfLines={3}
            style={styles.input}
          />

          <TextInput
            label="Conditions"
            value={formData.terms}
            onChangeText={(text) => updateFormData('terms', text)}
            multiline
            numberOfLines={2}
            style={styles.input}
          />
        </Card.Content>
      </Card>

      {/* Summary Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.stepTitle}>
            Récapitulatif
          </Text>
          <View style={styles.summaryRow}>
            <Text variant="bodyMedium">Sous-total</Text>
            <Text variant="bodyMedium">{formatCurrency(calculateTotals().subtotal)}</Text>
          </View>
          {formData.taxRate > 0 && (
            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">TVA ({formData.taxRate}%)</Text>
              <Text variant="bodyMedium">{formatCurrency(calculateTotals().taxAmount)}</Text>
            </View>
          )}
          {formData.discountAmount > 0 && (
            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">Remise</Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.error }}>
                -{formatCurrency(formData.discountAmount)}
              </Text>
            </View>
          )}
          <Divider style={styles.divider} />
          <View style={styles.totalRow}>
            <Text variant="titleMedium">Total</Text>
            <Text variant="titleLarge" style={{ color: theme.colors.primary }}>
              {formatCurrency(calculateTotals().total)}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Nouvelle facture" />
      </Appbar.Header>

      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        {[1, 2, 3, 4].map((s) => (
          <View
            key={s}
            style={[
              styles.stepDot,
              step >= s && { backgroundColor: theme.colors.primary },
            ]}
          >
            <Text style={[styles.stepNumber, step >= s && { color: '#fff' }]}>
              {s}
            </Text>
          </View>
        ))}
      </View>

      <ScrollView style={styles.scrollView}>
        {renderStepContent()}

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          {step > 1 && (
            <Button
              mode="outlined"
              onPress={() => setStep(step - 1)}
              style={[styles.button, styles.prevButton]}
            >
              Précédent
            </Button>
          )}
          {step < 4 ? (
            <Button
              mode="contained"
              onPress={() => setStep(step + 1)}
              style={[styles.button, styles.nextButton]}
            >
              Suivant
            </Button>
          ) : (
            <View style={styles.finalButtons}>
              <Button
                mode="outlined"
                onPress={() => handleCreate(false)}
                loading={createMutation.isPending}
                style={[styles.button, styles.saveButton]}
              >
                Enregistrer brouillon
              </Button>
              <Button
                mode="contained"
                onPress={() => handleCreate(true)}
                loading={createMutation.isPending}
                icon="send"
                style={[styles.button, styles.sendButton]}
              >
                Créer et envoyer
              </Button>
              <Button
                mode="text"
                onPress={handlePreview}
                loading={previewMutation.isPending}
                icon="eye"
                style={styles.previewButton}
              >
                Prévisualiser
              </Button>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={formData.dueDate}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              updateFormData('dueDate', selectedDate);
            }
          }}
        />
      )}

      {/* Preview Dialog */}
      <Portal>
        <Dialog visible={showPreview} onDismiss={() => setShowPreview(false)} style={styles.previewDialog}>
          <Dialog.Title>Aperçu de la facture</Dialog.Title>
          <Dialog.ScrollArea style={styles.previewScrollArea}>
            <ScrollView>
              {previewData && (
                <View>
                  <Text variant="titleMedium">{previewData.invoiceNumber}</Text>
                  <Text variant="bodyMedium" style={{ marginTop: 8 }}>
                    Total: {formatCurrency(previewData.totalAmount)}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text variant="bodySmall">
                    {previewData.items?.length || 0} article(s)
                  </Text>
                </View>
              )}
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={() => setShowPreview(false)}>Fermer</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 16,
  },
  stepDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    fontWeight: '600',
    fontSize: 14,
    color: '#757575',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 16,
    marginBottom: 0,
    borderRadius: 12,
  },
  stepTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  selectorButton: {
    borderRadius: 8,
  },
  input: {
    marginBottom: 12,
  },
  taxRow: {
    flexDirection: 'row',
  },
  divider: {
    marginVertical: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 16,
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: 8,
  },
  prevButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
  finalButtons: {
    flex: 1,
    gap: 12,
  },
  saveButton: {
    borderRadius: 8,
  },
  sendButton: {
    borderRadius: 8,
  },
  previewButton: {
    marginTop: 8,
  },
  previewDialog: {
    maxHeight: '70%',
  },
  previewScrollArea: {
    maxHeight: 400,
  },
});
