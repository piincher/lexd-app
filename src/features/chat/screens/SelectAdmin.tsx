import AppButton from '@src/components/AppButton/AppButton';
import { RootStackScreenProps } from '@src/navigations/type';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChatClient } from '../hooks/useChatClient';

interface User {
	id: string;
	name: string;
	image: any;
	role: string;
}

const SelectAdminToChatWith = ({ navigation }: RootStackScreenProps<'SelectAdminToChatWith'>) => {
	const [selectedUser, setSelectedUser] = useState<User>();
	const { streamChat, user } = useChatClient();

	const users = useQuery({
		queryKey: ['stream', 'users'],
		queryFn: () => streamChat!.queryUsers({ role: 'admin', id: { $ne: user?.id! } }, { name: 1 }, {}),
		enabled: streamChat != null,
	});

	const handleCreate = async () => {
		try {
			const channel = await streamChat
				.channel('messaging', {
					members: [user.id, selectedUser!.id],
				})
				.watch();
			navigation.navigate('ChatRoom', { id: channel.channel.id });
		} catch (error) {
			console.log('error', error);
		}
	};

	const renderUserItem = ({ item }: { item: User }) => {
		const isSelected = selectedUser && selectedUser.id === item.id;

		return (
			<TouchableOpacity
				style={[styles.userItem, isSelected && styles.selectedUserItem]}
				onPress={() => setSelectedUser(item)}
			>
				<Image source={{ uri: item.image }} style={styles.avatar} />
				<View style={styles.userInfo}>
					<Text style={styles.userName}>{item.name}</Text>
					<Text style={styles.userRole}>{item.role}</Text>
				</View>
			</TouchableOpacity>
		);
	};
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Text style={{ textAlign: 'center', fontWeight: '800', fontSize: 18 }}>Select Admin to chat </Text>

			<Text style={{ marginLeft: 20 }}>Choisir un Agent</Text>
			<FlatList data={users?.data?.users!} renderItem={renderUserItem} keyExtractor={(item) => item.id.toString()} />
			<AppButton title='Start Chat' onPress={handleCreate} />
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
		fontWeight: 'bold',
	},
	userRole: {
		fontSize: 14,
		color: '#888',
	},
});

export default SelectAdminToChatWith;
