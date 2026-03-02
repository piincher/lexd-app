// Goods Feature - GoodsDetailScreen
// Detail screen for viewing a single goods item

import React from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	Image,
	Dimensions,
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

const { width } = Dimensions.get('window');

const formatCurrency = (amount: number): string => {
	return `${amount.toLocaleString('fr-FR')} FCFA`;
};

const formatDate = (dateString: string): string => {
	if (!dateString) return 'N/A';
	const date = new Date(dateString);
	return date.toLocaleDateString('fr-FR', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	});
};

const GoodsDetailScreen = ({
	route,
	navigation,
}: RootStackScreenProps<'GoodsDetail'>) => {
	const { goodsId } = route.params;
	const theme = useTheme();

	const { data: goods, isLoading, isError, error, refetch } = useGetGoodsDetail(goodsId);

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
	const hasQRCode = !!goods.qrCode;
	const cbm = goods.actualCBM || goods.cbm || 0;
	const weight = goods.weight || 0;

	const getPaymentChipColors = (status: string) => {
		switch (status) {
			case 'PAID':
				return { bg: '#E8F5E9', text: '#2E7D32' };
			case 'PARTIAL':
				return { bg: '#FFF3E0', text: '#E65100' };
			default:
				return { bg: '#FFEBEE', text: '#C62828' };
		}
	};

	const paymentColors = getPaymentChipColors(goods.paymentStatus);

	// Get shipment icon name based on type
	const getShipmentIcon = (shipmentType?: 'air' | 'sea'): any => {
		return shipmentType === 'air' ? 'airplane' : 'ship';
	};

	// Phase 3: Navigate to container tracking
	const handleNavigateToContainer = () => {
		if (goods.containerId?._id) {
			navigation.navigate('ContainerDetail', { containerId: goods.containerId._id });
		}
	};

	// Phase 3: Get status color for pickup status
	const getPickupStatusColor = (status: string) => {
		switch (status) {
			case 'READY_FOR_PICKUP':
				return { bg: '#FEF3C7', text: '#D97706', icon: 'package-variant' };
			case 'DELIVERED':
				return { bg: '#D1FAE5', text: '#059669', icon: 'check-circle' };
			default:
				return { bg: '#E0F2FE', text: '#0369A1', icon: 'truck-delivery' };
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Appbar.Header>
				<Appbar.BackAction onPress={() => navigation.goBack()} />
				<Appbar.Content title={goods.goodsId} titleStyle={styles.headerTitle} />
				<Appbar.Action icon="share-variant" onPress={handleShare} />
			</Appbar.Header>

			<ScrollView contentContainerStyle={styles.scrollContent}>
				{/* Status Header */}
				<View style={styles.statusHeader}>
					<StatusBadge status={goods.status} />
					<Text style={styles.dateText}>Créé le {formatDate(goods.createdAt)}</Text>
				</View>

				{/* Photo Section */}
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
								size={80}
								color={COLORS.SlateGray}
							/>
							<Text style={styles.placeholderText}>Aucune photo</Text>
						</View>
					)}
				</Card>

				{/* Thumbnail Gallery */}
				{images.length > 1 && (
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.thumbnailContainer}
					>
						{images.map((img, index) => (
							<Image
								key={index}
								source={{ uri: img }}
								style={styles.thumbnail}
							/>
						))}
					</ScrollView>
				)}

				{/* Details Section */}
				<Card style={styles.detailsCard}>
					<Card.Title
						title="Détails de la marchandise"
						titleStyle={styles.cardTitle}
						left={(props) => (
							<MaterialCommunityIcons
								{...props}
								name="information"
								size={24}
								color={theme.colors.primary}
							/>
						)}
					/>
					<Card.Content>
						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>Description:</Text>
							<Text style={styles.detailValue}>{goods.description}</Text>
						</View>

						<Divider style={styles.divider} />

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>CBM:</Text>
							<Text style={styles.detailValue}>{cbm.toFixed(3)} m³</Text>
						</View>

						{weight > 0 && (
							<>
								<Divider style={styles.divider} />
								<View style={styles.detailRow}>
									<Text style={styles.detailLabel}>Poids:</Text>
									<Text style={styles.detailValue}>{weight} kg</Text>
								</View>
							</>
						)}

						<Divider style={styles.divider} />

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>Quantité:</Text>
							<Text style={styles.detailValue}>{goods.quantity}</Text>
						</View>

						<Divider style={styles.divider} />

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>Coût total:</Text>
							<Text style={[styles.detailValue, styles.costValue]}>
								{formatCurrency(goods.totalCost)}
							</Text>
						</View>

						<Divider style={styles.divider} />

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>Statut paiement:</Text>
							<Chip
								style={[styles.paymentChip, { backgroundColor: paymentColors.bg }]}
								textStyle={{
									color: paymentColors.text,
									fontFamily: Fonts.bold,
								}}
							>
								{goods.paymentStatus === 'PAID'
									? 'Payé'
									: goods.paymentStatus === 'PARTIAL'
										? 'Partiel'
										: 'Non payé'}
							</Chip>
						</View>
					</Card.Content>
				</Card>

				{/* QR Code Section */}
				{hasQRCode && (
					<Card style={styles.qrCard}>
						<Card.Title
							title="Code QR"
							titleStyle={styles.cardTitle}
							left={(props) => (
								<MaterialCommunityIcons
									{...props}
									name="qrcode"
									size={24}
									color={theme.colors.primary}
								/>
							)}
						/>
						<Card.Content style={styles.qrContent}>
							<Image source={{ uri: goods.qrCode }} style={styles.qrImage} />
							<Text style={styles.qrText}>Scannez ce code pour identifier la marchandise</Text>
						</Card.Content>
					</Card>
				)}

				{/* Phase 3: Container Info Section */}
				{goods.containerId && (
					<Card style={styles.containerCard}>
						<Card.Title
							title="Information Container"
							titleStyle={styles.cardTitle}
							left={(props) => (
								<MaterialCommunityIcons
									{...props}
									name="cube"
									size={24}
									color={theme.colors.primary}
								/>
							)}
						/>
						<Card.Content>
							<View style={styles.containerInfoBox}>
								<MaterialCommunityIcons
									name="cube"
									size={40}
									color={theme.colors.primary}
								/>
								<View style={styles.containerInfoContent}>
									<Text style={styles.containerInfoLabel}>
										Votre marchandise est dans le container:
									</Text>
									<Text style={styles.containerInfoNumber}>
										{typeof goods.containerId === 'object' 
											? goods.containerId.virtualContainerNumber 
											: goods.containerId}
									</Text>
								</View>
							</View>
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

				{/* Phase 3: Pickup Status Section */}
				{(goods.status === 'READY_FOR_PICKUP' || goods.status === 'DELIVERED') && (
					<Card style={styles.pickupCard}>
						<Card.Title
							title="Statut de Retrait"
							titleStyle={styles.cardTitle}
							left={(props) => {
								const statusConfig = getPickupStatusColor(goods.status);
								return (
									<MaterialCommunityIcons
										{...props}
										name={statusConfig.icon}
										size={24}
										color={statusConfig.text}
									/>
								);
							}}
						/>
						<Card.Content>
							<View style={styles.pickupContent}>
								{(() => {
									const statusConfig = getPickupStatusColor(goods.status);
									return (
										<>
											<View style={[styles.statusPill, { backgroundColor: statusConfig.bg }]}>
												<MaterialCommunityIcons
													name={goods.status === 'DELIVERED' ? 'check-circle' : 'package-variant'}
													size={20}
													color={statusConfig.text}
												/>
												<Text style={[styles.statusPillText, { color: statusConfig.text }]}>
													{goods.status === 'READY_FOR_PICKUP' 
														? 'Prêt pour Retrait' 
														: 'Livré'}
												</Text>
											</View>
											
											{goods.status === 'READY_FOR_PICKUP' && (
												<>
													<View style={styles.pickupLocation}>
														<MaterialCommunityIcons
															name="warehouse"
															size={20}
															color={COLORS.DimGray}
														/>
														<View style={styles.pickupLocationInfo}>
															<Text style={styles.pickupLocationTitle}>
																Lieu de Retrait
															</Text>
															<Text style={styles.pickupLocationAddress}>
																Entrepôt Bamako - Zone Industrielle
															</Text>
														</View>
													</View>
													
													<View style={styles.pickupMessage}>
														<MaterialCommunityIcons
															name="information"
															size={18}
															color={theme.colors.primary}
														/>
														<Text style={styles.pickupMessageText}>
															Contactez-nous pour organiser le retrait de votre marchandise
														</Text>
													</View>
												</>
											)}
											
											{goods.status === 'DELIVERED' && (
												<View style={styles.deliveredInfo}>
													<MaterialCommunityIcons
														name="check-circle-outline"
														size={24}
														color={COLORS.green}
													/>
													<Text style={styles.deliveredText}>
														Votre marchandise a été livrée avec succès
													</Text>
												</View>
											)}
										</>
									);
								})()}
							</View>
						</Card.Content>
					</Card>
				)}

				{/* Location Section */}
				<Card style={styles.locationCard}>
					<Card.Title
						title="Localisation"
						titleStyle={styles.cardTitle}
						left={(props) => (
							<MaterialCommunityIcons
								{...props}
								name="map-marker"
								size={24}
								color={theme.colors.primary}
							/>
						)}
					/>
					<Card.Content>
						{goods.location?.type === 'WAREHOUSE' ? (
							<View style={styles.locationContainer}>
								<MaterialCommunityIcons
									name="warehouse"
									size={32}
									color={COLORS.blue}
								/>
								<View style={styles.locationInfo}>
									<Text style={styles.locationTitle}>Entrepôt Shenzhen</Text>
									<Text style={styles.locationDetail}>
										Emplacement: {goods.location.warehouseLocation || goods.warehouseLocation || 'Non assigné'}
									</Text>
								</View>
							</View>
						) : goods.location?.type === 'CONTAINER' && goods.location.containerInfo ? (
							<Pressable onPress={handleNavigateToContainer}>
								<View style={styles.containerInfo}>
									<MaterialCommunityIcons
										name={getShipmentIcon(goods.location.containerInfo.shipmentType)}
										size={32}
										color={theme.colors.primary}
									/>
									<View style={styles.containerDetails}>
										<Text style={styles.containerTitle}>
											Conteneur {goods.location.containerInfo.containerNumber}
										</Text>
										<Text style={styles.containerType}>
											{goods.location.containerInfo.shipmentType === 'air'
												? 'Transport Aérien'
												: 'Transport Maritime'}
										</Text>
									</View>
									<MaterialCommunityIcons
										name="chevron-right"
										size={24}
										color={COLORS.DimGray}
									/>
								</View>
							</Pressable>
						) : (
							<View style={styles.locationContainer}>
								<MaterialCommunityIcons
									name="warehouse"
									size={32}
									color={COLORS.blue}
								/>
								<View style={styles.locationInfo}>
									<Text style={styles.locationTitle}>Entrepôt Shenzhen</Text>
									<Text style={styles.locationDetail}>
										Emplacement: {goods.warehouseLocation || 'Non assigné'}
									</Text>
								</View>
							</View>
						)}
					</Card.Content>
				</Card>

				{/* Bottom padding */}
				<View style={styles.bottomPadding} />
			</ScrollView>
		</SafeAreaView>
	);
};

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
		fontFamily: Fonts.meduim,
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
	statusHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: 'white',
		marginBottom: 8,
	},
	dateText: {
		fontFamily: Fonts.regular,
		color: COLORS.DimGray,
		fontSize: 12,
	},
	photoCard: {
		marginHorizontal: 16,
		marginBottom: 16,
		elevation: 2,
		borderRadius: 12,
		overflow: 'hidden',
	},
	mainImage: {
		width: '100%',
		height: 250,
		backgroundColor: COLORS.Silver,
	},
	placeholderImage: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	placeholderText: {
		fontFamily: Fonts.meduim,
		color: COLORS.DimGray,
		marginTop: 8,
	},
	thumbnailContainer: {
		paddingHorizontal: 16,
		gap: 8,
		marginBottom: 16,
	},
	thumbnail: {
		width: 80,
		height: 80,
		borderRadius: 8,
		backgroundColor: COLORS.Silver,
	},
	detailsCard: {
		marginHorizontal: 16,
		marginBottom: 16,
		elevation: 2,
	},
	cardTitle: {
		fontFamily: Fonts.bold,
		fontSize: 16,
	},
	detailRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 12,
	},
	detailLabel: {
		fontFamily: Fonts.meduim,
		color: COLORS.DimGray,
		fontSize: 14,
	},
	detailValue: {
		fontFamily: Fonts.bold,
		color: COLORS.DarkGrey,
		fontSize: 14,
		flex: 1,
		textAlign: 'right',
	},
	costValue: {
		color: COLORS.green,
		fontSize: 16,
	},
	divider: {
		backgroundColor: COLORS.border,
	},
	paymentChip: {
		height: 32,
	},
	qrCard: {
		marginHorizontal: 16,
		marginBottom: 16,
		elevation: 2,
	},
	qrContent: {
		alignItems: 'center',
		paddingVertical: 16,
	},
	qrImage: {
		width: 200,
		height: 200,
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
	locationCard: {
		marginHorizontal: 16,
		marginBottom: 16,
		elevation: 2,
	},
	locationContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 8,
	},
	locationInfo: {
		marginLeft: 12,
		flex: 1,
	},
	locationTitle: {
		fontFamily: Fonts.bold,
		fontSize: 16,
		color: COLORS.DarkGrey,
	},
	locationDetail: {
		fontFamily: Fonts.regular,
		fontSize: 14,
		color: COLORS.DimGray,
		marginTop: 2,
	},
	containerInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 8,
	},
	containerDetails: {
		marginLeft: 12,
		flex: 1,
	},
	containerTitle: {
		fontFamily: Fonts.bold,
		fontSize: 16,
		color: COLORS.DarkGrey,
	},
	containerType: {
		fontFamily: Fonts.regular,
		fontSize: 14,
		color: COLORS.DimGray,
		marginTop: 2,
	},
	// Phase 3: Container Info Styles
	containerCard: {
		marginHorizontal: 16,
		marginBottom: 16,
		elevation: 2,
	},
	containerInfoBox: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 16,
		backgroundColor: COLORS.lightBackground,
		borderRadius: 12,
		paddingHorizontal: 16,
		marginBottom: 16,
	},
	containerInfoContent: {
		marginLeft: 12,
		flex: 1,
	},
	containerInfoLabel: {
		fontFamily: Fonts.regular,
		fontSize: 13,
		color: COLORS.DimGray,
		marginBottom: 4,
	},
	containerInfoNumber: {
		fontFamily: Fonts.bold,
		fontSize: 16,
		color: COLORS.DarkGrey,
	},
	trackButton: {
		borderRadius: 8,
	},
	// Phase 3: Pickup Status Styles
	pickupCard: {
		marginHorizontal: 16,
		marginBottom: 16,
		elevation: 2,
	},
	pickupContent: {
		paddingVertical: 8,
	},
	statusPill: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-start',
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		marginBottom: 16,
		gap: 8,
	},
	statusPillText: {
		fontFamily: Fonts.bold,
		fontSize: 14,
	},
	pickupLocation: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		padding: 16,
		backgroundColor: COLORS.lightBackground,
		borderRadius: 12,
		marginBottom: 16,
	},
	pickupLocationInfo: {
		marginLeft: 12,
		flex: 1,
	},
	pickupLocationTitle: {
		fontFamily: Fonts.bold,
		fontSize: 14,
		color: COLORS.DarkGrey,
		marginBottom: 4,
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
		fontFamily: Fonts.meduim,
		fontSize: 13,
		color: '#1E40AF',
		flex: 1,
	},
	deliveredInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		backgroundColor: '#ECFDF5',
		borderRadius: 12,
		gap: 12,
	},
	deliveredText: {
		fontFamily: Fonts.meduim,
		fontSize: 14,
		color: '#059669',
		flex: 1,
	},
	bottomPadding: {
		height: 32,
	},
});

export default GoodsDetailScreen;
