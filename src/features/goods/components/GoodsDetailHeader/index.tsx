import React from 'react';
import { Share, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { useCreateShareToken } from '@src/shared/hooks/useCreateShareToken';
import { Goods } from '../../api';

interface GoodsDetailHeaderProps {
	goods: Goods;
	isAdmin: boolean;
	onBack: () => void;
	onEdit: () => void;
}

export const GoodsDetailHeader: React.FC<GoodsDetailHeaderProps> = ({ goods, isAdmin, onBack, onEdit }) => {
	const { mutateAsync: createShareToken } = useCreateShareToken();

	const handleShare = async () => {
		try {
			const result = await createShareToken({ type: 'goods', resourceReference: goods.goodsId });
			await Share.share({
				message: `Suivez ma marchandise ChinaLink Express: ${goods.goodsId}\n${result.url}`,
				title: `Marchandise ${goods.goodsId}`,
			});
		} catch {
			try {
				await Share.share({
					message: `Marchandise ${goods.goodsId} - ${goods.description}\nStatut: ${goods.status}`,
					title: `Détails Marchandise ${goods.goodsId}`,
				});
			} catch (err) {
				console.error('Error sharing:', err);
			}
		}
	};

	return (
		<Appbar.Header>
			<Appbar.BackAction onPress={onBack} />
			<Appbar.Content title={goods.goodsId} titleStyle={styles.title} />
			{isAdmin && <Appbar.Action icon="pencil" onPress={onEdit} />}
			<Appbar.Action icon="share-variant" onPress={handleShare} />
		</Appbar.Header>
	);
};

const styles = StyleSheet.create({
	title: {
		fontFamily: Fonts.bold,
	},
});
