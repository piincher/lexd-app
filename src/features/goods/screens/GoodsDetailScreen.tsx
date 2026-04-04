// Goods Feature - GoodsDetailScreen
// Comprehensive detail screen for viewing a single goods item

import React from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	Image,
	Share,
	Pressable,
} from 'react-native';
import {
	Text,
	Appbar,
	ActivityIndicator,
	Button,
	Card,
	Divider,
	useTheme,
	Chip,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackScreenProps } from '@src/navigations/type';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { useGetGoodsDetail } from '../hooks';
import { StatusBadge } from '../components';
import { ReviewPrompt } from '@src/features/customer/reviews';
import { GoodsStatus } from '../api';
import { useAuth } from '@src/store/Auth';

// ── Helpers ─────────────────────────────────────────────────────────────

const formatCurrency = (amount?: number): string => {
	return `${(amount ?? 0).toLocaleString('fr-FR')} FCFA`;
};

const formatDate = (dateString?: string): string => {
	if (!dateString) return 'N/A';
	const date = new Date(dateString);
	return date.toLocaleDateString('fr-FR', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	});
};

const formatDateTime = (dateString?: string): string => {
	if (!dateString) return 'N/A';
	const date = new Date(dateString);
	return date.toLocaleDateString('fr-FR', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
};

const getShippingModeConfig = (mode?: string) => {
	if (mode === 'AIR') {
		return { label: 'Aérien', icon: 'airplane' as const, color: '#3F51B5', bg: '#E8EAF6' };
	}
	return { label: 'Maritime', icon: 'ferry' as const, color: '#0277BD', bg: '#E1F5FE' };
};

const getPaymentColors = (status: string) => {
	switch (status) {
		case 'PAID':
			return { bg: '#E8F5E9', text: '#2E7D32', label: 'Payé' };
		case 'PARTIAL':
			return { bg: '#FFF3E0', text: '#E65100', label: 'Partiel' };
		default:
			return { bg: '#FFEBEE', text: '#C62828', label: 'Non payé' };
	}
};

// ── Status Timeline ─────────────────────────────────────────────────────

const STATUS_STEPS: { key: GoodsStatus; label: string; icon: string }[] = [
	{ key: 'RECEIVED_AT_WAREHOUSE', label: 'Reçu', icon: 'package-variant' },
	{ key: 'ASSIGNED_TO_CONTAINER', label: 'Assigné', icon: 'clipboard-check' },
	{ key: 'LOADED_IN_CONTAINER', label: 'Chargé', icon: 'package-up' },
	{ key: 'IN_TRANSIT', label: 'En Transit', icon: 'truck-delivery' },
	{ key: 'ARRIVED_DESTINATION', label: 'Arrivé', icon: 'flag-checkered' },
	{ key: 'READY_FOR_PICKUP', label: 'Prêt', icon: 'hand-wave' },
	{ key: 'DELIVERED', label: 'Livré', icon: 'check-circle' },
];

const getStatusIndex = (status: GoodsStatus): number => {
	return STATUS_STEPS.findIndex((s) => s.key === status);
};

// ── Main Component ──────────────────────────────────────────────────────

const GoodsDetailScreen = ({
	route,
	navigation,
}: RootStackScreenProps<'GoodsDetail'>) => {
	const { goodsId } = route.params;
	const theme = useTheme();
	const userRole = useAuth((state) => state.user?.role);
	const isAdmin = userRole === 'admin';

	const { data: goods, isLoading, isError, error, refetch } = useGetGoodsDetail(goodsId);

	const handleEdit = () => {
		navigation.navigate('EditGoods', { goodsId });
	};

	const handleShare = async () => {
		if (!goods) return;
		try {
			await Share.share({
				message: `Marchandise ${goods.goodsId} - ${goods.description}\nStatut: ${goods.status}`,
				title: `Détails Marchandise ${goods.goodsId}`,
			});
		} catch (err) {
			console.error('Error sharing:', err);
		}
	};

	if (isLoading) {
		return (
			<SafeAreaView style={styles.container}>
				<Appbar.Header>
					<Appbar.BackAction onPress={() => navigation.goBack()} />
					<Appbar.Content title="Détails" />
				</Appbar.Header>
				<View style={styles.centerContainer}>
					<ActivityIndicator size="large" color={theme.colors.primary} />
					<Text style={styles.loadingText}>Chargement des détails...</Text>
				</View>
			</SafeAreaView>
		);
	}

	if (isError || !goods) {
		return (
			<SafeAreaView style={styles.container}>
				<Appbar.Header>
					<Appbar.BackAction onPress={() => navigation.goBack()} />
					<Appbar.Content title="Détails" />
				</Appbar.Header>
				<View style={styles.centerContainer}>
					<MaterialCommunityIcons name="alert-circle" size={64} color={theme.colors.error} />
					<Text style={styles.errorTitle}>Erreur de chargement</Text>
					<Text style={styles.errorText}>
						{error?.message || 'Impossible de charger les détails de cette marchandise.'}
					</Text>
					<Button mode="contained" onPress={() => refetch()} style={styles.retryButton}>
						Réessayer
					</Button>
				</View>
			</SafeAreaView>
		);
	}

	const images = goods.photos || goods.images || [];
	const hasImages = images.length > 0;
	const cbm = goods.actualCBM || goods.cbm || 0;
	const weight = goods.weight || 0;
	const shippingConfig = getShippingModeConfig(goods.shippingMode);
	const paymentConfig = getPaymentColors(goods.paymentStatus);
	const currentStatusIndex = getStatusIndex(goods.status);
	const balanceDue = goods.balanceDue ?? Math.max(0, (goods.totalCost ?? 0) - (goods.amountPaid ?? 0));
	const hasDimensions = goods.dimensions &&
		(goods.dimensions.length || goods.dimensions.width || goods.dimensions.height);
	const qrCodeUrl = goods.qrCodeImageUrl || goods.qrCode;

	const handleNavigateToContainer = () => {
		if (goods.containerId?._id) {
			navigation.navigate('ContainerTracking', { containerId: goods.containerId._id });
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Appbar.Header>
				<Appbar.BackAction onPress={() => navigation.goBack()} />
				<Appbar.Content title={goods.goodsId} titleStyle={styles.headerTitle} />
				{isAdmin && (
					<Appbar.Action icon="pencil" onPress={handleEdit} />
				)}
				<Appbar.Action icon="share-variant" onPress={handleShare} />
			</Appbar.Header>

			<ScrollView contentContainerStyle={styles.scrollContent}>
				{/* ── Header: Status + Shipping Mode ─────────────────── */}
				<View style={styles.statusHeader}>
					<View style={styles.statusHeaderLeft}>
						<StatusBadge status={goods.status} />
						<View style={[styles.shippingBadge, { backgroundColor: shippingConfig.bg }]}>
							<MaterialCommunityIcons
								name={shippingConfig.icon}
								size={16}
								color={shippingConfig.color}
							/>
							<Text style={[styles.shippingBadgeText, { color: shippingConfig.color }]}>
								{shippingConfig.label}
							</Text>
						</View>
					</View>
					<Text style={styles.dateText}>
						{formatDate(goods.receivedAt || goods.createdAt)}
					</Text>
				</View>

				{/* ── Photo ───────────────────────────────────────────── */}
				<Card style={styles.photoCard}>
					{hasImages ? (
						<Image
							source={{ uri: images[0] }}
							style={styles.mainImage}
							resizeMode="cover"
						/>
					) : (
						<View style={[styles.mainImage, styles.placeholderImage]}>
							<MaterialCommunityIcons
								name="package-variant"
								size={64}
								color={COLORS.SlateGray}
							/>
							<Text style={styles.placeholderText}>Aucune photo</Text>
						</View>
					)}
				</Card>

				{/* ── Quick Stats Row ─────────────────────────────────── */}
				<View style={styles.statsRow}>
					<View style={styles.statBox}>
						<MaterialCommunityIcons name="cube-outline" size={22} color={COLORS.green} />
						<Text style={styles.statValue}>{cbm.toFixed(3)}</Text>
						<Text style={styles.statLabel}>CBM (m³)</Text>
					</View>
					<View style={styles.statDivider} />
					<View style={styles.statBox}>
						<MaterialCommunityIcons name="weight" size={22} color={COLORS.green} />
						<Text style={styles.statValue}>{weight} kg</Text>
						<Text style={styles.statLabel}>Poids</Text>
					</View>
					<View style={styles.statDivider} />
					<View style={styles.statBox}>
						<MaterialCommunityIcons name="package-variant-closed" size={22} color={COLORS.green} />
						<Text style={styles.statValue}>{goods.quantity}</Text>
						<Text style={styles.statLabel}>Quantité</Text>
					</View>
				</View>

				{/* ── Description & Details Card ──────────────────────── */}
				<Card style={styles.sectionCard}>
					<View style={styles.sectionHeader}>
						<MaterialCommunityIcons name="information" size={20} color={theme.colors.primary} />
						<Text style={styles.sectionTitle}>Informations</Text>
					</View>
					<Card.Content>
						{/* Description */}
						<Text style={styles.descriptionText}>{goods.description || 'Aucune description'}</Text>
						<Divider style={styles.divider} />

						{/* Express Tracking Number */}
						{goods.expressTrackingNumber && (
							<>
								<View style={styles.infoRow}>
									<Text style={styles.infoLabel}>N° de suivi express</Text>
									<Text style={[styles.infoValue, { fontFamily: Fonts.bold, letterSpacing: 0.5 }]}>
										{goods.expressTrackingNumber}
									</Text>
								</View>
								<Divider style={styles.divider} />
							</>
						)}

						{/* Dimensions */}
						{hasDimensions && (
							<>
								<View style={styles.infoRow}>
									<Text style={styles.infoLabel}>Dimensions (cm)</Text>
									<Text style={styles.infoValue}>
										{goods.dimensions!.length ?? '-'} × {goods.dimensions!.width ?? '-'} × {goods.dimensions!.height ?? '-'}
									</Text>
								</View>
								<Divider style={styles.divider} />
							</>
						)}

						{/* Warehouse Location */}
						<View style={styles.infoRow}>
							<Text style={styles.infoLabel}>Emplacement entrepôt</Text>
							<View style={styles.locationBadge}>
								<MaterialCommunityIcons name="warehouse" size={14} color={COLORS.blue} />
								<Text style={styles.locationBadgeText}>
									{goods.warehouseLocation || 'Non assigné'}
								</Text>
							</View>
						</View>
						<Divider style={styles.divider} />

						{/* Received Date */}
						<View style={styles.infoRow}>
							<Text style={styles.infoLabel}>Date de réception</Text>
							<Text style={styles.infoValue}>
								{formatDate(goods.receivedAt || goods.createdAt)}
							</Text>
						</View>

						{/* Received By */}
						{goods.receivedByName ? (
							<>
								<Divider style={styles.divider} />
								<View style={styles.infoRow}>
									<Text style={styles.infoLabel}>Reçu par</Text>
									<Text style={styles.infoValue}>{goods.receivedByName}</Text>
								</View>
							</>
						) : null}

						{/* Loading Position */}
						{goods.loadingPosition?.section && (
							<>
								<Divider style={styles.divider} />
								<View style={styles.infoRow}>
									<Text style={styles.infoLabel}>Position chargement</Text>
									<Text style={styles.infoValue}>
										{goods.loadingPosition.section === 'FRONT' ? 'Avant' :
											goods.loadingPosition.section === 'MIDDLE' ? 'Milieu' : 'Arrière'}
										{goods.loadingPosition.sequenceNumber ? ` (#${goods.loadingPosition.sequenceNumber})` : ''}
									</Text>
								</View>
							</>
						)}
					</Card.Content>
				</Card>

				{/* ── Status Timeline ─────────────────────────────────── */}
				<Card style={styles.sectionCard}>
					<View style={styles.sectionHeader}>
						<MaterialCommunityIcons name="timeline-clock" size={20} color={theme.colors.primary} />
						<Text style={styles.sectionTitle}>Suivi du statut</Text>
					</View>
					<Card.Content>
						<View style={styles.timeline}>
							{STATUS_STEPS.map((step, index) => {
								const isCompleted = index <= currentStatusIndex;
								const isCurrent = index === currentStatusIndex;
								const isLast = index === STATUS_STEPS.length - 1;
								const stepColor = isCompleted ? COLORS.green : '#D1D5DB';

								return (
									<View key={step.key} style={styles.timelineStep}>
										{/* Connector line above */}
										{index > 0 && (
											<View
												style={[
													styles.timelineConnector,
													{ backgroundColor: isCompleted ? COLORS.green : '#E5E7EB' },
												]}
											/>
										)}
										{/* Icon circle */}
										<View
											style={[
												styles.timelineCircle,
												{
													backgroundColor: isCompleted ? COLORS.green : '#F3F4F6',
													borderColor: isCurrent ? COLORS.gold : 'transparent',
													borderWidth: isCurrent ? 2 : 0,
												},
											]}
										>
											<MaterialCommunityIcons
												name={step.icon as any}
												size={16}
												color={isCompleted ? '#fff' : '#9CA3AF'}
											/>
										</View>
										{/* Label */}
										<Text
											style={[
												styles.timelineLabel,
												{
													color: isCompleted ? COLORS.DarkGrey : '#9CA3AF',
													fontFamily: isCurrent ? Fonts.bold : Fonts.regular,
												},
											]}
										>
											{step.label}
										</Text>
									</View>
								);
							})}
						</View>

						{/* Key dates */}
						<View style={styles.keyDates}>
							{goods.readyForPickupAt && (
								<View style={styles.keyDateRow}>
									<MaterialCommunityIcons name="calendar-check" size={14} color={COLORS.DimGray} />
									<Text style={styles.keyDateText}>
										Prêt le {formatDateTime(goods.readyForPickupAt)}
									</Text>
								</View>
							)}
							{goods.deliveredAt && (
								<View style={styles.keyDateRow}>
									<MaterialCommunityIcons name="calendar-check" size={14} color={COLORS.green} />
									<Text style={styles.keyDateText}>
										Livré le {formatDateTime(goods.deliveredAt)}
									</Text>
								</View>
							)}
						</View>
					</Card.Content>
				</Card>

				{/* ── Pricing & Payment Card ──────────────────────────── */}
				<Card style={styles.sectionCard}>
					<View style={styles.sectionHeader}>
						<MaterialCommunityIcons name="cash-multiple" size={20} color={theme.colors.primary} />
						<Text style={styles.sectionTitle}>Tarification & Paiement</Text>
					</View>
					<Card.Content>
						{/* Unit Price */}
						{goods.unitPrice != null && goods.unitPrice > 0 && (
							<>
								<View style={styles.infoRow}>
									<Text style={styles.infoLabel}>Prix unitaire</Text>
									<Text style={styles.infoValue}>{formatCurrency(goods.unitPrice)}</Text>
								</View>
								<Divider style={styles.divider} />
							</>
						)}

						{/* Total Cost */}
						<View style={styles.infoRow}>
							<Text style={styles.infoLabel}>Coût total</Text>
							<Text style={[styles.infoValue, styles.totalCostText]}>
								{formatCurrency(goods.totalCost)}
							</Text>
						</View>
						<Divider style={styles.divider} />

						{/* Amount Paid */}
						<View style={styles.infoRow}>
							<Text style={styles.infoLabel}>Montant payé</Text>
							<Text style={[styles.infoValue, { color: COLORS.green }]}>
								{formatCurrency(goods.amountPaid)}
							</Text>
						</View>
						<Divider style={styles.divider} />

						{/* Balance Due */}
						<View style={styles.infoRow}>
							<Text style={styles.infoLabel}>Solde restant</Text>
							<Text
								style={[
									styles.infoValue,
									{ color: balanceDue > 0 ? '#C62828' : COLORS.green },
								]}
							>
								{formatCurrency(balanceDue)}
							</Text>
						</View>
						<Divider style={styles.divider} />

						{/* Payment Status */}
						<View style={styles.infoRow}>
							<Text style={styles.infoLabel}>Statut paiement</Text>
							<Chip
								style={[styles.paymentChip, { backgroundColor: paymentConfig.bg }]}
								textStyle={{ color: paymentConfig.text, fontFamily: Fonts.bold, fontSize: 12 }}
								compact
							>
								{paymentConfig.label}
							</Chip>
						</View>
					</Card.Content>
				</Card>

				{/* ── Payment History ─────────────────────────────────── */}
				{goods.paymentHistory && goods.paymentHistory.length > 0 && (
					<Card style={styles.sectionCard}>
						<View style={styles.sectionHeader}>
							<MaterialCommunityIcons name="history" size={20} color={theme.colors.primary} />
							<Text style={styles.sectionTitle}>Historique des paiements</Text>
						</View>
						<Card.Content>
							{goods.paymentHistory.map((payment, index) => (
								<View key={payment.paymentId || index}>
									<View style={styles.paymentHistoryRow}>
										<View style={styles.paymentHistoryLeft}>
											<MaterialCommunityIcons
												name="check-circle"
												size={16}
												color={COLORS.green}
											/>
											<Text style={styles.paymentHistoryDate}>
												{formatDateTime(payment.date)}
											</Text>
										</View>
										<Text style={styles.paymentHistoryAmount}>
											{formatCurrency(payment.amount)}
										</Text>
									</View>
									{index < goods.paymentHistory!.length - 1 && (
										<Divider style={styles.divider} />
									)}
								</View>
							))}
						</Card.Content>
					</Card>
				)}

				{/* ── Container Info ──────────────────────────────────── */}
				{goods.containerId && (
					<Card style={styles.sectionCard}>
						<View style={styles.sectionHeader}>
							<MaterialCommunityIcons name="cube" size={20} color={theme.colors.primary} />
							<Text style={styles.sectionTitle}>Container</Text>
						</View>
						<Card.Content>
							<Pressable onPress={handleNavigateToContainer}>
								<View style={styles.containerBox}>
									<MaterialCommunityIcons
										name={goods.shippingMode === 'AIR' ? 'airplane' : 'ferry'}
										size={36}
										color={theme.colors.primary}
									/>
									<View style={styles.containerBoxInfo}>
										<Text style={styles.containerBoxLabel}>
											Votre marchandise est dans le container:
										</Text>
										<Text style={styles.containerBoxNumber}>
											{typeof goods.containerId === 'object'
												? goods.containerId.virtualContainerNumber
												: goods.containerId}
										</Text>
									</View>
									<MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.DimGray} />
								</View>
							</Pressable>
							<Button
								mode="contained"
								onPress={handleNavigateToContainer}
								style={styles.trackButton}
								icon="map-marker-path"
							>
								Suivre le Container
							</Button>
						</Card.Content>
					</Card>
				)}

				{/* ── Pickup Status ───────────────────────────────────── */}
				{(goods.status === 'READY_FOR_PICKUP' || goods.status === 'DELIVERED') && (
					<Card style={styles.sectionCard}>
						<View style={styles.sectionHeader}>
							<MaterialCommunityIcons
								name={goods.status === 'DELIVERED' ? 'check-circle' : 'package-variant'}
								size={20}
								color={goods.status === 'DELIVERED' ? COLORS.green : '#D97706'}
							/>
							<Text style={styles.sectionTitle}>Statut de Retrait</Text>
						</View>
						<Card.Content>
							{goods.status === 'READY_FOR_PICKUP' && (
								<>
									<View style={[styles.pickupBanner, { backgroundColor: '#FEF3C7' }]}>
										<MaterialCommunityIcons name="package-variant" size={20} color="#D97706" />
										<Text style={[styles.pickupBannerText, { color: '#92400E' }]}>
											Prêt pour Retrait
										</Text>
									</View>
									<View style={styles.pickupLocation}>
										<MaterialCommunityIcons name="warehouse" size={20} color={COLORS.DimGray} />
										<View style={{ marginLeft: 12, flex: 1 }}>
											<Text style={styles.pickupLocationTitle}>Lieu de Retrait</Text>
											<Text style={styles.pickupLocationAddress}>
												Entrepôt Bamako - Zone Industrielle
											</Text>
										</View>
									</View>
									<View style={styles.pickupMessage}>
										<MaterialCommunityIcons name="information" size={18} color={theme.colors.primary} />
										<Text style={styles.pickupMessageText}>
											Contactez-nous pour organiser le retrait de votre marchandise
										</Text>
									</View>
								</>
							)}
							{goods.status === 'DELIVERED' && (
								<>
									<View style={[styles.pickupBanner, { backgroundColor: '#D1FAE5' }]}>
										<MaterialCommunityIcons name="check-circle" size={20} color="#059669" />
										<Text style={[styles.pickupBannerText, { color: '#065F46' }]}>
											Livré avec succès
										</Text>
									</View>
									{goods.deliveredAt && (
										<View style={styles.infoRow}>
											<Text style={styles.infoLabel}>Date de livraison</Text>
											<Text style={styles.infoValue}>{formatDateTime(goods.deliveredAt)}</Text>
										</View>
									)}
									{goods.pickedUpBy && (
										<>
											<Divider style={styles.divider} />
											<View style={styles.infoRow}>
												<Text style={styles.infoLabel}>Retiré par</Text>
												<Text style={styles.infoValue}>{goods.pickedUpBy}</Text>
											</View>
										</>
									)}
									{goods.pickupNotes && (
										<>
											<Divider style={styles.divider} />
											<View style={styles.infoRow}>
												<Text style={styles.infoLabel}>Notes</Text>
												<Text style={styles.infoValue}>{goods.pickupNotes}</Text>
											</View>
										</>
									)}
								</>
							)}
						</Card.Content>
					</Card>
				)}

				{/* ── QR Code ─────────────────────────────────────────── */}
				{qrCodeUrl && (
					<Card style={styles.sectionCard}>
						<View style={styles.sectionHeader}>
							<MaterialCommunityIcons name="qrcode" size={20} color={theme.colors.primary} />
							<Text style={styles.sectionTitle}>Code QR</Text>
						</View>
						<Card.Content style={styles.qrContent}>
							<Image source={{ uri: qrCodeUrl }} style={styles.qrImage} />
							<Text style={styles.qrText}>
								Scannez ce code pour identifier la marchandise
							</Text>
						</Card.Content>
					</Card>
				)}

				{/* ── Review Section — available once goods are assigned to container ── */}
				{['ASSIGNED_TO_CONTAINER', 'LOADED_IN_CONTAINER', 'IN_TRANSIT', 'ARRIVED_DESTINATION', 'READY_FOR_PICKUP', 'DELIVERED'].includes(goods.status) && (
					<View style={styles.reviewSection}>
						<ReviewPrompt goodsId={goods._id} goodsLabel={goods.goodsId} />
					</View>
				)}

				<View style={styles.bottomPadding} />
			</ScrollView>
		</SafeAreaView>
	);
};

// ── Styles ──────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.lightBackground,
	},
	headerTitle: {
		fontFamily: Fonts.bold,
	},
	scrollContent: {
		paddingBottom: 32,
	},
	centerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 32,
	},
	loadingText: {
		marginTop: 16,
		fontFamily: Fonts.medium,
		color: COLORS.DimGray,
	},
	errorTitle: {
		fontSize: 18,
		fontFamily: Fonts.bold,
		color: COLORS.DarkGrey,
		marginTop: 16,
	},
	errorText: {
		fontSize: 14,
		fontFamily: Fonts.regular,
		color: COLORS.DimGray,
		textAlign: 'center',
		marginTop: 8,
	},
	retryButton: {
		marginTop: 24,
	},

	// ── Status Header ──
	statusHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: 'white',
		marginBottom: 8,
	},
	statusHeaderLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	shippingBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 12,
		gap: 4,
	},
	shippingBadgeText: {
		fontFamily: Fonts.bold,
		fontSize: 12,
	},
	dateText: {
		fontFamily: Fonts.regular,
		color: COLORS.DimGray,
		fontSize: 11,
	},

	// ── Photo ──
	photoCard: {
		marginHorizontal: 16,
		marginBottom: 12,
		elevation: 2,
		borderRadius: 12,
		overflow: 'hidden',
	},
	mainImage: {
		width: '100%',
		height: 220,
		backgroundColor: COLORS.Silver,
	},
	placeholderImage: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	placeholderText: {
		fontFamily: Fonts.medium,
		color: COLORS.DimGray,
		marginTop: 8,
		fontSize: 13,
	},

	// ── Quick Stats ──
	statsRow: {
		flexDirection: 'row',
		backgroundColor: 'white',
		marginHorizontal: 16,
		marginBottom: 12,
		borderRadius: 12,
		paddingVertical: 16,
		elevation: 1,
	},
	statBox: {
		flex: 1,
		alignItems: 'center',
	},
	statValue: {
		fontFamily: Fonts.bold,
		fontSize: 16,
		color: COLORS.DarkGrey,
		marginTop: 4,
	},
	statLabel: {
		fontFamily: Fonts.regular,
		fontSize: 11,
		color: COLORS.DimGray,
		marginTop: 2,
	},
	statDivider: {
		width: 1,
		backgroundColor: COLORS.border,
	},

	// ── Section Cards ──
	sectionCard: {
		marginHorizontal: 16,
		marginBottom: 12,
		elevation: 2,
		borderRadius: 12,
	},
	sectionHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 8,
		gap: 8,
	},
	sectionTitle: {
		fontFamily: Fonts.bold,
		fontSize: 15,
		color: COLORS.DarkGrey,
	},

	// ── Info Rows ──
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10,
	},
	infoLabel: {
		fontFamily: Fonts.medium,
		color: COLORS.DimGray,
		fontSize: 13,
	},
	infoValue: {
		fontFamily: Fonts.bold,
		color: COLORS.DarkGrey,
		fontSize: 13,
		flex: 1,
		textAlign: 'right',
	},
	descriptionText: {
		fontFamily: Fonts.regular,
		color: COLORS.DarkGrey,
		fontSize: 14,
		lineHeight: 20,
		paddingVertical: 8,
	},
	totalCostText: {
		fontSize: 15,
		color: COLORS.gold,
	},
	divider: {
		backgroundColor: COLORS.border,
	},

	// ── Location Badge ──
	locationBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#E1F5FE',
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 8,
		gap: 4,
	},
	locationBadgeText: {
		fontFamily: Fonts.bold,
		fontSize: 13,
		color: '#0277BD',
	},

	// ── Timeline ──
	timeline: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		paddingVertical: 8,
		paddingHorizontal: 4,
	},
	timelineStep: {
		alignItems: 'center',
		flex: 1,
		position: 'relative',
	},
	timelineConnector: {
		position: 'absolute',
		top: 16,
		left: -20,
		right: 20,
		height: 2,
		zIndex: -1,
	},
	timelineCircle: {
		width: 32,
		height: 32,
		borderRadius: 16,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 6,
	},
	timelineLabel: {
		fontSize: 9,
		textAlign: 'center',
	},
	keyDates: {
		marginTop: 8,
		gap: 6,
	},
	keyDateRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	keyDateText: {
		fontFamily: Fonts.regular,
		fontSize: 12,
		color: COLORS.DimGray,
	},

	// ── Payment ──
	paymentChip: {
		height: 28,
	},
	paymentHistoryRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10,
	},
	paymentHistoryLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	paymentHistoryDate: {
		fontFamily: Fonts.regular,
		fontSize: 13,
		color: COLORS.DimGray,
	},
	paymentHistoryAmount: {
		fontFamily: Fonts.bold,
		fontSize: 14,
		color: COLORS.green,
	},

	// ── Container ──
	containerBox: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.lightBackground,
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
	},
	containerBoxInfo: {
		marginLeft: 12,
		flex: 1,
	},
	containerBoxLabel: {
		fontFamily: Fonts.regular,
		fontSize: 12,
		color: COLORS.DimGray,
		marginBottom: 4,
	},
	containerBoxNumber: {
		fontFamily: Fonts.bold,
		fontSize: 16,
		color: COLORS.DarkGrey,
	},
	trackButton: {
		borderRadius: 8,
	},

	// ── Pickup ──
	pickupBanner: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-start',
		paddingHorizontal: 14,
		paddingVertical: 8,
		borderRadius: 20,
		marginBottom: 16,
		gap: 8,
	},
	pickupBannerText: {
		fontFamily: Fonts.bold,
		fontSize: 13,
	},
	pickupLocation: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		padding: 14,
		backgroundColor: COLORS.lightBackground,
		borderRadius: 12,
		marginBottom: 12,
	},
	pickupLocationTitle: {
		fontFamily: Fonts.bold,
		fontSize: 14,
		color: COLORS.DarkGrey,
		marginBottom: 2,
	},
	pickupLocationAddress: {
		fontFamily: Fonts.regular,
		fontSize: 13,
		color: COLORS.DimGray,
	},
	pickupMessage: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		padding: 12,
		backgroundColor: '#EFF6FF',
		borderRadius: 8,
		gap: 8,
	},
	pickupMessageText: {
		fontFamily: Fonts.medium,
		fontSize: 13,
		color: '#1E40AF',
		flex: 1,
	},

	// ── QR Code ──
	qrContent: {
		alignItems: 'center',
		paddingVertical: 16,
	},
	qrImage: {
		width: 180,
		height: 180,
		resizeMode: 'contain',
		backgroundColor: 'white',
	},
	qrText: {
		fontFamily: Fonts.regular,
		color: COLORS.DimGray,
		fontSize: 12,
		marginTop: 12,
		textAlign: 'center',
	},

	// ── Review & Bottom ──
	reviewSection: {
		paddingHorizontal: 4,
	},
	bottomPadding: {
		height: 32,
	},
});

export default GoodsDetailScreen;
