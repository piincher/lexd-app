import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { 
  Text, 
  TextInput, 
  Button, 
  HelperText, 
  useTheme, 
  ActivityIndicator,
  Menu,
  Divider,
  IconButton,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { ExpenseTypeIcon } from '../components/ExpenseTypeIcon';
import { ExpenseReceiptUpload } from '../components/ExpenseReceiptUpload';
import { useCreateExpense } from '../hooks/useExpenses';
import type { ExpenseType, PaymentMethod, CreateExpenseInput } from '../types';
import { EXPENSE_TYPE_CONFIG, PAYMENT_METHOD_CONFIG } from '../types';
import type { AdminFinanceStackParamList } from '@src/navigations/type';

type NavigationProp = NativeStackNavigationProp<AdminFinanceStackParamList, 'CreateExpense'>;

const EXPENSE_TYPES: ExpenseType[] = ['FUEL', 'CUSTOMS', 'WAREHOUSE', 'TRANSPORT', 'INSURANCE', 'MAINTENANCE', 'SALARIES', 'UTILITIES', 'OTHER'];
const PAYMENT_METHODS: PaymentMethod[] = ['CASH', 'BANK_TRANSFER', 'MOBILE_MONEY', 'CARD', 'CHECK'];

const expenseSchema = z.object({
  type: z.enum(['FUEL', 'CUSTOMS', 'WAREHOUSE', 'TRANSPORT', 'INSURANCE', 'MAINTENANCE', 'SALARIES', 'UTILITIES', 'OTHER']),
  category: z.string().optional(),
  description: z.string().min(3, 'La description doit contenir au moins 3 caractères'),
  amount: z.number().min(1, 'Le montant doit être supérieur à 0'),
  date: z.string(),
  vendor: z.string().min(2, 'Le fournisseur est requis'),
  paymentMethod: z.enum(['CASH', 'BANK_TRANSFER', 'MOBILE_MONEY', 'CARD', 'CHECK']),
  containerId: z.string().optional(),
  notes: z.string().optional(),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

export const CreateExpenseScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [showPaymentMenu, setShowPaymentMenu] = useState(false);
  const [receiptUri, setReceiptUri] = useState<string | null>(null);
  const [receiptBase64, setReceiptBase64] = useState<string | undefined>(undefined);

  const createExpense = useCreateExpense();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      type: 'OTHER',
      description: '',
      amount: 0,
      date: format(new Date(), 'yyyy-MM-dd'),
      vendor: '',
      paymentMethod: 'CASH',
    },
  });

  const selectedType = watch('type');
  const selectedPaymentMethod = watch('paymentMethod');
  const selectedDate = watch('date');

  const onSubmit = async (data: ExpenseFormData) => {
    const expenseData: CreateExpenseInput = {
      ...data,
      category: data.category || undefined,
      containerId: data.containerId || undefined,
      notes: data.notes || undefined,
    };

    createExpense.mutate(expenseData, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setValue('date', format(date, 'yyyy-MM-dd'));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <IconButton icon="close" size={24} onPress={() => navigation.goBack()} />
          <Text variant="titleLarge" style={styles.headerTitle}>
            Nouvelle dépense
          </Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Type Selector */}
        <View style={styles.section}>
          <Text variant="labelLarge" style={styles.label}>
            Type de dépense *
          </Text>
          <Controller
            control={control}
            name="type"
            render={({ field: { value } }) => (
              <Menu
                visible={showTypeMenu}
                onDismiss={() => setShowTypeMenu(false)}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={() => setShowTypeMenu(true)}
                    style={styles.selectorButton}
                    contentStyle={styles.selectorContent}
                    icon={() => <ExpenseTypeIcon type={value} size={20} showBackground={false} />}
                  >
                    {EXPENSE_TYPE_CONFIG[value].label}
                  </Button>
                }
              >
                {EXPENSE_TYPES.map((type) => (
                  <Menu.Item
                    key={type}
                    onPress={() => {
                      setValue('type', type);
                      setShowTypeMenu(false);
                    }}
                    title={EXPENSE_TYPE_CONFIG[type].label}
                    leadingIcon={EXPENSE_TYPE_CONFIG[type].icon as any}
                  />
                ))}
              </Menu>
            )}
          />
          {errors.type && <HelperText type="error">{errors.type.message}</HelperText>}
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Description *"
                value={value}
                onChangeText={onChange}
                mode="outlined"
                multiline
                numberOfLines={3}
                error={!!errors.description}
                style={styles.input}
              />
            )}
          />
          {errors.description && <HelperText type="error">{errors.description.message}</HelperText>}
        </View>

        {/* Amount */}
        <View style={styles.section}>
          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Montant (FCFA) *"
                value={value ? value.toString() : ''}
                onChangeText={(text) => onChange(parseFloat(text) || 0)}
                mode="outlined"
                keyboardType="decimal-pad"
                error={!!errors.amount}
                style={styles.input}
                left={<TextInput.Affix text="FCFA " />}
              />
            )}
          />
          {errors.amount && <HelperText type="error">{errors.amount.message}</HelperText>}
        </View>

        {/* Date */}
        <View style={styles.section}>
          <Text variant="labelLarge" style={styles.label}>
            Date *
          </Text>
          <Button
            mode="outlined"
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}
            icon="calendar"
          >
            {format(new Date(selectedDate), 'dd MMMM yyyy', { locale: fr })}
          </Button>
          {showDatePicker && (
            <DateTimePicker
              value={new Date(selectedDate)}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>

        {/* Vendor */}
        <View style={styles.section}>
          <Controller
            control={control}
            name="vendor"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Fournisseur *"
                value={value}
                onChangeText={onChange}
                mode="outlined"
                error={!!errors.vendor}
                style={styles.input}
                left={<TextInput.Icon icon="store" />}
              />
            )}
          />
          {errors.vendor && <HelperText type="error">{errors.vendor.message}</HelperText>}
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text variant="labelLarge" style={styles.label}>
            Mode de paiement *
          </Text>
          <Controller
            control={control}
            name="paymentMethod"
            render={({ field: { value } }) => (
              <Menu
                visible={showPaymentMenu}
                onDismiss={() => setShowPaymentMenu(false)}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={() => setShowPaymentMenu(true)}
                    style={styles.selectorButton}
                    icon={PAYMENT_METHOD_CONFIG[value].icon as any}
                  >
                    {PAYMENT_METHOD_CONFIG[value].label}
                  </Button>
                }
              >
                {PAYMENT_METHODS.map((method) => (
                  <Menu.Item
                    key={method}
                    onPress={() => {
                      setValue('paymentMethod', method);
                      setShowPaymentMenu(false);
                    }}
                    title={PAYMENT_METHOD_CONFIG[method].label}
                    leadingIcon={PAYMENT_METHOD_CONFIG[method].icon as any}
                  />
                ))}
              </Menu>
            )}
          />
        </View>

        {/* Category (Optional) */}
        <View style={styles.section}>
          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Catégorie (optionnel)"
                value={value || ''}
                onChangeText={onChange}
                mode="outlined"
                style={styles.input}
                placeholder="Ex: Carburant diesel"
              />
            )}
          />
        </View>

        {/* Container Link (Optional) */}
        <View style={styles.section}>
          <Controller
            control={control}
            name="containerId"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Conteneur lié (optionnel)"
                value={value || ''}
                onChangeText={onChange}
                mode="outlined"
                style={styles.input}
                placeholder="ID du conteneur"
                left={<TextInput.Icon icon="cube" />}
              />
            )}
          />
        </View>

        {/* Receipt Upload */}
        <View style={styles.section}>
          <ExpenseReceiptUpload
            onImageSelected={(uri, base64) => {
              setReceiptUri(uri);
              setReceiptBase64(base64);
            }}
            onRemove={() => {
              setReceiptUri(null);
              setReceiptBase64(undefined);
            }}
          />
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Controller
            control={control}
            name="notes"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Notes (optionnel)"
                value={value || ''}
                onChangeText={onChange}
                mode="outlined"
                multiline
                numberOfLines={3}
                style={styles.input}
                placeholder="Notes additionnelles..."
              />
            )}
          />
        </View>

        <Divider style={styles.divider} />

        {/* Submit Button */}
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={styles.submitButton}
          contentStyle={styles.submitContent}
          disabled={createExpense.isPending}
        >
          {createExpense.isPending ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            'Enregistrer la dépense'
          )}
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontWeight: '700',
  },
  section: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    color: '#374151',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
  },
  selectorButton: {
    borderRadius: 8,
  },
  selectorContent: {
    justifyContent: 'flex-start',
  },
  dateButton: {
    borderRadius: 8,
  },
  divider: {
    marginVertical: 16,
  },
  submitButton: {
    borderRadius: 12,
    marginBottom: 32,
  },
  submitContent: {
    paddingVertical: 8,
  },
});
