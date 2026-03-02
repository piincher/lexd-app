/**
 * PackingListScreen - Admin Packing List with client grouping
 * Enhanced: Shows ALL goods grouped by client with collapsible sections
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Share,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { captureRef } from 'react-native-view-shot';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useGetContainerById } from '../hooks';
import {
  Container,
  SHIPPING_LINE_LABELS,
  SHIPPING_MODE_LABELS,
} from '../types';
import { Goods, ClientInfo } from '../../goods/types';
import { Theme } from '@src/constants/Theme';
import {
  AdminPackingListData,
  ClientGoodsGroup,
  ContainerSummary,
  getClientColor,
} from '../types/packingList';
import { ClientGoodsSection } from '../components/ClientGoodsSection';
import { CapacityUsageBar } from '../components/CapacityUsageBar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAX_CBM = 67; // Standard 40ft container

type AdminV2StackParamList = {
  ContainerDetail: { containerId: string };
  PackingList: { containerId: string };
  LoadingList: { containerId: string };
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

export const PackingListScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const { containerId } = route.params as { containerId: string };
  const documentRef = useRef<View>(null);

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [allExpanded, setAllExpanded] = useState(true);

  const { data: containerResponse, isLoading: isContainerLoading } = useGetContainerById(containerId);
  const container: Container | undefined = containerResponse?.data?.container || containerResponse?.data;

  // Process goods data with client grouping
  const packingListData: AdminPackingListData | null = (() => {
    if (!container) return null;

    // Get goods list from container
    const goodsIds = (container as any).goodsIds;
    const goodsList: Goods[] = Array.isArray(goodsIds) && goodsIds.length > 0 && typeof goodsIds[0] === 'object'
      ? (goodsIds as Goods[])
      : (container.goods || []);

    if (goodsList.length === 0) {
      return {
        container,
        clients: [],
        summary: {
          totalCBM: 0,
          totalWeight: 0,
          totalItems: 0,
          totalPackages: 0,
          capacityPercentage: 0,
          remainingCBM: MAX_CBM,
          maxCBM: MAX_CBM,
        },
        generatedAt: new Date().toISOString(),
        generatedBy: 'Admin',
      };
    }

    // Group goods by client
    const clientMap = new Map<string, ClientGoodsGroup>();

    goodsList.forEach((goods) => {
      const client = typeof goods.clientId === 'object' ? goods.clientId : null;
      const clientId = client?._id || (goods.clientId as string) || 'unknown';
      const clientName = client
        ? `${client.firstName} ${client.lastName}`
        : 'Client Inconnu';
      const clientPhone = client?.phoneNumber || 'N/A';

      if (!clientMap.has(clientId)) {
        clientMap.set(clientId, {
          clientId,
          clientName,
          clientPhone,
          goods: [],
          summary: {
            totalCBM: 0,
            totalWeight: 0,
            totalItems: 0,
            totalQuantity: 0,
          },
        });
      }

      const group = clientMap.get(clientId)!;
      group.goods.push(goods);
      group.summary.totalCBM += goods.actualCBM || 0;
      group.summary.totalWeight += goods.weight || 0;
      group.summary.totalItems += 1;
      group.summary.totalQuantity += goods.quantity || 1;
    });

    const clients = Array.from(clientMap.values());

    // Calculate container summary
    const summary: ContainerSummary = {
      totalCBM: container.totalCBM || 0,
      totalWeight: clients.reduce((sum, c) => sum + c.summary.totalWeight, 0),
      totalItems: goodsList.length,
      totalPackages: clients.reduce((sum, c) => sum + c.summary.totalQuantity, 0),
      capacityPercentage: ((container.totalCBM || 0) / MAX_CBM) * 100,
      remainingCBM: Math.max(MAX_CBM - (container.totalCBM || 0), 0),
      maxCBM: MAX_CBM,
    };

    return {
      container,
      clients,
      summary,
      generatedAt: new Date().toISOString(),
      generatedBy: 'Admin',
    };
  })();

  const handleShare = async () => {
    if (!packingListData) return;

    const { container, clients, summary } = packingListData;

    const lines: string[] = [];
    lines.push('╔════════════════════════════════════════════════╗');
    lines.push('║         CHINALINK EXPRESS - LISTE DE COLISAGE  ║');
    lines.push('╚════════════════════════════════════════════════╝');
    lines.push('');
    lines.push(`📦 Container: ${container.virtualContainerNumber}`);
    lines.push(`🚢 Route: Chine → Bamako`);
    lines.push(`🛳️ Mode: ${SHIPPING_MODE_LABELS[container.shippingMode]}`);
    lines.push(`🏢 Compagnie: ${SHIPPING_LINE_LABELS[container.shippingLine]}`);
    lines.push(`📅 Date: ${new Date().toLocaleDateString('fr-FR')}`);
    lines.push('');
    lines.push('══════════════════════════════════════════════════');
    lines.push('                    MARCHANDISES                  ');
    lines.push('══════════════════════════════════════════════════');
    lines.push('');

    clients.forEach((client, clientIndex) => {
      lines.push(`👤 CLIENT ${clientIndex + 1}: ${client.clientName}`);
      lines.push(`   📞 ${client.clientPhone}`);
      lines.push('   ──────────────────────────────────────────────');
      lines.push('   N° | ID         | Description      | CBM  | Poids');
      lines.push('   ──────────────────────────────────────────────');

      client.goods.forEach((item, index) => {
        const id = item.goodsId.padEnd(10).substring(0, 10);
        const desc = (item.description || '-').padEnd(16).substring(0, 16);
        lines.push(
          `   ${(index + 1).toString().padStart(2)} | ${id} | ${desc} | ${(item.actualCBM || 0).toFixed(2)} | ${(item.weight || 0).toFixed(0)}kg`
        );
      });

      lines.push('   ──────────────────────────────────────────────');
      lines.push(`   Sous-total: ${client.summary.totalCBM.toFixed(2)} m³ | ${client.summary.totalWeight.toFixed(0)} kg | ${client.summary.totalItems} colis`);
      lines.push('');
    });

    lines.push('══════════════════════════════════════════════════');
    lines.push('                      TOTAUX                      ');
    lines.push('══════════════════════════════════════════════════');
    lines.push(`📦 Total Marchandises: ${summary.totalItems}`);
    lines.push(`📐 Volume Total: ${summary.totalCBM.toFixed(2)} m³`);
    lines.push(`⚖️ Poids Total: ${summary.totalWeight.toFixed(0)} kg`);
    lines.push(`📊 Utilisation: ${summary.capacityPercentage.toFixed(1)}%`);
    lines.push('');
    lines.push('══════════════════════════════════════════════════');
    lines.push('    ChinaLink Express - Transport International   ');
    lines.push('        Tél: +223 XX XX XX XX | Bamako, Mali      ');
    lines.push('══════════════════════════════════════════════════');

    try {
      await Share.share({
        message: lines.join('\n'),
        title: `Liste de Colisage - ${container.virtualContainerNumber}`,
      });
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de partager la liste');
    }
  };

  const handlePrint = async () => {
    if (!packingListData) return;
    setIsGeneratingPDF(true);

    try {
      const { container, clients, summary } = packingListData;

      // Generate HTML for PDF
      const clientRowsHtml = clients.map((client, cIndex) => `
        <div style="margin-bottom: 20px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #f0fdf4, #ffffff); padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h3 style="margin: 0; color: #166534; font-size: 16px;">${client.clientName}</h3>
                <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 13px;">📞 ${client.clientPhone}</p>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 18px; font-weight: bold; color: #16a34a;">${client.goods.length}</div>
                <div style="font-size: 11px; color: #6b7280;">colis</div>
              </div>
            </div>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f9fafb;">
                <th style="padding: 8px 12px; text-align: left; font-size: 11px; color: #166534; border-bottom: 1px solid #e5e7eb;">N°</th>
                <th style="padding: 8px 12px; text-align: left; font-size: 11px; color: #166534; border-bottom: 1px solid #e5e7eb;">ID</th>
                <th style="padding: 8px 12px; text-align: left; font-size: 11px; color: #166534; border-bottom: 1px solid #e5e7eb;">Description</th>
                <th style="padding: 8px 12px; text-align: right; font-size: 11px; color: #166534; border-bottom: 1px solid #e5e7eb;">CBM</th>
                <th style="padding: 8px 12px; text-align: right; font-size: 11px; color: #166534; border-bottom: 1px solid #e5e7eb;">Poids</th>
              </tr>
            </thead>
            <tbody>
              ${client.goods.map((item, index) => `
                <tr style="background: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'};">
                  <td style="padding: 8px 12px; font-size: 12px; color: #16a34a; font-weight: 600;">${index + 1}</td>
                  <td style="padding: 8px 12px; font-size: 11px; color: #374151; font-family: monospace;">${item.goodsId}</td>
                  <td style="padding: 8px 12px; font-size: 12px; color: #4b5563;">${item.description || '-'}</td>
                  <td style="padding: 8px 12px; font-size: 12px; color: #374151; text-align: right; font-weight: 500;">${(item.actualCBM || 0).toFixed(2)}</td>
                  <td style="padding: 8px 12px; font-size: 12px; color: #374151; text-align: right; font-weight: 500;">${(item.weight || 0).toFixed(0)} kg</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div style="background: #f0fdf4; padding: 10px 16px; border-top: 2px solid #bbf7d0;">
            <div style="display: flex; justify-content: space-between; font-size: 13px;">
              <span style="color: #166534; font-weight: 600;">Sous-total Client:</span>
              <span style="color: #166534; font-weight: 700;">${client.summary.totalCBM.toFixed(2)} m³ | ${client.summary.totalWeight.toFixed(0)} kg</span>
            </div>
          </div>
        </div>
      `).join('');

      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Liste de Colisage - ${container.virtualContainerNumber}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 40px; color: #1f2937; }
            .header { text-align: center; margin-bottom: 30px; padding: 24px; background: linear-gradient(135deg, #16a34a, #166534); border-radius: 12px; color: white; }
            .header h1 { margin: 0 0 8px 0; font-size: 24px; letter-spacing: 2px; }
            .header p { margin: 0; opacity: 0.9; }
            .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 30px; }
            .info-item { background: #f9fafb; padding: 12px 16px; border-radius: 8px; }
            .info-label { font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
            .info-value { font-size: 14px; font-weight: 600; color: #374151; }
            .totals { background: linear-gradient(135deg, #f0fdf4, #dcfce7); padding: 20px; border-radius: 12px; margin-top: 30px; border: 2px solid #bbf7d0; }
            .totals-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
            .totals-label { font-size: 14px; color: #166534; }
            .totals-value { font-size: 14px; font-weight: 700; color: #166534; }
            .footer { margin-top: 40px; text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb; }
            .footer p { margin: 4px 0; font-size: 12px; color: #6b7280; }
            .signature-section { margin-top: 40px; display: flex; justify-content: space-between; }
            .signature-box { width: 45%; text-align: center; }
            .signature-line { border-bottom: 1px solid #d1d5db; height: 60px; margin-bottom: 8px; }
            .signature-label { font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>LISTE DE COLISAGE</h1>
            <p>${container.virtualContainerNumber}</p>
          </div>

          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Route</div>
              <div class="info-value">Chine → Bamako</div>
            </div>
            <div class="info-item">
              <div class="info-label">Mode</div>
              <div class="info-value">${SHIPPING_MODE_LABELS[container.shippingMode]}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Compagnie</div>
              <div class="info-value">${SHIPPING_LINE_LABELS[container.shippingLine]}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Date</div>
              <div class="info-value">${new Date().toLocaleDateString('fr-FR')}</div>
            </div>
          </div>

          <h2 style="color: #166534; font-size: 18px; margin-bottom: 16px;">📦 Marchandises par Client</h2>
          ${clientRowsHtml}

          <div class="totals">
            <div class="totals-row">
              <span class="totals-label">Total Marchandises:</span>
              <span class="totals-value">${summary.totalItems} colis (${summary.totalPackages} articles)</span>
            </div>
            <div class="totals-row">
              <span class="totals-label">Volume Total:</span>
              <span class="totals-value">${summary.totalCBM.toFixed(2)} m³ (${summary.capacityPercentage.toFixed(1)}% utilisé)</span>
            </div>
            <div class="totals-row">
              <span class="totals-label">Poids Total:</span>
              <span class="totals-value">${summary.totalWeight.toFixed(0)} kg</span>
            </div>
          </div>

          <div class="signature-section">
            <div class="signature-box">
              <div class="signature-line"></div>
              <div class="signature-label">Signature du Client</div>
            </div>
            <div class="signature-box">
              <div class="signature-line"></div>
              <div class="signature-label">Signature Admin</div>
            </div>
          </div>

          <div class="footer">
            <p>Document généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
            <p><strong>ChinaLink Express</strong> - Transport International</p>
            <p>Bamako, Mali | Tél: +223 XX XX XX XX</p>
          </div>
        </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({
        html,
        base64: false,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: `Liste de Colisage - ${container.virtualContainerNumber}`,
          UTI: 'com.adobe.pdf',
        });
      } else {
        Alert.alert('PDF Généré', `Fichier sauvegardé: ${uri}`);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de générer le PDF');
      console.error('PDF generation error:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleToggleAll = () => {
    setAllExpanded((prev) => !prev);
  };

  const handleGoToLoadingList = () => {
    navigation.navigate('LoadingList', { containerId });
  };

  const formatDate = (date: Date | string): string => {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  if (isContainerLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Theme.primary[500]} />
          <Text style={styles.loadingText}>Chargement de la liste...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!container || !packingListData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={64} color={Theme.status.error} />
          <Text style={styles.errorText}>Container non trouvé</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const { clients, summary } = packingListData;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Header */}
      <LinearGradient
        colors={[Theme.primary[600], Theme.primary[800]]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backIconButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Liste de Colisage</Text>
          <TouchableOpacity
            style={styles.loadingListButton}
            onPress={handleGoToLoadingList}
          >
            <Ionicons name="list" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>
          {container.virtualContainerNumber}
        </Text>
        <Text style={styles.headerMeta}>
          {clients.length} client{clients.length > 1 ? 's' : ''} • {summary.totalItems} colis
        </Text>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Capacity Overview */}
        <Animated.View entering={FadeInUp.delay(100)}>
          <View style={styles.capacityCard}>
            <View style={styles.capacityHeader}>
              <Ionicons name="speedometer" size={20} color={Theme.primary[600]} />
              <Text style={styles.capacityTitle}>Utilisation du Container</Text>
            </View>
            <CapacityUsageBar
              used={summary.totalCBM}
              max={MAX_CBM}
              unit="m³"
              showPercentage
              showLabels
              height={28}
              variant="cbm"
            />
            <View style={styles.capacityStats}>
              <View style={styles.capacityStat}>
                <Text style={styles.capacityStatValue}>{summary.totalItems}</Text>
                <Text style={styles.capacityStatLabel}>Colis</Text>
              </View>
              <View style={styles.capacityStatDivider} />
              <View style={styles.capacityStat}>
                <Text style={styles.capacityStatValue}>{summary.totalPackages}</Text>
                <Text style={styles.capacityStatLabel}>Articles</Text>
              </View>
              <View style={styles.capacityStatDivider} />
              <View style={styles.capacityStat}>
                <Text style={styles.capacityStatValue}>{summary.totalWeight.toFixed(0)}</Text>
                <Text style={styles.capacityStatLabel}>Kg</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Client Sections Header */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeaderLeft}>
            <Ionicons name="people" size={18} color={Theme.neutral[600]} />
            <Text style={styles.sectionHeaderTitle}>Marchandises par Client</Text>
          </View>
          <TouchableOpacity onPress={handleToggleAll} style={styles.expandAllButton}>
            <Text style={styles.expandAllText}>
              {allExpanded ? 'Tout réduire' : 'Tout déplier'}
            </Text>
            <Ionicons
              name={allExpanded ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={Theme.primary[600]}
            />
          </TouchableOpacity>
        </View>

        {/* Client Sections */}
        {clients.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={64} color={Theme.neutral[400]} />
            <Text style={styles.emptyTitle}>Aucune marchandise</Text>
            <Text style={styles.emptySubtitle}>
              Ce container ne contient aucune marchandise
            </Text>
          </View>
        ) : (
          clients.map((clientGroup, index) => (
            <ClientGoodsSection
              key={clientGroup.clientId}
              clientGroup={clientGroup}
              index={index}
              defaultExpanded={allExpanded}
            />
          ))
        )}

        {/* Container Summary */}
        {clients.length > 0 && (
          <Animated.View entering={FadeInUp.delay(300)} style={styles.summaryCard}>
            <LinearGradient
              colors={[Theme.primary[50], '#FFFFFF']}
              style={styles.summaryGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.summaryHeader}>
                <Ionicons name="document-text" size={20} color={Theme.primary[600]} />
                <Text style={styles.summaryTitle}>Récapitulatif</Text>
              </View>

              <View style={styles.summaryGrid}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryItemValue}>{summary.totalItems}</Text>
                  <Text style={styles.summaryItemLabel}>Total Colis</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryItemValue}>{summary.totalPackages}</Text>
                  <Text style={styles.summaryItemLabel}>Total Articles</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryItemValue}>{summary.totalCBM.toFixed(2)}</Text>
                  <Text style={styles.summaryItemLabel}>Volume (m³)</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryItemValue}>{summary.totalWeight.toFixed(0)}</Text>
                  <Text style={styles.summaryItemLabel}>Poids (kg)</Text>
                </View>
              </View>

              <View style={styles.summaryFooter}>
                <Text style={styles.summaryFooterText}>
                  Généré le {formatDate(new Date())}
                </Text>
              </View>
            </LinearGradient>
          </Animated.View>
        )}

        {/* Spacer for scroll */}
        <View style={{ height: Theme.spacing['4xl'] }} />
      </ScrollView>

      {/* Action Buttons */}
      <Animated.View entering={FadeInUp.delay(400)} style={styles.actionBar}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleShare}
          disabled={clients.length === 0}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={Theme.gradients.ocean}
            style={styles.actionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="share-social" size={20} color="#FFF" />
            <Text style={styles.actionButtonText}>Partager</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonPrimary]}
          onPress={handlePrint}
          disabled={clients.length === 0 || isGeneratingPDF}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={Theme.gradients.primary}
            style={styles.actionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {isGeneratingPDF ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <>
                <Ionicons name="print" size={20} color="#FFF" />
                <Text style={styles.actionButtonText}>PDF / Imprimer</Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: Theme.spacing.md,
    fontSize: 16,
    color: Theme.neutral[500],
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing['2xl'],
  },
  errorText: {
    marginTop: Theme.spacing.lg,
    fontSize: 18,
    fontWeight: '600',
    color: Theme.neutral[700],
  },
  backButton: {
    marginTop: Theme.spacing.xl,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    backgroundColor: Theme.primary[500],
    borderRadius: Theme.radius.lg,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
    paddingHorizontal: Theme.spacing.lg,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIconButton: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingListButton: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    textAlign: 'center',
    marginTop: Theme.spacing.md,
  },
  headerMeta: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: Theme.spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Theme.spacing.lg,
  },
  capacityCard: {
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius['2xl'],
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.md,
  },
  capacityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  capacityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  capacityStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[100],
  },
  capacityStat: {
    alignItems: 'center',
  },
  capacityStatValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Theme.primary[600],
  },
  capacityStatLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.neutral[500],
    marginTop: 2,
  },
  capacityStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: Theme.neutral[200],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[700],
  },
  expandAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: Theme.spacing.sm,
  },
  expandAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.primary[600],
  },
  emptyState: {
    padding: Theme.spacing['3xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    marginTop: Theme.spacing.lg,
    fontSize: 18,
    fontWeight: '600',
    color: Theme.neutral[600],
  },
  emptySubtitle: {
    marginTop: Theme.spacing.xs,
    fontSize: 14,
    fontWeight: '500',
    color: Theme.neutral[400],
    textAlign: 'center',
  },
  summaryCard: {
    borderRadius: Theme.radius['2xl'],
    overflow: 'hidden',
    marginTop: Theme.spacing.lg,
    ...Theme.shadows.md,
  },
  summaryGradient: {
    padding: Theme.spacing.lg,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
  },
  summaryItem: {
    flex: 1,
    minWidth: 70,
    alignItems: 'center',
    padding: Theme.spacing.md,
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius.lg,
    ...Theme.shadows.sm,
  },
  summaryItemValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Theme.primary[600],
  },
  summaryItemLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.neutral[500],
    marginTop: 4,
  },
  summaryFooter: {
    marginTop: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[200],
    alignItems: 'center',
  },
  summaryFooterText: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.neutral[500],
  },
  actionBar: {
    flexDirection: 'row',
    padding: Theme.spacing.lg,
    gap: Theme.spacing.md,
    backgroundColor: Theme.neutral.white,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[100],
  },
  actionButton: {
    flex: 1,
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
  },
  actionButtonPrimary: {
    flex: 1.2,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
  },
});

export default PackingListScreen;
