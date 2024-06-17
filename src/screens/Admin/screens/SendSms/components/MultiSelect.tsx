import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MultiSelectProps<T> {
	items: (string | T)[];
	valueKey?: keyof T;
	displayKey?: keyof T;
	selectedItems: string[];
	setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export function MultiSelect<T>(props: MultiSelectProps<T>): JSX.Element {
	const { items, valueKey, displayKey, selectedItems, setSelectedItems, ...otherprops } = props;

	const handleSelect = (item: string | T) => {
		setSelectedItems((prev) => {
			const itemId = valueKey ? (item as T)[valueKey] : item;
			if (prev.includes(String(itemId))) {
				return prev.filter((i) => String(i) !== String(itemId));
			}
			return [...prev, String(itemId)];
		});
	};

	return (
		<FlatList
			data={items}
			keyExtractor={(item, index) => (valueKey ? String((item as T)[valueKey]) : String(index))}
			renderItem={({ item }) => (
				<TouchableOpacity onPress={() => handleSelect(item)} {...otherprops} style={styles.container}>
					<Text>{item?.info}</Text>
					<Text>{displayKey ? (item as T)[displayKey] : item}</Text>
					<View
						style={[
							styles.indicator,
							selectedItems.includes(valueKey ? String((item as T)[valueKey]) : String(item))
								? styles.selected
								: styles.notSelected,
						]}
					/>
				</TouchableOpacity>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row', // flex-row
		alignItems: 'center', // items-center
		justifyContent: 'space-between', // justify-between
		width: '50%', // w-full
		height: 40, // h-10 (10 * 4 pixels per unit = 40 pixels)
		alignSelf: 'center', // self-center
	},
	indicator: {
		borderWidth: 1, // border
		borderColor: 'black', // border-black
		borderRadius: 9999, // rounded-full (high value for fully rounded corners)
		width: 16, // w-4 (4 * 4 pixels per unit = 16 pixels)
		height: 16, // h-4 (4 * 4 pixels per unit = 16 pixels)
	},
	selected: {
		backgroundColor: 'black', // bg-black
	},
	notSelected: {
		backgroundColor: 'white', // bg-white
	},
});
