import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Divider, Chip, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Goods } from '../api';
import { formatCurrency, formatDateTime, getPaymentColors } from '../lib/goodsHelpers';

interface GoodsDetailPricingProps {
	goods: Goods;
	onViewPayments: () => void;
}

export const GoodsDetailPricing: React.FC<GoodsDetailPricingProps> = ({ goods, onViewPayments }) => {
	const { colors } = useAppTheme();
	const paymentConfig = getPaymentColors(goods.paymentStatus);
	const balanceDue = goods.balanceDue ?? Math.max(0, (goods.totalCost ?? 0) - (goods.amountPaid ?? 0));

	return (
		<>
			<Card style={styles.card}>
				<View style={styles.header}>
					<MaterialCommunityIcons name="cash-multiple" size={20} color={colors.primary.main} />
					<Text style={[styles.title, { color: colors.text.primary }]}>Tarification & Paiement</Text>
				</View>
				<Card.Content>
					{goods.unitPrice != null && goods.unitPrice > 0 && (
						<>
							<View style={styles.row}>
								<Text style={[styles.label, { color: colors.text.secondary }]}>Prix unitaire</Text>
								<Text style={[styles.value, { color: colors.text.primary }]}>{formatCurrency(goods.unitPrice)}</Text>
							</View>
							<Divider style={[styles.divider, { backgroundColor: colors.border }]} />
						</>
					)}
					<View style={styles.row}>
						<Text style={[styles.label, { color: colors.text.secondary }]}>Coût total</Text>
						<Text style={[styles.value, { color: colors.status.warning, fontSize: 15 }]}>{formatCurrency(goods.totalCost)}</Text>
					</View>
					<Divider style={[styles.divider, { backgroundColor: colors.border }]} />
					<View style={styles.row}>
						<Text style={[styles.label, { color: colors.text.secondary }]}>Montant payé</Text>
						<Text style={[styles.value, { color: colors.status.success }]}>{formatCurrency(goods.amountPaid)}</Text>
					</View>
					<Divider style={[styles.divider, { backgroundColor: colors.border }]} />
					<View style={styles.row}>
						<Text style={[styles.label, { color: colors.text.secondary }]}>Solde restant</Text>
						<Text style={[styles.value, { color: balanceDue > 0 ? colors.status.error : colors.status.success }]}>{formatCurrency(balanceDue)}</Text>
					</View>
					<Divider style={[styles.divider, { backgroundColor: colors.border }]} />
					<View style={styles.row}>
						<Text style={[styles.label, { color: colors.text.secondary }]}>Statut paiement</Text>
						<Chip style={[styles.chip, { backgroundColor: paymentConfig.text + '20' }]} textStyle={{ color: paymentConfig.text, fontFamily: Fonts.bold, fontSize: 12 }} compact>
							{paymentConfig.label}
						</Chip>
					</View>
					{balanceDue > 0 && (
						<Button
							mode="contained"
							icon="cash-check"
							onPress={onViewPayments}
							style={styles.paymentButton}
							buttonColor={colors.primary.main}
							textColor={colors.text.inverse}
						>
							Voir mes paiements
						</Button>
					)}
				</Card.Content>
			</Card>

			{goods.paymentHistory && goods.paymentHistory.length > 0 && (
				<Card style={styles.card}>
					<View style={styles.header}>
						<MaterialCommunityIcons name="history" size={20} color={colors.primary.main} />
						<Text style={[styles.title, { color: colors.text.primary }]}>Historique des paiements</Text>
					</View>
					<Card.Content>
						{goods.paymentHistory.map((payment, index) => (
							<View key={payment.paymentId || index}>
								<View style={styles.paymentRow}>
									<View style={styles.paymentLeft}>
										<MaterialCommunityIcons name="check-circle" size={16} color={colors.status.success} />
										<Text style={[styles.paymentDate, { color: colors.text.secondary }]}>{formatDateTime(payment.date)}</Text>
									</View>
									<Text style={[styles.paymentAmount, { color: colors.status.success }]}>{formatCurrency(payment.amount)}</Text>
								</View>
								{index < goods.paymentHistory!.length - 1 && <Divider style={[styles.divider, { backgroundColor: colors.border }]} />}
							</View>
						))}
					</Card.Content>
				</Card>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	card: { marginHorizontal: 16, marginBottom: 12, elevation: 2, borderRadius: 12 },
	header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, gap: 8 },
	title: { fontFamily: Fonts.bold, fontSize: 15 },
	row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
	label: { fontFamily: Fonts.medium, fontSize: 13 },
	value: { fontFamily: Fonts.bold, fontSize: 13, flex: 1, textAlign: 'right' },
	divider: { marginVertical: 0 },
	chip: { height: 28 },
	paymentButton: { marginTop: 12, borderRadius: 10 },
	paymentRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
	paymentLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
	paymentDate: { fontFamily: Fonts.regular, fontSize: 13 },
	paymentAmount: { fontFamily: Fonts.bold, fontSize: 14 },
});
