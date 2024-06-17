import { RootStackScreenProps } from '@src/navigations/type';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppButton from '@src/components/AppButton/AppButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetUsers } from '../../hooks/useGetUsers';
import { userData } from '@src/constants/types';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

interface User {}

const SelectUser = ({ navigation }: RootStackScreenProps<'SelectUser'>) => {
	const [selectedUser, setSelectedUser] = useState<userData>();

	const { data } = useGetUsers();

	console.log('data', data);
	const renderUserItem = ({ item }: { item: userData }) => {
		const isSelected = selectedUser && selectedUser._id === item._id;

		return (
			<TouchableOpacity
				style={[styles.userItem, isSelected && styles.selectedUserItem]}
				onPress={() => setSelectedUser(item)}
			>
				<View style={styles.userInfo}>
					<Text style={styles.userName}>
						{item.firstName}-{item.lastName}
					</Text>
					<Text style={styles.userRole}>{item.role}</Text>
					<Text style={[styles.userRole, { color: COLORS.blue, fontSize: 26 }]}>{item.phoneNumber}</Text>
				</View>
			</TouchableOpacity>
		);
	};

	const handleCreate = async () => {
		navigation.navigate('AddOrder', {
			clientName: `${selectedUser?.firstName + selectedUser?.lastName!}`,
			userId: selectedUser?._id!,
			phoneNumber: selectedUser?.phoneNumber?.substring(3)!,
		});
	};

	console.log;
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Text style={{ textAlign: 'center', fontWeight: '800', fontSize: 18 }}>Select Admin to chat </Text>

			<Text style={{ marginLeft: 20 }}>Choisir un client</Text>
			<FlatList data={data!} renderItem={renderUserItem} keyExtractor={(item) => item._id.toString()} />
			<AppButton title='Ajouter' onPress={handleCreate} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	userItem: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
	selectedUserItem: {
		backgroundColor: '#e6f2ff',
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginRight: 10,
	},
	userInfo: {
		flex: 1,
	},
	userName: {
		fontSize: 16,
		fontFamily: Fonts.bold,
	},
	userRole: {
		fontSize: 14,
		color: '#888',
		fontFamily: Fonts.black,
	},
});

export default SelectUser;
