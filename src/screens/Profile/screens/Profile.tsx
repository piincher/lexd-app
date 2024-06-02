import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { HomeTabScreenProps } from '@src/navigations/type';
import { useAuth } from '@src/store/Auth';
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Divider, List, Text, Title } from 'react-native-paper';
import { useGetCurrentUser } from '../hooks/useProfile';
import SocialMedia from '@src/components/SocialMedia/SocialMedia';
import Constants from 'expo-constants';

const Profile = ({ navigation }: HomeTabScreenProps<'Profile'>) => {
	const logout = useAuth((state) => state.logOut);
	const { data } = useGetCurrentUser();
	console.log(data);

	return (
		<ScrollView style={{ flex: 1, backgroundColor: COLORS.white, padding: 10 }}>
			<View style={styles.header}>
				<Image
					style={styles.avatar}
					source={{
						uri: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/ChinaLink%20Express%20(1024%20x%201024%20px)%20(1).png',
					}}
				/>
				<View>
					<Title style={styles.username}>
						{data?.firstName} {data?.lastName}
					</Title>
					<Title style={styles.username}>+{data?.phoneNumber}</Title>
				</View>
			</View>
			<Divider />
			<List.Section style={styles.section}>
				<List.Item
					title='Mes anciens commandes'
					left={() => <List.Icon icon='shopping' color={COLORS.blue} />}
					onPress={() => {
						navigation.navigate('PastOrders');
					}}
					style={styles.listItem}
					titleStyle={styles.titleStyle}
					right={() => <List.Icon icon='chevron-right' color={COLORS.blue} />}
				/>

				<List.Item
					title='A propos de ChinaLink Express'
					left={() => <List.Icon icon='alpha-i-circle-outline' color={COLORS.blue} />}
					onPress={() => {
						navigation.navigate('AboutUs');
					}}
					titleStyle={styles.titleStyle}
					right={() => <List.Icon icon='chevron-right' color={COLORS.blue} />}
					style={styles.listItem}
				/>

				<Divider bold />

				<Divider bold />
				<List.Item
					titleStyle={styles.titleStyle}
					title='Se Déconnecter'
					left={() => <List.Icon icon='logout' color={COLORS.blue} />}
					onPress={() => {
						logout();
					}}
					style={styles.listItem}
				/>

				{/* <CustomDialog
					visible={showDeleteDialog}
					onDismiss={() => setShowDeleteDialog(false)}
					title='Supprimer mon compte'
					content={deleteAccountContent}
					actions={deleteAccountActions}
				/> */}
				{/* <CustomDialog
					visible={showSuccessDialog}
					onDismiss={() => setShowSuccessDialog(false)}
					title='Compte supprimé'
					content={successDialogContent}
					actions={successDialogActions}
				/> */}
			</List.Section>
			<View style={{ marginTop: '60%', padding: 10 }}>
				<SocialMedia />
			</View>
			<Text style={{ textAlign: 'center', fontFamily: Fonts.black }}>App version: {Constants.expoConfig?.version}</Text>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderRadius: 10,
		margin: 20,
		elevation: 4,
		backgroundColor: 'white',
	},
	header: {
		alignItems: 'flex-start',
		paddingTop: 40,
		paddingBottom: 20,
		marginLeft: 20,
		flexDirection: 'row',
	},
	avatar: {
		backgroundColor: COLORS.redShade,
		height: 100,
		width: 100,
		borderRadius: 50,
		borderWidth: 0.5,
		borderColor: COLORS.black,
	},
	username: {
		marginTop: 10,
		fontSize: 18,
		marginLeft: 20,
		fontFamily: Fonts.boldItalic,
	},
	section: {
		marginTop: 30,
	},
	titleStyle: {
		fontSize: 16,
		fontFamily: Fonts.bold,
	},
	listItem: {
		paddingVertical: 16,
		paddingHorizontal: 20,
	},
});

export default Profile;
