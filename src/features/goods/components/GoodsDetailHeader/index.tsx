import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { Goods } from '../../api';
import { useGoodsShare } from '../../hooks/useGoodsShare';

interface GoodsDetailHeaderProps {
	goods: Goods;
	isAdmin: boolean;
	onBack: () => void;
	onEdit: () => void;
}

export const GoodsDetailHeader: React.FC<GoodsDetailHeaderProps> = ({ goods, isAdmin, onBack, onEdit }) => {
	const { handleShare } = useGoodsShare(goods);

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
