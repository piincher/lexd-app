import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RenderHomeItem } from './RenderHomeItem';

interface Props<T> {
	data: T[];
	navigation: any;
}

interface Item {
	id: string;
	title: string;
	route: string;
}

export const ItemList = <T extends Item>({ data, navigation }: Props<T>) => {
	return (
		<>
			{data.map((item) => (
				<RenderHomeItem key={item.id} item={item} navigation={navigation} />
			))}
		</>
	);
};
