/**
 * RouteFormScreen - Create/Edit route with form validation
 * Phase 3: Route Management System
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  HelperText,
  ActivityIndicator,
  Menu,
  Divider,
  Switch,
  Card,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useCreateRoute, useUpdateRoute, useGetRoute } from '../hooks';
import { 
  ShippingMode, 
  ShippingLine, 
  SHIPPING_MODE_LABELS, 
  SHIPPING_LINE_LABELS,
  SHIPPING_LINES_BY_MODE,
  COMMON_ORIGINS,
  COMMON_DESTINATIONS,
  RouteFormData,
} from '../types';
import { Theme } from '@src/constants/Theme';

type AdminV2StackParamList = {
  RouteList: undefined;
  RouteForm: { routeId?: string };
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;
type RouteFormRouteProp = RouteProp<AdminV2StackParamList, 'RouteForm'>;

interface FormErrors {
  name?: string;
  shippingMode?: string;
  origin?: string;
  destination?: string;
  shippingLine?: string;
  estimatedTransitDays?: string;
}

const ALL_SHIPPING_LINES: ShippingLine[] = ['MSC', 'MAERSK', 'CMA_CGM', 'HAPAG_LLOYD'];

export const RouteFormScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteFormRouteProp>();
  const routeId = route.params?.routeId;
  const isEditMode = !!routeId;

  // Form state
  const [formData, setFormData] = useState<RouteFormData>({
    name: '',
    shippingMode: '',
    origin: '',
    destination: '',
    shippingLine: '',
    estimatedTransitDays: '',
    description: '',
    isActive: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [modeMenuVisible, setModeMenuVisible] = useState(false);
  const [lineMenuVisible, setLineMenuVisible] = useState(false);
  const [originMenuVisible, setOriginMenuVisible] = useState(false);
  const [destinationMenuVisible, setDestinationMenuVisible] = useState(false);

  // Data fetching for edit mode
  const { data: routeData, isLoading: isLoadingRoute } = useGetRoute(routeId);
  
  // Mutations
  const createMutation = useCreateRoute();
  const updateMutation = useUpdateRoute();
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  // Populate form in edit mode
  useEffect(() => {
    if (isEditMode && routeData?.data) {
      const route = routeData.data;
      setFormData({
        name: route.name,
        shippingMode: route.shippingMode,
        origin: route.origin,
        destination: route.destination,
        shippingLine: (route.shippingLine as ShippingLine) || '',
        estimatedTransitDays: route.estimatedTransitDays.toString(),
        description: route.description || '',
        isActive: route.isActive,
      });
    }
  }, [isEditMode, routeData]);

  // Get available shipping lines based on mode
  const availableShippingLines = formData.shippingMode 
    ? SHIPPING_LINES_BY_MODE[formData.shippingMode]
    : [];

  // Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom de la route est requis';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Le nom doit contenir au moins 3 caractères';
    }

    if (!formData.shippingMode) {
      newErrors.shippingMode = 'Le mode de transport est requis';
    }

    if (!formData.origin.trim()) {
      newErrors.origin = 'L\'origine est requise';
    }

    if (!formData.destination.trim()) {
      newErrors.destination = 'La destination est requise';
    }

    if (formData.shippingMode === 'SEA' && !formData.shippingLine) {
      newErrors.shippingLine = 'La compagnie maritime est requise pour le mode maritime';
    }

    if (!formData.estimatedTransitDays.trim()) {
      newErrors.estimatedTransitDays = 'Le délai de transit est requis';
    } else {
      const days = parseInt(formData.estimatedTransitDays, 10);
      if (isNaN(days) || days < 1 || days > 365) {
        newErrors.estimatedTransitDays = 'Veuillez entrer un nombre valide (1-365)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form handlers
  const updateField = <K extends keyof RouteFormData>(field: K, value: RouteFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSelectMode = (mode: ShippingMode) => {
    updateField('shippingMode', mode);
    // Reset shipping line when mode changes
    updateField('shippingLine', '');
    setModeMenuVisible(false);
  };

  const handleSelectLine = (line: ShippingLine) => {
    updateField('shippingLine', line);
    setLineMenuVisible(false);
  };

  const handleSelectOrigin = (origin: string) => {
    updateField('origin', origin);
    setOriginMenuVisible(false);
  };

  const handleSelectDestination = (destination: string) => {
    updateField('destination', destination);
    setDestinationMenuVisible(false);
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const submitData = {
      name: formData.name.trim(),
      shippingMode: formData.shippingMode as ShippingMode,
      origin: formData.origin.trim(),
      destination: formData.destination.trim(),
      shippingLine: formData.shippingMode === 'SEA' 
        ? formData.shippingLine 
        : undefined,
      estimatedTransitDays: parseInt(formData.estimatedTransitDays, 10),
      description: formData.description.trim() || undefined,
      isActive: formData.isActive,
    };

    if (isEditMode && routeId) {
      updateMutation.mutate(
        { id: routeId, data: submitData },
        {
          onSuccess: () => {
            navigation.goBack();
          },
          onError: (error: any) => {
            // Error is handled by the mutation
          },
        }
      );
    } else {
      createMutation.mutate(submitData as any, {
        onSuccess: () => {
          navigation.goBack();
        },
        onError: (error: any) => {
          // Error is handled by the mutation
        },
      });
    }
  };

  // Loading state for edit mode
  if (isEditMode && isLoadingRoute) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Theme.primary[600]} />
          <Text style={styles.loadingText}>Chargement de la route...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const mutationError = createMutation.error || updateMutation.error;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Gradient Header */}
        <LinearGradient
          colors={Theme.gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>
              {isEditMode ? 'Modifier la Route' : 'Nouvelle Route'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {isEditMode 
                ? 'Mettez à jour les informations de la route'
                : 'Créez une nouvelle route de transport'
              }
            </Text>
          </View>
          <View style={styles.headerIcon}>
            <Ionicons name="map" size={32} color="rgba(255,255,255,0.3)" />
          </View>
        </LinearGradient>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          {/* Form Card */}
          <Card style={styles.formCard}>
            <Card.Content style={styles.formContent}>
              {/* Route Name */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Nom de la route <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  mode="outlined"
                  value={formData.name}
                  onChangeText={(value) => updateField('name', value)}
                  placeholder="Ex: Route Chine-Mali Maritime"
                  style={styles.input}
                  error={!!errors.name}
                  outlineColor={Theme.neutral[200]}
                  activeOutlineColor={Theme.primary[500]}
                  left={<TextInput.Icon icon="map-marker" />}
                />
                {errors.name && (
                  <HelperText type="error">{errors.name}</HelperText>
                )}
              </View>

              {/* Shipping Mode Dropdown */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Mode de transport <Text style={styles.required}>*</Text>
                </Text>
                <Menu
                  visible={modeMenuVisible}
                  onDismiss={() => setModeMenuVisible(false)}
                  anchor={
                    <TouchableOpacity
                      style={[
                        styles.dropdownButton,
                        errors.shippingMode && styles.dropdownButtonError,
                      ]}
                      onPress={() => setModeMenuVisible(true)}
                      activeOpacity={0.8}
                    >
                      <View style={styles.dropdownButtonContent}>
                        <Ionicons
                          name={formData.shippingMode === 'AIR' ? 'airplane' : 'boat'}
                          size={20}
                          color={formData.shippingMode ? Theme.primary[500] : Theme.neutral[400]}
                        />
                        <Text
                          style={[
                            styles.dropdownButtonText,
                            !formData.shippingMode && styles.dropdownButtonPlaceholder,
                          ]}
                        >
                          {formData.shippingMode
                            ? SHIPPING_MODE_LABELS[formData.shippingMode]
                            : 'Sélectionner un mode'}
                        </Text>
                      </View>
                      <Ionicons
                        name={modeMenuVisible ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color={Theme.neutral[400]}
                      />
                    </TouchableOpacity>
                  }
                  contentStyle={styles.menuContent}
                >
                  {(['SEA', 'AIR'] as ShippingMode[]).map((mode) => (
                    <Menu.Item
                      key={mode}
                      onPress={() => handleSelectMode(mode)}
                      title={SHIPPING_MODE_LABELS[mode]}
                      leadingIcon={formData.shippingMode === mode ? 'check' : undefined}
                      titleStyle={
                        formData.shippingMode === mode
                          ? { color: Theme.primary[600], fontWeight: '600' }
                          : undefined
                      }
                    />
                  ))}
                </Menu>
                {errors.shippingMode && (
                  <HelperText type="error">{errors.shippingMode}</HelperText>
                )}
              </View>

              {/* Origin Dropdown */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Origine <Text style={styles.required}>*</Text>
                </Text>
                <Menu
                  visible={originMenuVisible}
                  onDismiss={() => setOriginMenuVisible(false)}
                  anchor={
                    <TouchableOpacity
                      style={[
                        styles.dropdownButton,
                        errors.origin && styles.dropdownButtonError,
                      ]}
                      onPress={() => setOriginMenuVisible(true)}
                      activeOpacity={0.8}
                    >
                      <View style={styles.dropdownButtonContent}>
                        <Ionicons
                          name="location"
                          size={20}
                          color={formData.origin ? Theme.primary[500] : Theme.neutral[400]}
                        />
                        <Text
                          style={[
                            styles.dropdownButtonText,
                            !formData.origin && styles.dropdownButtonPlaceholder,
                          ]}
                          numberOfLines={1}
                        >
                          {formData.origin || 'Sélectionner une origine'}
                        </Text>
                      </View>
                      <Ionicons
                        name={originMenuVisible ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color={Theme.neutral[400]}
                      />
                    </TouchableOpacity>
                  }
                  contentStyle={styles.menuContent}
                >
                  <View style={{ maxHeight: 200 }}>
                    {COMMON_ORIGINS.map((origin) => (
                      <Menu.Item
                        key={origin}
                        onPress={() => handleSelectOrigin(origin)}
                        title={origin}
                        leadingIcon={formData.origin === origin ? 'check' : undefined}
                        titleStyle={
                          formData.origin === origin
                            ? { color: Theme.primary[600], fontWeight: '600' }
                            : undefined
                        }
                      />
                    ))}
                  </View>
                </Menu>
                {errors.origin && (
                  <HelperText type="error">{errors.origin}</HelperText>
                )}
              </View>

              {/* Destination Dropdown */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Destination <Text style={styles.required}>*</Text>
                </Text>
                <Menu
                  visible={destinationMenuVisible}
                  onDismiss={() => setDestinationMenuVisible(false)}
                  anchor={
                    <TouchableOpacity
                      style={[
                        styles.dropdownButton,
                        errors.destination && styles.dropdownButtonError,
                      ]}
                      onPress={() => setDestinationMenuVisible(true)}
                      activeOpacity={0.8}
                    >
                      <View style={styles.dropdownButtonContent}>
                        <Ionicons
                          name="flag"
                          size={20}
                          color={formData.destination ? Theme.primary[500] : Theme.neutral[400]}
                        />
                        <Text
                          style={[
                            styles.dropdownButtonText,
                            !formData.destination && styles.dropdownButtonPlaceholder,
                          ]}
                          numberOfLines={1}
                        >
                          {formData.destination || 'Sélectionner une destination'}
                        </Text>
                      </View>
                      <Ionicons
                        name={destinationMenuVisible ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color={Theme.neutral[400]}
                      />
                    </TouchableOpacity>
                  }
                  contentStyle={styles.menuContent}
                >
                  <View style={{ maxHeight: 200 }}>
                    {COMMON_DESTINATIONS.map((destination) => (
                      <Menu.Item
                        key={destination}
                        onPress={() => handleSelectDestination(destination)}
                        title={destination}
                        leadingIcon={formData.destination === destination ? 'check' : undefined}
                        titleStyle={
                          formData.destination === destination
                            ? { color: Theme.primary[600], fontWeight: '600' }
                            : undefined
                        }
                      />
                    ))}
                  </View>
                </Menu>
                {errors.destination && (
                  <HelperText type="error">{errors.destination}</HelperText>
                )}
              </View>

              {/* Shipping Line Dropdown (only for SEA) */}
              {formData.shippingMode === 'SEA' && (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    Compagnie maritime <Text style={styles.required}>*</Text>
                  </Text>
                  <Menu
                    visible={lineMenuVisible}
                    onDismiss={() => setLineMenuVisible(false)}
                    anchor={
                      <TouchableOpacity
                        style={[
                          styles.dropdownButton,
                          errors.shippingLine && styles.dropdownButtonError,
                        ]}
                        onPress={() => setLineMenuVisible(true)}
                        activeOpacity={0.8}
                      >
                        <View style={styles.dropdownButtonContent}>
                          <Ionicons
                            name="business"
                            size={20}
                            color={formData.shippingLine ? Theme.primary[500] : Theme.neutral[400]}
                          />
                          <Text
                            style={[
                              styles.dropdownButtonText,
                              !formData.shippingLine && styles.dropdownButtonPlaceholder,
                            ]}
                          >
                            {formData.shippingLine
                              ? SHIPPING_LINE_LABELS[formData.shippingLine as ShippingLine]
                              : 'Sélectionner une compagnie'}
                          </Text>
                        </View>
                        <Ionicons
                          name={lineMenuVisible ? 'chevron-up' : 'chevron-down'}
                          size={20}
                          color={Theme.neutral[400]}
                        />
                      </TouchableOpacity>
                    }
                    contentStyle={styles.menuContent}
                  >
                    {availableShippingLines.map((line) => (
                      <Menu.Item
                        key={line}
                        onPress={() => handleSelectLine(line)}
                        title={SHIPPING_LINE_LABELS[line]}
                        leadingIcon={formData.shippingLine === line ? 'check' : undefined}
                        titleStyle={
                          formData.shippingLine === line
                            ? { color: Theme.primary[600], fontWeight: '600' }
                            : undefined
                        }
                      />
                    ))}
                  </Menu>
                  {errors.shippingLine && (
                    <HelperText type="error">{errors.shippingLine}</HelperText>
                  )}
                </View>
              )}

              {/* Estimated Transit Days */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Délai de transit estimé (jours) <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  mode="outlined"
                  value={formData.estimatedTransitDays}
                  onChangeText={(value) => updateField('estimatedTransitDays', value)}
                  placeholder="Ex: 45"
                  style={styles.input}
                  error={!!errors.estimatedTransitDays}
                  outlineColor={Theme.neutral[200]}
                  activeOutlineColor={Theme.primary[500]}
                  left={<TextInput.Icon icon="clock-outline" />}
                  keyboardType="numeric"
                  maxLength={3}
                />
                {errors.estimatedTransitDays && (
                  <HelperText type="error">{errors.estimatedTransitDays}</HelperText>
                )}
              </View>

              <Divider style={styles.divider} />

              {/* Optional Fields Section */}
              <View style={styles.optionalSection}>
                <Text style={styles.optionalSectionTitle}>Informations optionnelles</Text>

                {/* Description */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Description</Text>
                  <TextInput
                    mode="outlined"
                    value={formData.description}
                    onChangeText={(value) => updateField('description', value)}
                    placeholder="Description de la route..."
                    style={[styles.input, styles.multilineInput]}
                    outlineColor={Theme.neutral[200]}
                    activeOutlineColor={Theme.primary[500]}
                    left={<TextInput.Icon icon="text" />}
                    multiline
                    numberOfLines={3}
                  />
                </View>

                {/* Is Active Toggle */}
                <View style={styles.toggleContainer}>
                  <View style={styles.toggleInfo}>
                    <Text style={styles.toggleLabel}>Route active</Text>
                    <Text style={styles.toggleDescription}>
                      Les routes inactives ne seront pas proposées lors de la création de commandes
                    </Text>
                  </View>
                  <Switch
                    value={formData.isActive}
                    onValueChange={(value) => updateField('isActive', value)}
                    color={Theme.primary[500]}
                  />
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButtonContainer}
            onPress={handleSubmit}
            disabled={isSubmitting}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={Theme.gradients.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.submitButton}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <>
                  <Ionicons 
                    name={isEditMode ? 'save' : 'add-circle'} 
                    size={22} 
                    color="#FFF" 
                  />
                  <Text style={styles.submitButtonText}>
                    {isEditMode ? 'Enregistrer les modifications' : 'Créer la Route'}
                  </Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Error Message */}
          {mutationError && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={20} color={Theme.status.error} />
              <Text style={styles.errorText}>
                {mutationError instanceof Error 
                  ? mutationError.message 
                  : 'Une erreur est survenue. Veuillez réessayer.'}
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.xl,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing['2xl'],
    borderBottomLeftRadius: Theme.radius['3xl'],
    borderBottomRightRadius: Theme.radius['3xl'],
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    marginLeft: Theme.spacing.lg,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    marginTop: Theme.spacing.xs,
  },
  headerIcon: {
    opacity: 0.3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Theme.spacing.lg,
    paddingBottom: Theme.spacing['4xl'],
  },
  formCard: {
    borderRadius: Theme.radius['2xl'],
    backgroundColor: Theme.neutral.white,
    ...Theme.shadows.md,
  },
  formContent: {
    padding: Theme.spacing.lg,
  },
  inputContainer: {
    marginBottom: Theme.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
  required: {
    color: Theme.status.error,
  },
  input: {
    backgroundColor: Theme.neutral.white,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    borderRadius: Theme.radius.md,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    backgroundColor: Theme.neutral.white,
  },
  dropdownButtonError: {
    borderColor: Theme.status.error,
  },
  dropdownButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    flex: 1,
  },
  dropdownButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: Theme.neutral[800],
    flex: 1,
  },
  dropdownButtonPlaceholder: {
    color: Theme.neutral[400],
  },
  menuContent: {
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.neutral.white,
    width: '85%',
  },
  divider: {
    marginVertical: Theme.spacing.lg,
    backgroundColor: Theme.neutral[200],
  },
  optionalSection: {},
  optionalSectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Theme.neutral[600],
    marginBottom: Theme.spacing.lg,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.neutral[50],
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.md,
  },
  toggleInfo: {
    flex: 1,
    marginRight: Theme.spacing.md,
  },
  toggleLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  toggleDescription: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.neutral[500],
    marginTop: 2,
  },
  submitButtonContainer: {
    marginTop: Theme.spacing.xl,
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
    ...Theme.shadows.lg,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: 0.3,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Theme.spacing.lg,
    padding: Theme.spacing.md,
    backgroundColor: '#FEF2F2',
    borderRadius: Theme.radius.lg,
    gap: Theme.spacing.sm,
  },
  errorText: {
    fontSize: 14,
    color: Theme.status.error,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: Theme.spacing.lg,
    fontSize: 16,
    color: Theme.neutral[500],
    fontWeight: '500',
  },
});

export default RouteFormScreen;
