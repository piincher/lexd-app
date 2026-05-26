import RenderListItem from '@src/components/RenderListItem/RenderListItem';
import type { RootStackParamList, RootStackScreenProps } from '@src/navigations/type';
import { useShippingMode } from '@src/store/shippingMode';
import React, { FC, useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';

type Item = {
	id: string;
	title: 'air' | 'sea';
};
type DataType = Item[];

const list: DataType = [
	{ id: '0', title: 'air' },
	{ id: '1', title: 'sea' },
];

const ChooseShippingMethod = ({ navigation }: RootStackScreenProps<'ChooseShippingMethod'>) => {
	const { colors } = useAppTheme();
	const styles = createStyles(colors);
	const [selectedItem, setSelectedItem] = useState<DataType[number] | undefined>(undefined);
	const setType = useShippingMode((state) => state.setType);
	const items = list;

	const handleTypeChange = (item: Item) => {
		setType(item.title);
		navigation.navigate('SelectUser');
	};
	return (
		<SafeAreaView style={styles.container}>
			<FlashList
				data={items}
				renderItem={({ item }) => (
					<RenderListItem
						item={item}
						selectedItem={selectedItem!}
						setSelectedItem={setSelectedItem}
						renderItemContent={(item) => (
							<Pressable style={{ padding: 20 }} onPress={() => handleTypeChange(item)}>
								<Text style={styles.userName}>{item.title}</Text>
							</Pressable>
						)}
					/>
				)}
				keyExtractor={(item) => item.id}
			/>
		</SafeAreaView>
	);
};

const createStyles = (colors: any) => StyleSheet.create({
	container: {
		flex: 1,
	},
	userName: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	userRole: {
		fontSize: 14,
		color: colors.neutral[500],
	},
	buttonContainer: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		padding: 20,
		backgroundColor: colors.background.card,
	},
});

export default ChooseShippingMethod;
