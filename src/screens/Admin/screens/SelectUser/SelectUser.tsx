import { RootStackScreenProps } from '@src/navigations/type';
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import AppButton from '@src/components/AppButton/AppButton';
import { Header } from '@src/components/Header/Header';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { userData } from '@src/constants/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetUsers } from '../../hooks/useGetUsers';
import { MaterialIcons } from '@expo/vector-icons';

const SelectUser = ({ navigation }: RootStackScreenProps<'SelectUser'>) => {
	const [selectedUser, setSelectedUser] = useState<userData>();

	const { data } = useGetUsers();

	const handleCreate = async () => {
		navigation.navigate('AddOrder', {
			clientName: `${selectedUser?.firstName} ${selectedUser?.lastName!}`,
			userId: selectedUser?._id!,
			phoneNumber: selectedUser?.phoneNumber?.substring(3)!,
		});
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header title='Choisir un client' navigation={navigation} />
			<FlatList
				data={data!}
				renderItem={({ item }) => {
					return <RenderUserItem item={item} selectedUser={selectedUser!} setSelectedUser={setSelectedUser} />;
				}}
				keyExtractor={(item) => item._id.toString()}
			/>

			<View style={styles.buttonContainer}>
				<AppButton title='Ajouter' onPress={handleCreate} />
			</View>
		</SafeAreaView>
	);
};

const RenderUserItem = ({
	item,
	selectedUser,
	setSelectedUser,
}: {
	item: userData;
	setSelectedUser: React.Dispatch<React.SetStateAction<userData | undefined>>;
	selectedUser: userData;
}) => {
	const isSelected = selectedUser && selectedUser._id === item._id;

	return (
		<Pressable style={[styles.userItem, isSelected && styles.selectedUserItem]} onPress={() => setSelectedUser(item)}>
			<View style={styles.userInfo}>
				<Text style={styles.userName}>
					{item.firstName} {item.lastName}
				</Text>
				<Text style={[styles.userRole]}>+{item.phoneNumber}</Text>
			</View>
			<MaterialIcons name='navigate-next' size={24} color={COLORS.blue} />
		</Pressable>
	);
};

const styles = StyleSheet.create({
	userItem: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		marginHorizontal: 20,
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
		fontFamily: Fonts.meduim,
	},
	userRole: {
		fontSize: 14,
		color: '#888',
		fontFamily: Fonts.black,
	},
	buttonContainer: {
		width: '50%',
		alignSelf: 'center',
		marginBottom: 50,
	},
});

export default SelectUser;
