/**
 * CreateContainerScreen - Create new container with form validation
 * Phase 3: Added route selection with shipping mode
 */

import React, { useState } from 'react';
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
  Searchbar,
  Card,
  Chip,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useCreateContainer } from '../hooks';
import { useGetActiveRoutes } from '../../routes/hooks/useRoutes';
import { 
  ShippingLine, 
  SHIPPING_LINE_LABELS, 
  ContainerFormData, 
  ShippingMode,
  SHIPPING_MODE_LABELS,
  SHIPPING_MODE_ICONS,
  SHIPPING_MODE_COLORS,
  Route,
} from '../types';
import { useGetConsignees, Consignee } from '../../consignees';
import { Theme } from '@src/constants/Theme';

type AdminV2StackParamList = {
  ContainerList: undefined;
  CreateContainer: undefined;
  ContainerDetail: { containerId: string };
  RouteForm: { routeId?: string };
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

interface FormErrors {
  shippingMode?: string;
  shippingLine?: string;
  routeId?: string;
  consigneeId?: string;
  actualContainerNumber?: string;
  bookingReference?: string;
}

const SHIPPING_MODES: ShippingMode[] = ['SEA', 'AIR'];
const SEA_SHIPPING_LINES: ShippingLine[] = ['MSC', 'MAERSK', 'CMA_CGM', 'HAPAG_LLOYD'];

export const CreateContainerScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  // Form state
  const [formData, setFormData] = useState<ContainerFormData>({
    shippingMode: '',
    shippingLine: '',
    routeId: '',
    consigneeId: '',
    actualContainerNumber: '',
    bookingReference: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedConsigneeName, setSelectedConsigneeName] = useState<string>('');
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [consigneeSearchQuery, setConsigneeSearchQuery] = useState<string>('');
  const [showConsigneeDropdown, setShowConsigneeDropdown] = useState<boolean>(false);
  const [showRouteMenu, setShowRouteMenu] = useState<boolean>(false);

  // Data fetching
  const { data: consigneesData, isLoading: isLoadingConsignees } = useGetConsignees();
  const { 
    data: routesData, 
    isLoading: isLoadingRoutes,
    isError: isRoutesError,
  } = useGetActiveRoutes(formData.shippingMode || undefined);
  const createMutation = useCreateContainer();

  const consignees: Consignee[] = consigneesData || [];
  // Safe extraction of routes data - handle different API response formats
  const routes: Route[] = Array.isArray(routesData?.data) 
    ? routesData?.data 
    : routesData?.data?.routes || [];

  // Filter consignees based on search
  const filteredConsignees = (() => {
    if (!consigneeSearchQuery.trim()) return consignees;
    const query = consigneeSearchQuery.toLowerCase();
    return consignees.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.phone.toLowerCase().includes(query) ||
        c.warehouseAddress.toLowerCase().includes(query)
    );
  })();

  // Get available shipping lines based on mode
  const availableShippingLines = (() => {
    if (formData.shippingMode === 'SEA') return SEA_SHIPPING_LINES;
    if (formData.shippingMode === 'AIR') return ['AIR_STANDARD'];
    return [];
  })();

  // Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.shippingMode) {
      newErrors.shippingMode = 'Le mode de transport est requis';
    }

    if (!formData.routeId) {
      newErrors.routeId = 'La route est requise';
    }

    if (!formData.shippingLine) {
      newErrors.shippingLine = 'La compagnie est requise';
    }

    if (!formData.consigneeId) {
      newErrors.consigneeId = 'Le destinataire est requis';
    }

    if (formData.actualContainerNumber && formData.actualContainerNumber.length < 4) {
      newErrors.actualContainerNumber = 'Numéro de container invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form handlers
  const updateField = <K extends keyof ContainerFormData>(field: K, value: ContainerFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Handle shipping mode selection
  const handleSelectShippingMode = (mode: ShippingMode) => {
    updateField('shippingMode', mode);
    updateField('shippingLine', '');
    updateField('routeId', '');
    setSelectedRoute(null);
    setErrors((prev) => ({ ...prev, shippingMode: undefined, routeId: undefined }));
  };

  // Handle route selection
  const handleSelectRoute = (route: Route) => {
    updateField('routeId', route._id);
    updateField('shippingLine', route.shippingLine);
    setSelectedRoute(route);
    setShowRouteMenu(false);
    if (errors.routeId) {
      setErrors((prev) => ({ ...prev, routeId: undefined }));
    }
  };

  // Handle clear route
  const handleClearRoute = () => {
    updateField('routeId', '');
    updateField('shippingLine', '');
    setSelectedRoute(null);
  };

  const handleSelectConsignee = (consignee: Consignee) => {
    updateField('consigneeId', consignee._id);
    setSelectedConsigneeName(consignee.name);
    setConsigneeSearchQuery('');
    setShowConsigneeDropdown(false);
  };

  const handleClearConsignee = () => {
    updateField('consigneeId', '');
    setSelectedConsigneeName('');
    setConsigneeSearchQuery('');
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const submitData = {
      shippingMode: formData.shippingMode as ShippingMode,
      shippingLine: formData.shippingLine as ShippingLine,
      routeId: formData.routeId,
      consigneeId: formData.consigneeId,
      actualContainerNumber: formData.actualContainerNumber.trim() || undefined,
      bookingReference: formData.bookingReference.trim() || undefined,
    };

    createMutation.mutate(submitData, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  };

  // Render helpers
  const renderConsigneeItem = ({ item }: { item: Consignee }) => (
    <TouchableOpacity
      style={styles.consigneeItem}
      onPress={() => handleSelectConsignee(item)}
    >
      <View style={styles.consigneeItemIcon}>
        <Ionicons name="business" size={20} color={Theme.primary[500]} />
      </View>
      <View style={styles.consigneeItemContent}>
        <Text style={styles.consigneeItemName}>{item.name}</Text>
        <Text style={styles.consigneeItemPhone}>{item.phone}</Text>
        <Text style={styles.consigneeItemAddress} numberOfLines={1}>
          {item.warehouseAddress}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Theme.neutral[400]} />
    </TouchableOpacity>
  );

  const renderRouteItem = (route: Route) => (
    <Menu.Item
      key={route._id}
      onPress={() => handleSelectRoute(route)}
      title={route.name}
      leadingIcon={formData.routeId === route._id ? 'check' : undefined}
      titleStyle={
        formData.routeId === route._id
          ? { color: Theme.primary[600], fontWeight: '600' }
          : undefined
      }
      style={styles.routeMenuItem}
    />
  );

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
            <Text style={styles.headerTitle}>Nouveau Container</Text>
            <Text style={styles.headerSubtitle}>
              Créez un container pour regrouper les marchandises
            </Text>
          </View>
          <View style={styles.headerIcon}>
            <Ionicons name="cube" size={32} color="rgba(255,255,255,0.3)" />
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
              
              {/* Phase 3: Shipping Mode Selection */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Mode de Transport <Text style={styles.required}>*</Text>
                </Text>
                <View style={styles.modeSelectionContainer}>
                  {SHIPPING_MODES.map((mode) => {
                    const isSelected = formData.shippingMode === mode;
                    const modeIcon = SHIPPING_MODE_ICONS[mode];
                    const modeColor = SHIPPING_MODE_COLORS[mode];
                    const modeLabel = SHIPPING_MODE_LABELS[mode];
                    
                    return (
                      <TouchableOpacity
                        key={mode}
                        style={[
                          styles.modeButton,
                          isSelected && { 
                            borderColor: modeColor,
                            backgroundColor: `${modeColor}10`,
                          },
                          errors.shippingMode && styles.modeButtonError,
                        ]}
                        onPress={() => handleSelectShippingMode(mode)}
                        activeOpacity={0.8}
                      >
                        <Ionicons 
                          name={modeIcon as any} 
                          size={24} 
                          color={isSelected ? modeColor : Theme.neutral[400]} 
                        />
                        <Text style={[
                          styles.modeButtonText,
                          isSelected && { color: modeColor, fontWeight: '600' },
                        ]}>
                          {mode === 'SEA' ? 'Maritime' : 'Aérien'}
                        </Text>
                        {isSelected && (
                          <View style={[styles.modeCheckBadge, { backgroundColor: modeColor }]}>
                            <Ionicons name="checkmark" size={12} color="#FFF" />
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
                {errors.shippingMode && (
                  <HelperText type="error" visible={!!errors.shippingMode}>
                    {errors.shippingMode}
                  </HelperText>
                )}
              </View>

              {/* Phase 3: Route Selection */}
              {formData.shippingMode && (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    Route <Text style={styles.required}>*</Text>
                  </Text>
                  
                  {!formData.routeId ? (
                    // Route Selection Mode
                    <View>
                      <Menu
                        visible={showRouteMenu}
                        onDismiss={() => setShowRouteMenu(false)}
                        anchor={
                          <TouchableOpacity
                            style={[
                              styles.dropdownButton,
                              errors.routeId && styles.dropdownButtonError,
                              isLoadingRoutes && styles.dropdownButtonLoading,
                            ]}
                            onPress={() => setShowRouteMenu(true)}
                            disabled={isLoadingRoutes || routes.length === 0}
                            activeOpacity={0.8}
                          >
                            <View style={styles.dropdownButtonContent}>
                              <Ionicons
                                name="git-branch"
                                size={20}
                                color={isLoadingRoutes ? Theme.neutral[300] : Theme.primary[500]}
                              />
                              <Text
                                style={[
                                  styles.dropdownButtonText,
                                  styles.dropdownButtonPlaceholder,
                                  isLoadingRoutes && { color: Theme.neutral[400] },
                                ]}
                              >
                                {isLoadingRoutes 
                                  ? 'Chargement des routes...' 
                                  : routes.length === 0 
                                    ? 'Aucune route disponible'
                                    : 'Sélectionner une route'}
                              </Text>
                            </View>
                            {!isLoadingRoutes && routes.length > 0 && (
                              <Ionicons
                                name={showRouteMenu ? 'chevron-up' : 'chevron-down'}
                                size={20}
                                color={Theme.neutral[400]}
                              />
                            )}
                          </TouchableOpacity>
                        }
                        contentStyle={styles.menuContent}
                      >
                        {Array.isArray(routes) && routes.map(renderRouteItem)}
                      </Menu>
                      
                      {isRoutesError && (
                        <HelperText type="error">
                          Erreur lors du chargement des routes
                        </HelperText>
                      )}
                      
                      {!isLoadingRoutes && routes.length === 0 && !isRoutesError && (
                        <View style={styles.noRoutesContainer}>
                          <Ionicons name="alert-circle" size={16} color={Theme.status.warning} />
                          <Text style={styles.noRoutesText}>
                            Aucune route active pour ce mode.{'\n'}
                            Veuillez créer une route d'abord.
                          </Text>
                          <TouchableOpacity
                            style={styles.createRouteButton}
                            onPress={() => navigation.navigate('RouteForm', {})}
                            activeOpacity={0.8}
                          >
                            <Ionicons name="add-circle" size={16} color="#FFF" />
                            <Text style={styles.createRouteButtonText}>Créer une route</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                      
                      {errors.routeId && (
                        <HelperText type="error" visible={!!errors.routeId}>
                          {errors.routeId}
                        </HelperText>
                      )}
                    </View>
                  ) : (
                    // Selected Route Display
                    <View style={styles.selectedRouteContainer}>
                      <View style={styles.selectedRouteContent}>
                        <View style={styles.selectedRouteIcon}>
                          <Ionicons name="git-branch" size={24} color="#FFF" />
                        </View>
                        <View style={styles.selectedRouteInfo}>
                          <Text style={styles.selectedRouteName}>
                            {selectedRoute?.name || 'Route sélectionnée'}
                          </Text>
                          <View style={styles.selectedRouteDetails}>
                            <Text style={styles.selectedRouteMeta}>
                              <Ionicons name="time" size={12} color={Theme.primary[600]} />{' '}
                              {selectedRoute?.estimatedTransitDays || '--'} jours
                            </Text>
                            {selectedRoute && (
                              <Text style={styles.selectedRoutePath}>
                                {typeof selectedRoute.origin === 'string' 
                                  ? selectedRoute.origin 
                                  : selectedRoute.origin?.city || 'N/A'} → {typeof selectedRoute.destination === 'string' 
                                    ? selectedRoute.destination 
                                    : selectedRoute.destination?.city || 'N/A'}
                              </Text>
                            )}
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={styles.clearRouteButton}
                        onPress={handleClearRoute}
                      >
                        <Ionicons name="close-circle" size={24} color={Theme.status.error} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}

              {/* Route Description */}
              {selectedRoute?.description && (
                <View style={styles.routeDescriptionContainer}>
                  <Ionicons name="information-circle" size={16} color={Theme.neutral[500]} />
                  <Text style={styles.routeDescriptionText}>
                    {selectedRoute.description}
                  </Text>
                </View>
              )}

              {/* Phase 3: Auto-populated Shipping Line (Read-only) */}
              {formData.shippingLine && (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Compagnie de Transport</Text>
                  <View style={styles.readOnlyField}>
                    <Ionicons 
                      name={formData.shippingMode === 'SEA' ? 'boat' : 'airplane'} 
                      size={20} 
                      color={Theme.primary[500]} 
                    />
                    <Text style={styles.readOnlyText}>
                      {SHIPPING_LINE_LABELS[formData.shippingLine] || formData.shippingLine}
                    </Text>
                  </View>
                </View>
              )}

              <Divider style={styles.divider} />

              {/* Consignee Selection */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Destinataire <Text style={styles.required}>*</Text>
                </Text>

                {!formData.consigneeId ? (
                  // Search/Select Mode
                  <View>
                    <Searchbar
                      placeholder="Rechercher un destinataire..."
                      onChangeText={setConsigneeSearchQuery}
                      value={consigneeSearchQuery}
                      style={styles.searchBar}
                      inputStyle={styles.searchInput}
                      icon="magnify"
                      clearIcon="close"
                      onFocus={() => setShowConsigneeDropdown(true)}
                    />
                    {errors.consigneeId && (
                      <HelperText type="error" visible={!!errors.consigneeId}>
                        {errors.consigneeId}
                      </HelperText>
                    )}

                    {showConsigneeDropdown && (
                      <Card style={styles.dropdownCard}>
                        {isLoadingConsignees ? (
                          <View style={styles.dropdownLoading}>
                            <ActivityIndicator size="small" color={Theme.primary[500]} />
                            <Text style={styles.dropdownLoadingText}>Chargement...</Text>
                          </View>
                        ) : filteredConsignees.length === 0 ? (
                          <View style={styles.dropdownEmpty}>
                            <Ionicons
                              name="business-outline"
                              size={32}
                              color={Theme.neutral[300]}
                            />
                            <Text style={styles.dropdownEmptyText}>
                              {consigneeSearchQuery
                                ? 'Aucun destinataire trouvé'
                                : 'Aucun destinataire disponible'}
                            </Text>
                          </View>
                        ) : (
                          <View style={{ maxHeight: 200 }}>
                            {filteredConsignees.map((item) => (
                              <React.Fragment key={item._id}>
                                {renderConsigneeItem({ item })}
                              </React.Fragment>
                            ))}
                          </View>
                        )}
                      </Card>
                    )}
                  </View>
                ) : (
                  // Selected Consignee Display
                  <View style={styles.selectedConsigneeContainer}>
                    <View style={styles.selectedConsigneeContent}>
                      <View style={styles.selectedConsigneeIcon}>
                        <Ionicons name="business" size={24} color="#FFF" />
                      </View>
                      <View style={styles.selectedConsigneeInfo}>
                        <Text style={styles.selectedConsigneeName}>
                          {selectedConsigneeName}
                        </Text>
                        <Text style={styles.selectedConsigneeLabel}>
                          Destinataire sélectionné
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.clearConsigneeButton}
                      onPress={handleClearConsignee}
                    >
                      <Ionicons name="close-circle" size={24} color={Theme.status.error} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <Divider style={styles.divider} />

              {/* Optional Fields Section */}
              <View style={styles.optionalSection}>
                <Text style={styles.optionalSectionTitle}>Informations optionnelles</Text>

                {/* Actual Container Number - Only for SEA shipping mode */}
                {formData.shippingMode === 'SEA' && (
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Numéro de Container réel</Text>
                    <TextInput
                      mode="outlined"
                      value={formData.actualContainerNumber}
                      onChangeText={(value) => updateField('actualContainerNumber', value)}
                      placeholder="Ex: MSCU1234567"
                      style={styles.input}
                      error={!!errors.actualContainerNumber}
                      outlineColor={Theme.neutral[200]}
                      activeOutlineColor={Theme.primary[500]}
                      left={<TextInput.Icon icon="cube-outline" />}
                      autoCapitalize="characters"
                    />
                    {errors.actualContainerNumber && (
                      <HelperText type="error">{errors.actualContainerNumber}</HelperText>
                    )}
                  </View>
                )}

                {/* Booking Reference */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Référence de réservation</Text>
                  <TextInput
                    mode="outlined"
                    value={formData.bookingReference}
                    onChangeText={(value) => updateField('bookingReference', value)}
                    placeholder="Ex: BK-2024-001"
                    style={styles.input}
                    error={!!errors.bookingReference}
                    outlineColor={Theme.neutral[200]}
                    activeOutlineColor={Theme.primary[500]}
                    left={<TextInput.Icon icon="file-document-outline" />}
                  />
                  {errors.bookingReference && (
                    <HelperText type="error">{errors.bookingReference}</HelperText>
                  )}
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButtonContainer}
            onPress={handleSubmit}
            disabled={createMutation.isPending}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={Theme.gradients.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.submitButton}
            >
              {createMutation.isPending ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <>
                  <Ionicons name="add-circle" size={22} color="#FFF" />
                  <Text style={styles.submitButtonText}>Créer le Container</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Error Message */}
          {createMutation.isError && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={20} color={Theme.status.error} />
              <Text style={styles.errorText}>
                Une erreur est survenue. Veuillez réessayer.
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
  // Phase 3: Mode Selection Styles
  modeSelectionContainer: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  modeButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.lg,
    borderWidth: 2,
    borderColor: Theme.neutral[200],
    borderRadius: Theme.radius.xl,
    backgroundColor: Theme.neutral.white,
    gap: Theme.spacing.sm,
  },
  modeButtonError: {
    borderColor: Theme.status.error,
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.neutral[600],
  },
  modeCheckBadge: {
    position: 'absolute',
    top: Theme.spacing.sm,
    right: Theme.spacing.sm,
    width: 20,
    height: 20,
    borderRadius: Theme.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Phase 3: Route Selection Styles
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
  dropdownButtonLoading: {
    backgroundColor: Theme.neutral[50],
  },
  dropdownButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  dropdownButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: Theme.neutral[800],
  },
  dropdownButtonPlaceholder: {
    color: Theme.neutral[400],
  },
  menuContent: {
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.neutral.white,
    width: '85%',
  },
  routeMenuItem: {
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
  },
  noRoutesContainer: {
    marginTop: Theme.spacing.sm,
    padding: Theme.spacing.md,
    backgroundColor: '#FEF3C7',
    borderRadius: Theme.radius.md,
    gap: Theme.spacing.sm,
  },
  noRoutesText: {
    fontSize: 13,
    color: Theme.neutral[700],
    lineHeight: 18,
    marginLeft: Theme.spacing.lg,
  },
  createRouteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.primary[500],
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.radius.md,
    marginTop: Theme.spacing.sm,
    marginLeft: Theme.spacing.lg,
    gap: Theme.spacing.xs,
    ...Theme.shadows.sm,
  },
  createRouteButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFF',
  },
  selectedRouteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.primary[50],
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.primary[200],
  },
  selectedRouteContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectedRouteIcon: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRouteInfo: {
    marginLeft: Theme.spacing.md,
    flex: 1,
  },
  selectedRouteName: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  selectedRouteDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.md,
    marginTop: 2,
  },
  selectedRouteMeta: {
    fontSize: 13,
    color: Theme.primary[600],
    fontWeight: '500',
  },
  selectedRoutePath: {
    fontSize: 13,
    color: Theme.neutral[500],
  },
  clearRouteButton: {
    padding: Theme.spacing.xs,
  },
  routeDescriptionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Theme.spacing.sm,
    marginTop: -Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
    padding: Theme.spacing.md,
    backgroundColor: Theme.neutral[50],
    borderRadius: Theme.radius.md,
  },
  routeDescriptionText: {
    flex: 1,
    fontSize: 13,
    color: Theme.neutral[600],
    lineHeight: 18,
  },
  readOnlyField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    backgroundColor: Theme.neutral[50],
    borderRadius: Theme.radius.md,
    borderWidth: 1,
    borderColor: Theme.neutral[200],
  },
  readOnlyText: {
    fontSize: 15,
    fontWeight: '500',
    color: Theme.neutral[700],
  },
  divider: {
    marginVertical: Theme.spacing.lg,
    backgroundColor: Theme.neutral[200],
  },
  searchBar: {
    borderRadius: Theme.radius.md,
    backgroundColor: Theme.neutral[50],
    elevation: 0,
    borderWidth: 1,
    borderColor: Theme.neutral[200],
  },
  searchInput: {
    fontSize: 15,
    color: Theme.neutral[800],
  },
  dropdownCard: {
    marginTop: Theme.spacing.sm,
    borderRadius: Theme.radius.lg,
    maxHeight: 220,
    ...Theme.shadows.md,
  },
  dropdownLoading: {
    padding: Theme.spacing.xl,
    alignItems: 'center',
  },
  dropdownLoadingText: {
    marginTop: Theme.spacing.sm,
    fontSize: 14,
    color: Theme.neutral[500],
  },
  dropdownEmpty: {
    padding: Theme.spacing.xl,
    alignItems: 'center',
  },
  dropdownEmptyText: {
    marginTop: Theme.spacing.sm,
    fontSize: 14,
    color: Theme.neutral[500],
    textAlign: 'center',
  },
  consigneeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
  },
  consigneeItemIcon: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  consigneeItemContent: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  consigneeItemName: {
    fontSize: 15,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  consigneeItemPhone: {
    fontSize: 13,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  consigneeItemAddress: {
    fontSize: 12,
    color: Theme.neutral[400],
    marginTop: 2,
  },
  selectedConsigneeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.primary[50],
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.primary[200],
  },
  selectedConsigneeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedConsigneeIcon: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedConsigneeInfo: {
    marginLeft: Theme.spacing.md,
  },
  selectedConsigneeName: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  selectedConsigneeLabel: {
    fontSize: 13,
    color: Theme.primary[600],
    marginTop: 2,
  },
  clearConsigneeButton: {
    padding: Theme.spacing.xs,
  },
  optionalSection: {},
  optionalSectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Theme.neutral[600],
    marginBottom: Theme.spacing.lg,
  },
  input: {
    backgroundColor: Theme.neutral.white,
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
});

export default CreateContainerScreen;
