import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

interface GoodsDetailQRProps {
	qrCodeUrl?: string;
}

export const GoodsDetailQR: React.FC<GoodsDetailQRProps> = ({ qrCodeUrl }) => {
	const { colors } = useAppTheme();

	if (!qrCodeUrl) return null;

	return (
		<Card style={styles.card}>
			<View style={styles.header}>
				<MaterialCommunityIcons name="qrcode" size={20} color={colors.primary.main} />
				<Text style={[styles.title, { color: colors.text.primary }]}>Code QR</Text>
			</View>
			<Card.Content style={styles.content}>
				<Image source={{ uri: qrCodeUrl }} style={[styles.qrImage, { backgroundColor: colors.background.card }]} />
				<Text style={[styles.qrText, { color: colors.text.secondary }]}>
					Scannez ce code pour identifier la marchandise
				</Text>
			</Card.Content>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		marginHorizontal: 16,
		marginBottom: 12,
		elevation: 2,
		borderRadius: 12,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 8,
		gap: 8,
	},
	title: {
		fontFamily: Fonts.bold,
		fontSize: 15,
	},
	content: {
		alignItems: 'center',
		paddingVertical: 16,
	},
	qrImage: {
		width: 180,
		height: 180,
		resizeMode: 'contain',
	},
	qrText: {
		fontFamily: Fonts.regular,
		fontSize: 12,
		marginTop: 12,
		textAlign: 'center',
	},
});
