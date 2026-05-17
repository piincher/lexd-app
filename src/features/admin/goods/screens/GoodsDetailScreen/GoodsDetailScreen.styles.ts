import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Header
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerContent: {
    alignItems: 'center',
  },
  goodsIdBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  badgeIcon: {
    marginRight: 8,
  },
  goodsIdText: {
    color: colors.text.inverse,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  statusWrapper: {
    transform: [{ scale: 1.1 }],
  },

  // ScrollView
  scrollView: {
    flex: 1,
    marginTop: -20,
    paddingHorizontal: 16,
  },

  // QR Card
  qrCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: colors.primary[600],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  qrGradient: {
    padding: 20,
  },
  qrHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  qrTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[800],
    marginLeft: 10,
  },
  qrContent: {
    alignItems: 'center',
  },
  qrImageContainer: {
    backgroundColor: colors.background.card,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.primary[200],
    elevation: 2,
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  qrHint: {
    marginTop: 12,
    fontSize: 13,
    color: colors.neutral[500],
    fontStyle: 'italic',
  },
  shareButton: {
    marginTop: 16,
    borderColor: colors.primary[600],
    borderRadius: 10,
  },
  qrEmpty: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  qrEmptyText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.neutral[500],
  },

  // Photo Card
  photoCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  photoWrapper: {
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: 200,
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background.overlay,
    padding: 12,
  },
  photoLabel: {
    color: colors.text.inverse,
    fontSize: 13,
    fontWeight: '600',
  },
  photoBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.background.overlay,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  photoBadgeText: {
    color: colors.text.inverse,
    fontSize: 12,
    fontWeight: '700',
  },

  // Section Card
  sectionCard: {
    marginBottom: 12,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: colors.background.card,
  },
  financialCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.status.success,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[800],
    marginLeft: 10,
  },
  description: {
    fontSize: 15,
    color: colors.neutral[600],
    lineHeight: 22,
  },
  trackingNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[800],
    letterSpacing: 0.5,
  },

  // Client Section
  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientInfo: {
    marginLeft: 16,
  },
  clientName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.neutral[800],
  },
  clientPhoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  clientPhone: {
    fontSize: 14,
    color: colors.neutral[500],
    marginLeft: 6,
  },

  // Property Grid
  propertyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  propertyItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: colors.neutral[50],
    borderRadius: 12,
    marginHorizontal: 4,
  },
  propertyItemHighlight: {
    backgroundColor: colors.primary[50],
    borderWidth: 2,
    borderColor: colors.primary[200],
  },
  propertyLabel: {
    fontSize: 12,
    color: colors.neutral[500],
    marginTop: 6,
    fontWeight: '500',
  },
  propertyValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.neutral[800],
    marginTop: 4,
  },
  propertyValueHighlight: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary[600],
    marginTop: 4,
  },

  // Dimensions
  dimensionsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    padding: 14,
    borderRadius: 10,
  },
  dimensionsText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[700],
    marginLeft: 10,
  },

  // Location
  locationGrid: {
    gap: 12,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: colors.neutral[500],
    marginBottom: 2,
  },
  locationValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.neutral[800],
  },
  locationSubtext: {
    fontSize: 13,
    color: colors.neutral[500],
    marginTop: 2,
  },

  // Financial Section
  financialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  financialRowHighlight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary[50],
    padding: 14,
    borderRadius: 10,
    marginVertical: 8,
  },
  financialLabel: {
    fontSize: 14,
    color: colors.neutral[600],
  },
  financialLabelHighlight: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[700],
  },
  financialValue: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.neutral[800],
  },
  financialValueTotal: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary[600],
  },
  divider: {
    marginVertical: 8,
    backgroundColor: colors.neutral[200],
  },
  paymentStatusContainer: {
    marginTop: 16,
    alignItems: 'flex-start',
  },
  paymentChip: {
    height: 36,
    paddingHorizontal: 8,
  },

  // Reception
  receptionGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  receptionItem: {
    flex: 1,
    backgroundColor: colors.neutral[50],
    padding: 14,
    borderRadius: 12,
  },
  receptionLabel: {
    fontSize: 12,
    color: colors.neutral[500],
    marginBottom: 4,
  },
  receptionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[800],
  },

  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 8,
  },
  editButton: {
    flex: 1,
    backgroundColor: colors.primary[600],
    borderRadius: 12,
    elevation: 2,
  },
  deleteButton: {
    flex: 1,
    borderColor: colors.status.error,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  bottomSpacer: {
    height: 40,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.neutral[500],
  },
});
